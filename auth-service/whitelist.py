# File: auth-service/whitelist.py

ALLOWED_USERS = {
    "gerrit.maatkamp@gmail.com",
    "friend.email@gmail.com", 
    "teammate.email@gmail.com"
}

def is_user_allowed(email: str) -> bool:
    return email in ALLOWED_USERS