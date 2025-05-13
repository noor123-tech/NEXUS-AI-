from sqlalchemy import Column, Integer, Boolean , String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    name = Column(String, nullable=True)  # New name field
    google_id = Column(String, nullable=True)
    is_verified = Column(Boolean, default=False)  # ✅ Add this line
