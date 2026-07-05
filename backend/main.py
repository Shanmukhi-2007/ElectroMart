from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth_router
from routes.products import router as products_router
from routes.cart import router as cart_router
from routes.Profile import router as profile_router

app = FastAPI(title="ElectroMart API", version="1.0.0")

# CORS Configuration - Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers with prefixes
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(products_router, prefix="/api", tags=["Products"])
app.include_router(cart_router, prefix="/api", tags=["Cart"])
app.include_router(profile_router, prefix="/api", tags=["Profile"])

@app.get("/")
def home():
    return {
        "message": "ElectroMart API is running!",
        "version": "1.0.0",
        "endpoints": {
            "auth": "/api/auth/signup, /api/auth/login",
            "products": "/api/products, /api/products/{id}",
            "cart": "/api/cart",
            "profile": "/api/profile"
        }
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}