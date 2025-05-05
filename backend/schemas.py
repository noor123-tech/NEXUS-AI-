from pydantic import BaseModel


class ForgotPasswordRequest(BaseModel):
    email: str
    new_password: str

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    email: str

    class Config:
        from_attributes = True  # Change orm_mode to from_attributes
