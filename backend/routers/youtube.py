# routers/youtube.py
from fastapi import APIRouter, Depends, HTTPException
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import Flow
from middleware.auth import require_auth
import os

router = APIRouter(prefix="/youtube", tags=["youtube"])

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = "http://localhost:3000/admin/youtube/callback"

SCOPES = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar.events"  # for booking
]

@router.get("/auth-url")
async def get_auth_url(user = Depends(require_auth)):
    """Get YouTube auth URL - requires authentication"""
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uris": [REDIRECT_URI],
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token"
            }
        },
        scopes=SCOPES
    )
    flow.redirect_uri = REDIRECT_URI
    
    auth_url, _ = flow.authorization_url(prompt='consent')
    print(f"YouTube auth requested by: {user['email']}")
    return {"auth_url": auth_url}

@router.post("/callback")
async def youtube_callback(code: str, user = Depends(require_auth)):
    """Handle YouTube OAuth callback - requires authentication"""
    # Exchange code for tokens and save to user
    print(f"YouTube callback for user: {user['email']}")
    return {"message": "YouTube connected successfully"}