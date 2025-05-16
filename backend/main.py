from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi import Request
import models, schemas, auth
from database import SessionLocal, engine
# for smtp
from pydantic import BaseModel, EmailStr
from fastapi import Header
# import for AI MODEL
import os
import re
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi import Form

# imports end here
from email_utils import send_email
from auth import create_email_verification_token  # You'll add this
from fastapi.security import OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Register endpoint
# @app.post("/register")
# def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     db_user = db.query(models.User).filter(models.User.email == user.email).first()
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     hashed_password = auth.get_password_hash(user.password)
#     new_user = models.User(email=user.email, hashed_password=hashed_password, name=user.name)
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return {"message": "User created successfully"}
# @app.post("/register")
# def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     db_user = db.query(models.User).filter(models.User.email == user.email).first()
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     hashed_password = auth.get_password_hash(user.password)
#     new_user = models.User(email=user.email, hashed_password=hashed_password, name=user.name)
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)

#     # 📧 Send verification email
#     subject = "Email Verification for Nexus AI"
#     body = f"""
#     Hi {user.name},

#     Thank you for registering at Nexus AI.
    
#     Please verify your email address by clicking the link below:
#     (This is just a sample message — insert verification link here if needed.)

#     Regards,
#     Nexus AI Team
#     """
#     result = send_email(to_email=user.email, subject=subject, body=body)

#     if "error" in result:
#         raise HTTPException(status_code=500, detail=f"User created, but email failed: {result['error']}")

#     return {"message": "User registered and verification email sent."}

