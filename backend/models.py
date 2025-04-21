from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from database import Base

class VideoID(BaseModel):
    video_id: str
class UserRegister(BaseModel):
    username : str
    password : str

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
