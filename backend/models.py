from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy import func
from database import Base

class VideoID(BaseModel):
    video_id: str
class Note(BaseModel):
    note_id:int
    content:str
class UserRegister(BaseModel):
    username : str
    password : str

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
class Notes(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True, index=True)
    user = Column(String, index=True)
    note = Column(String, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
