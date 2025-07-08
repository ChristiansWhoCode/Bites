import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, blog, youtube

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api")
app.include_router(blog.router, prefix="/api")
app.include_router(youtube.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Backend is running"}

@app.get("/test-env")
async def test_env():
    return {
        "google_client_id": os.getenv("VITE_GOOGLE_CLIENT_ID"),
        "jwt_secret_exists": bool(os.getenv("JWT_SECRET"))
    }