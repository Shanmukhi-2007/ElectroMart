# ElectroMart Deployment Guide

## Backend Deployment (Render.com)

### Step 1: Create Render Account
- Go to https://render.com
- Sign up with GitHub

### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Select your GitHub repository
3. Fill in details:
   - **Name:** electromart-backend
   - **Environment:** Python
   - **Region:** Choose nearest region
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port 8000`

### Step 3: Add Environment Variables
In Render dashboard, add these variables:
```
MONGO_URL=mongodb+srv://veludutishanmukhi3_db_user:Shanmukhi@2007cluster0.ugqkwlo.mongodb.net/electromart?retryWrites=true&w=majority&appName=Cluster0
API_URL=https://electromart-backend.onrender.com (your actual render URL)
FRONTEND_URL=https://electromart-2026.netlify.app
ENV=production
JWT_SECRET=electromart-secret-key-2026-production
BCRYPT_LOG_ROUNDS=12
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,https://electromart-2026.netlify.app
```

### Step 4: Deploy
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Copy your service URL: `https://electromart-backend-xxxx.onrender.com`

---

## Frontend Update (Netlify)

### Step 1: Update Frontend .env.production
Replace `https://your-backend-url.com/api` with your Render URL:
```
VITE_API_URL=https://electromart-backend-xxxx.onrender.com/api
```

### Step 2: Add Netlify Environment Variable
1. Go to https://app.netlify.com/sites/electromart-2026/settings/deploys
2. Click "Environment"
3. Add:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://electromart-backend-xxxx.onrender.com/api`

### Step 3: Trigger Redeploy
```bash
git add .
git commit -m "Update backend URL for production"
git push
```

---

## Testing

1. Go to https://electromart-2026.netlify.app
2. Try to:
   - ✅ View products
   - ✅ Sign up with new account
   - ✅ Login
   - ✅ Add to cart
   - ✅ View profile

If any errors, check browser console (F12) for API errors.

---

## Troubleshooting

### "Failed to load products"
- Check backend is running: Visit `https://electromart-backend-xxxx.onrender.com/health`
- Check API URL is correct in Netlify environment variables

### CORS Error
- Backend CORS is already updated to allow Netlify domain
- Restart Render service if changed

### MongoDB Connection Error
- Verify MongoDB connection string in Render env variables
- Check IP whitelist in MongoDB Atlas allows Render IPs
