from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer
import jwt
import os

security = HTTPBearer()

async def verify_token(token: str = Depends(security)):
    try:
        payload = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
        return payload
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Invalid or expired token")

async def require_auth(user = Depends(verify_token)):
    """Require authentication for protected routes"""
    return user