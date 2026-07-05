from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

router = APIRouter()

class Product(BaseModel):
    id: int
    name: str
    category: str
    price: float
    image: str
    description: str = ""

# Master product database
PRODUCTS = [
    {
        "id": 1,
        "name": "Pro Phone 14",
        "category": "mobiles",
        "price": 119999,
        "image": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
        "description": "Latest flagship mobile with advanced features and 5G support"
    },
    {
        "id": 2,
        "name": "AirLap Book",
        "category": "laptops",
        "price": 129900,
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
        "description": "High-performance laptop for professionals with 16GB RAM"
    },
    {
        "id": 3,
        "name": "BassBooster Over-Ear",
        "category": "headphones",
        "price": 14999,
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        "description": "Premium sound quality with active noise cancellation"
    },
    {
        "id": 4,
        "name": "TrueWireless Buds",
        "category": "buds",
        "price": 7999,
        "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
        "description": "Compact and portable wireless earbuds with 24-hour battery"
    },
    {
        "id": 5,
        "name": "MaxCharge 20k mAh",
        "category": "powerbanks",
        "price": 3999,
        "image": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
        "description": "Fast charging power bank compatible with all devices"
    },
    {
        "id": 6,
        "name": "TabStream 11",
        "category": "tabs",
        "price": 49999,
        "image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500",
        "description": "Versatile tablet for work and entertainment with OLED display"
    }
]

@router.get("/products")
def get_products():
    """Get all products"""
    try:
        return PRODUCTS
    except Exception as e:
        print(f"Error fetching products: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch products")

@router.get("/products/{product_id}")
def get_product(product_id: int):
    """Get a specific product by ID"""
    try:
        product = next((p for p in PRODUCTS if p["id"] == product_id), None)
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
        return product
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error fetching product: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch product")

@router.get("/products/category/{category}")
def get_products_by_category(category: str):
    """Get all products in a specific category"""
    try:
        products = [p for p in PRODUCTS if p["category"].lower() == category.lower()]
        if not products:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No products found in category: {category}")
        return products
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error fetching products by category: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch products")