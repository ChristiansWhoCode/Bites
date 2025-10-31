from fastapi import APIRouter, BackgroundTasks, HTTPException
from pydantic import BaseModel, EmailStr
import smtplib
from email.message import EmailMessage
import os

router = APIRouter()

# You may want to use environment variables for these in production
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))
EMAIL_USER = os.getenv("EMAIL_USER", "your@email.com")
EMAIL_PASS = os.getenv("EMAIL_PASS", "yourpassword")
EMAIL_TO = os.getenv("EMAIL_TO", "your@email.com")

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

def send_email_background(subject: str, body: str, to: str):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = EMAIL_USER
    msg["To"] = to
    msg.set_content(body)
    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)
    except Exception as e:
        print(f"Failed to send email: {e}")

@router.post("/contact")
def contact(form: ContactForm, background_tasks: BackgroundTasks):
    subject = f"New Contact Form Submission from {form.name}"
    body = f"Name: {form.name}\nEmail: {form.email}\nMessage:\n{form.message}"
    background_tasks.add_task(send_email_background, subject, body, EMAIL_TO)
    return {"message": "Message sent successfully"}