# new working registration code
@app.post("/register")
def register(user: schemas.UserCreate, request: Request, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(email=user.email, hashed_password=hashed_password, name=user.name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # ✅ Generate verification token
    token = create_email_verification_token(user.email)
    # verify_link = f"http://localhost:8000/verify-email?token={token}"
    verify_link = f"http://localhost:5173/email-verified?token={token}"

    # ✅ Send verification email
    subject = "Verify Your Email - Nexus AI"
    body = f"""
    Hi {user.name},

    Please verify your email by clicking this link:
    {verify_link}

    If you did not register, ignore this.

    Thanks,
    Nexus AI Team
    """
    result = send_email(to_email=user.email, subject=subject, body=body)

    if "error" in result:
        raise HTTPException(status_code=500, detail=f"Email failed: {result['error']}")

    return {"message": "Registration successful. Check email to verify your account."}

# registration code is going to end here 
# verify email start from here
# @app.get("/verify-email")
# def verify_email(token: str, db: Session = Depends(get_db)):
#     email = auth.verify_email_token(token)
#     if not email:
#         raise HTTPException(status_code=400, detail="Invalid or expired token.")

#     user = db.query(models.User).filter(models.User.email == email).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     if user.is_verified:
#         return {"message": "Account already verified."}

#     user.is_verified = True
#     db.commit()
#     return {"message": "Email verified successfully. You can now log in."}

# verify email ends here
# @app.get("/verify-email")
# def verify_email(token: str, db: Session = Depends(get_db)):
#     email = auth.verify_email_token(token)
#     if not email:
#         return JSONResponse(status_code=400, content={"message": "Invalid or expired token"})

#     user = db.query(models.User).filter(models.User.email == email).first()
#     if not user:
#         return JSONResponse(status_code=404, content={"message": "User not found"})

#     if user.is_verified:
#         return JSONResponse(status_code=200, content={"message": "Email already verified"})

#     user.is_verified = True
#     db.commit()
#     return JSONResponse(status_code=200, content={"message": "Email verified successfully"})
@app.get("/verify-email")
def verify_email(token: str, db: Session = Depends(get_db)):
    email = auth.verify_email_token(token)
    if not email:
        return JSONResponse(
            content={"message": "Invalid or expired verification link."},
            status_code=400
        )

    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return JSONResponse(
            content={"message": "User not found."},
            status_code=404
        )

    # ✅ Even if user.is_verified == True, just return "success" to keep UI consistent
    user.is_verified = True
    db.commit()

    return JSONResponse(
        content={"message": "Your email has been successfully verified."},
        status_code=200
    )

# Login endpoint
# Login endpoint
@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    # Check if the user exists and if the password is correct
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
            raise HTTPException(status_code=400, detail="Invalid credentials")

    if not db_user.is_verified:
            raise HTTPException(status_code=403, detail="Please verify your email before logging in")

    # Create access token
    token = auth.create_access_token(data={"sub": db_user.email})

    # Return response with user's name
    return JSONResponse(content={
        "access_token": token,
        "message": f"Welcome, {db_user.name}",  # Include the user's name here
        "email": db_user.email,
        "name": db_user.name  # Include name in the response
    })


# Forgot Password schema
class ForgotPasswordRequest(BaseModel):
    email: EmailStr

    class Config:
        from_attributes = True  # Updated for Pydantic v2


# Forgot Password endpoint
@app.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    token = auth.create_email_verification_token(user.email)
    reset_link = f"http://localhost:5173/reset-password?token={token}"

    subject = "Reset Your Password - Nexus AI"
    body = f"""
    Hi {user.name},

    You requested to reset your password.

    Click the link below to reset it (valid for 15 minutes):
    {reset_link}

    If you didn't request this, please ignore the email.

    Thanks,
    Nexus AI Team
    """
    result = send_email(to_email=user.email, subject=subject, body=body)

    if "error" in result:
        raise HTTPException(status_code=500, detail=f"Email sending failed: {result['error']}")

    return {"message": "Password reset link sent to your email."}
    # forgot password endpoint ends here
# reset password endpoint starts from here
class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

@app.post("/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    email = auth.verify_email_token(data.token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid or expired token.")

    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.hashed_password = auth.get_password_hash(data.new_password)
    db.commit()

    return {"message": "Password reset successful. Please log in with your new password."}


# reset password endpoint ends here 
# change password endpoint starts from here

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str
@app.post("/change-password")
def change_password(
    data: ChangePasswordRequest,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    token = authorization.replace("Bearer ", "")
    payload = auth.decode_access_token(token)

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    email = payload.get("sub")
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not auth.verify_password(data.current_password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect current password")

    user.hashed_password = auth.get_password_hash(data.new_password)
    db.commit()

    return {"message": "Password changed successfully"}
# change password endpoint ends here
class EmailTestRequest(BaseModel):
    to_email: EmailStr
    subject: str
    body: str

@app.post("/test-email")
def test_email(request: EmailTestRequest):
    result = send_email(
        to_email=request.to_email,
        subject=request.subject,
        body=request.body
    )
    return result



#     # for AI MODEL CODE : 
# load_dotenv()
# API_KEY = os.getenv("GEMINI_API_KEY")

# if not API_KEY:
#     raise ValueError("GEMINI_API_KEY not found in environment variables!")

# # Configure Gemini
# genai.configure(api_key=API_KEY)

# # Format the response text
# def format_response(text):
#     text = re.sub(r"\*\*([^\*]+)\*\*", r"\n\1:", text)
#     text = text.replace("* ", "\n")
#     text = re.sub(r"\n+", "\n\n", text)
#     return text.strip()



# @app.post("/api/chat")
# async def chat_api(message: str = Form(...)):
#     try:
#         model = genai.GenerativeModel("gemini-1.5-flash")
#         response = model.generate_content(message)
#         formatted_response = format_response(response.text)
#         return JSONResponse(content={"response": formatted_response})
#     except Exception as e:
#         return JSONResponse(content={"error": str(e)}, status_code=500)





    # AI model code ends here
    # ai model code for blogs starts here

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables!")

genai.configure(api_key=API_KEY)

# Define simple friendly gestures
friendly_gestures = {"hi", "hello", "hey", "thanks", "thank you", "good job", "nice work"}

# Format the Gemini response
def format_response(text):
    text = re.sub(r"\*\*([^\*]+)\*\*", r"\n\1:", text)
    text = text.replace("* ", "\n")
    text = re.sub(r"\n+", "\n\n", text)
    return text.strip()

# Check if message is related to blog writing or reviewing
def is_blog_related(message: str) -> bool:
    blog_keywords = [
        "write a blog", "blog on", "create a blog", "make a blog",
        "can you write a blog", "post this blog", "is this blog good",
        "review this blog", "check my blog", "improve my blog"
    ]
    message_lower = message.lower()
    return any(kw in message_lower for kw in blog_keywords)

# Check if the user provided an actual blog text (basic length heuristic)
def seems_like_a_blog(text: str) -> bool:
    # A simple check: treat it as a blog if it has at least 50 words
    return len(text.split()) > 50

@app.post("/api/chat")
async def chat_api(message: str = Form(...)):
    try:
        msg_lower = message.lower().strip()

        # Friendly replies
        if msg_lower in friendly_gestures:
            return JSONResponse(content={"response": "Hello! I'm here to help you with blogs. 😊"})

        # Check if it's a blog-related request
        if is_blog_related(msg_lower):
            # If it's a review request, check for actual blog content
            if "review" in msg_lower or "check" in msg_lower or "is this blog" in msg_lower:
                if not seems_like_a_blog(message):
                    return JSONResponse(content={"response": "❗ It seems you haven't provided a full blog. Please paste your blog so I can review it."})
            # Allow writing/reviewing the blog
            model = genai.GenerativeModel("gemini-1.5-flash")
            response = model.generate_content(message)
            formatted_response = format_response(response.text)
            return JSONResponse(content={"response": formatted_response})

        # Reject all other types of input
        return JSONResponse(content={"response": "❗ I'm here to help only with blog writing and reviewing. Please ask me to write or check a blog."})

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


    # ai model code for blogs end here