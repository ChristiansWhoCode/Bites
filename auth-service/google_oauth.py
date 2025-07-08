# File: auth-service/google_oauth.py

from google.auth.transport import requests
from google.oauth2 import id_token
import os

def verify_google_token(token: str):
    try:
        # Verify the token with Google
        idinfo = id_token.verify_oauth2_token(
            token, 
            requests.Request(), 
            os.getenv('VITE_GOOGLE_CLIENT_ID')
        )
        
        return {
            'email': idinfo.get('email'),
            'name': idinfo.get('name'),
            'picture': idinfo.get('picture')
        }
    except ValueError:
        raise Exception("Invalid token")