from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
import json
import os

router = APIRouter()

CART_FILE = "cart_db.json"

class CartItem(BaseModel):
    id: int
    name: str
    price: float = Field(..., gt=0)
    quantity: int = Field(default=1, ge=1)
    image: str = ""

def load_cart():
    """Load cart from persistent JSON storage"""
    if os.path.exists(CART_FILE):
        try:
            with open(CART_FILE, "r") as f:
                data = json.load(f)
                return data if isinstance(data, list) else []
        except Exception as e:
            print(f"Error loading cart: {e}")
            return []
    return []

def save_cart(cart):
    """Save cart to persistent JSON storage"""
    try:
        with open(CART_FILE, "w") as f:
            json.dump(cart, f, indent=2)
    except Exception as e:
        print(f"Error saving cart: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to save cart")

@router.get("/cart")
def get_cart():
    """Get all items in cart"""
    try:
        return load_cart()
    except Exception as e:
        print(f"Error fetching cart: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch cart")

@router.post("/cart")
def add_to_cart(item: CartItem):
    """Add item to cart or update quantity if already exists"""
    try:
        cart = load_cart()
        
        # Check if item already exists in cart
        existing_item = next((i for i in cart if i["id"] == item.id), None)
        
        if existing_item:
            # Update quantity
            existing_item["quantity"] += item.quantity
        else:
            # Add new item
            cart.append(item.dict())
        
        save_cart(cart)
        return {
            "success": True,
            "message": "Product added to cart",
            "cart": cart
        }
    except Exception as e:
        print(f"Error adding to cart: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to add item to cart")

@router.put("/cart/{item_id}")
def update_cart_item(item_id: int, quantity: int = Field(..., ge=0)):
    """Update quantity of an item in cart"""
    try:
        cart = load_cart()
        
        item = next((i for i in cart if i["id"] == item_id), None)
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found in cart")
        
        if quantity <= 0:
            # Remove item if quantity is 0 or less
            cart = [i for i in cart if i["id"] != item_id]
        else:
            item["quantity"] = quantity
        
        save_cart(cart)
        return {
            "success": True,
            "message": "Cart updated",
            "cart": cart
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error updating cart: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update cart")

@router.delete("/cart/{item_id}")
def remove_from_cart(item_id: int):
    """Remove item from cart"""
    try:
        cart = load_cart()
        
        if not any(i["id"] == item_id for i in cart):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found in cart")
        
        cart = [item for item in cart if item["id"] != item_id]
        save_cart(cart)
        return {
            "success": True,
            "message": "Product removed from cart",
            "cart": cart
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error removing from cart: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to remove item")

@router.delete("/cart")
def clear_cart():
    """Clear entire cart"""
    try:
        save_cart([])
        return {
            "success": True,
            "message": "Cart cleared"
        }
    except Exception as e:
        print(f"Error clearing cart: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to clear cart")