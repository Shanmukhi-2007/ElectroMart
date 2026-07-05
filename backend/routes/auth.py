from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
import json
import os
import re

router = APIRouter()

# Persistent storage for users
USERS_FILE = "users_db.json"

class UserLogin(BaseModel):
    email: str
    password: str

class UserSignup(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: str
    password: str = Field(..., min_length=6, max_length=100)
    phone: str = ""

def load_users():
    """Load users from persistent JSON storage"""
    if os.path.exists(USERS_FILE):
        try:
            with open(USERS_FILE, "r") as f:
                return json.load(f)
        except:
            return []
    return []

def save_users(users):
    """Save users to persistent JSON storage"""
    try:
        with open(USERS_FILE, "w") as f:
            json.dump(users, f, indent=2)
    except Exception as e:
        print(f"Error saving users: {e}")

def is_valid_email(email: str) -> bool:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@router.post("/signup")
def signup(user: UserSignup):
    try:
        # Validate email format
        if not is_valid_email(user.email):
            return {"success": False, "message": "Invalid email format"}
        
        users = load_users()
        
        # Check if user already exists
        if any(u["email"].lower() == user.email.lower() for u in users):
            return {"success": False, "message": "User already exists with this email"}
        
        # Create new user
        new_user = {
            "id": len(users) + 1,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "password": user.password  # In production, hash with bcrypt
        }
        
        users.append(new_user)
        save_users(users)
        
        return {
            "success": True,
            "message": "Signup Successful",
            "user": {
                "id": new_user["id"],
                "name": user.name,
                "email": user.email
            }
        }
    except Exception as e:
        print(f"Signup error: {e}")
        return {
            "success": False,
            "message": "An error occurred during signup"
        }

@router.post("/login")
def login(user: UserLogin):
    try:
        users = load_users()
        
        # Find user by email (case-insensitive)
        db_user = next((u for u in users if u["email"].lower() == user.email.lower()), None)
        if not db_user:
            return {"success": False, "message": "Invalid credentials"}
        
        # Verify password
        if db_user["password"] != user.password:
            return {"success": False, "message": "Invalid credentials"}
        
        return {
            "success": True,
            "message": "Login Successful",
            "user": {
                "id": db_user["id"],
                "name": db_user["name"],
                "email": db_user["email"],
                "phone": db_user.get("phone", "")
            }
        }
    except Exception as e:
        print(f"Login error: {e}")
        return {
            "success": False,
            "message": "An error occurred during login"
        }