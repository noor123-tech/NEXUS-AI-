import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv
import os

load_dotenv()

EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_PORT = int(os.getenv("EMAIL_PORT"))
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
EMAIL_FROM = os.getenv("EMAIL_FROM")

def send_email(to_email: str, subject: str, body: str):
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = EMAIL_FROM
    msg['To'] = to_email
    msg.set_content(body)

    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
            server.send_message(msg)
        return {"message": "Email sent successfully"}
    except Exception as e:
        return {"error": str(e)}
