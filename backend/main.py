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
from email_utils import send_email
from auth import create_email_verification_token  # You'll add this


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
    verify_link = f"http://localhost:8000/verify-email?token={token}"

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
@app.get("/verify-email")
def verify_email(token: str, db: Session = Depends(get_db)):
    email = auth.verify_email_token(token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid or expired token.")

    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.is_verified:
        return {"message": "Account already verified."}

    user.is_verified = True
    db.commit()
    return {"message": "Email verified successfully. You can now log in."}

# verify email ends here
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
    email: str
    new_password: str

    class Config:
        from_attributes = True  # Updated for Pydantic v2


# Forgot Password endpoint
@app.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.hashed_password = auth.get_password_hash(data.new_password)
    db.commit()
    return {"msg": "Password updated successfully"}


    # forgot password endpoint ends here


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