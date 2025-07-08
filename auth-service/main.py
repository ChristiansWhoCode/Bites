# File: auth-service/main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from google_oauth import verify_google_token
from whitelist import is_user_allowed
import jwt
import os

app = FastAPI()

class TokenRequest(BaseModel):
    token: str

@app.post("/validate-google-token")
async def validate_google_token(request: TokenRequest):
    try:
        # Verify with Google
        user_info = verify_google_token(request.token)
        email = user_info.get("email")
        
        # Check whitelist
        if not is_user_allowed(email):
            raise HTTPException(403, "User not authorized")
            
        # Generate app JWT
        app_token = jwt.encode(
            {"email": email, "name": user_info.get("name")},
            os.getenv("JWT_SECRET"),
            algorithm="HS256"
        )
        
        return {"valid": True, "app_token": app_token, "user": user_info}
        
    except Exception as e:
        raise HTTPException(401, "Invalid token")