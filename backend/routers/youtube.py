# routers/youtube.py
from fastapi import APIRouter, Depends, HTTPException
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import Flow
from middleware.auth import require_auth
import os
from typing import Optional
import httpx

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


@router.get("/playlists")
async def get_playlists(channelId: Optional[str] = None, maxResults: int = 4):
    """Proxy endpoint to fetch playlists from the YouTube Data API using a
    server-side API key. Returns the raw JSON from Google.
    Set the runtime env var `YOUTUBE_API_KEY` (or `VITE_YOUTUBE_API_KEY`) on the server.
    """
    api_key = os.getenv("YOUTUBE_API_KEY") or os.getenv("VITE_YOUTUBE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=503, detail="YouTube API key not configured on server")

    if not channelId:
        raise HTTPException(status_code=400, detail="channelId is required")

    url = "https://www.googleapis.com/youtube/v3/playlists"
    params = {
        "part": "snippet",
        "channelId": channelId,
        "maxResults": str(maxResults),
        "key": api_key,
    }

    async with httpx.AsyncClient() as client:
        resp = await client.get(url, params=params, timeout=10.0)
        if resp.status_code != 200:
            # Forward errors from Google where possible
            raise HTTPException(status_code=resp.status_code, detail=resp.text)
        return resp.json()