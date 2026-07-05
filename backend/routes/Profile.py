from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
import json
import os

router = APIRouter()

PROFILES_FILE = "profiles_db.json"

class ProfileUpdate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: str
    phone: str = ""

def load_profiles():
    """Load all profiles from persistent storage"""
    if os.path.exists(PROFILES_FILE):
        try:
            with open(PROFILES_FILE, "r") as f:
                data = json.load(f)
                return data if isinstance(data, dict) else {}
        except Exception as e:
            print(f"Error loading profiles: {e}")
            return {}
    return {}

def save_profiles(profiles):
    """Save profiles to persistent storage"""
    try:
        with open(PROFILES_FILE, "w") as f:
            json.dump(profiles, f, indent=2)
    except Exception as e:
        print(f"Error saving profiles: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to save profile")

# Default profile
DEFAULT_PROFILE = {
    "default": {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "phone": "+91 9999999999"
    }
}

@router.get("/profile")
def get_profile():
    """Get user profile"""
    try:
        profiles = load_profiles()
        if not profiles:
            save_profiles(DEFAULT_PROFILE)
            return DEFAULT_PROFILE["default"]
        return profiles.get("default", DEFAULT_PROFILE["default"])
    except Exception as e:
        print(f"Error fetching profile: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch profile")

@router.put("/profile")
def update_profile(profile: ProfileUpdate):
    """Update user profile"""
    try:
        profiles = load_profiles()
        
        profiles["default"] = {
            "name": profile.name,
            "email": profile.email,
            "phone": profile.phone
        }
        
        save_profiles(profiles)
        
        return {
            "success": True,
            "message": "Profile updated successfully",
            "profile": profiles["default"]
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error updating profile: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update profile")
