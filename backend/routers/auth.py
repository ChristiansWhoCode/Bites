import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class GoogleTokenRequest(BaseModel):
    token: str

@router.post("/auth/google")
async def google_login(request: GoogleTokenRequest):
    # Call auth microservice
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://auth-service:8000/validate-google-token",
            json={"token": request.token}
        )
        
    if response.status_code == 403:
        raise HTTPException(403, "Access denied")
    elif response.status_code != 200:
        raise HTTPException(401, "Authentication failed")
        
    auth_data = response.json()
    return {"access_token": auth_data["app_token"]}