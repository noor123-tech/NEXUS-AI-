from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str
    name: str  # New field

class UserLogin(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    name: str  # Include name in the output

    class Config:
        from_attributes = True
