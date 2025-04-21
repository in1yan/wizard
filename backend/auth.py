from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt 
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import os
from database import SessionLocal
from models import User
SECRET_KEY = os.environ.get("HASH_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
def get_password_hash(plain:str):
    return pwd_context.hash(plain)
def verify_pass(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_user(db:Session, username : str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if user:
        return None
    hashed_password = get_password_hash(password)
    new_user = User(username=username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
def authenticate_user(db:Session, username : str, password : str):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_pass(password, user.hashed_password):
        return False
    return user

def create_acess_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp":expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"username":username}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
