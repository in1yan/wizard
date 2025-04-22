from fastapi import FastAPI, UploadFile, File, HTTPException, Body, Depends
from fastapi.middleware.cors import CORSMiddleware
from rag import ConversationalRAG
from pathlib import Path
import shutil
import os
from utils.loaders import load_youtube
from auth import authenticate_user, create_acess_token, get_current_user, create_user, get_db
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from models import VideoID, UserRegister
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag = ConversationalRAG()

# Create uploads directory if it doesn't exist
UPLOADS_DIR = Path("uploads")
UPLOADS_DIR.mkdir(exist_ok=True)

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm= Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_acess_token(data={"sub":user.username})
    return {"access_token": access_token, "token_type":"bearer"}

@app.post("/register")
async def register(form_data: UserRegister, db: Session = Depends(get_db)):
    created_user = create_user(db, form_data.username, form_data.password)
    if not created_user:
        raise HTTPException(status_code=400, detail="user already exists")
    return {"message":"Registered successfully"}
@app.post("/upload")
async def upload_file(files: list[UploadFile] = File(...),user:dict = Depends(get_current_user)):
    try:
        # Save uploaded files
        saved_files = []
        for file in files:
            file_path = UPLOADS_DIR / file.filename
            with file_path.open("wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            saved_files.append(str(file_path))

        # Process documents
        documents = []
        for path in saved_files:
            documents.extend(rag.load_documents(path))
        print("Processing")
        rag.process_documents(documents)
        return {"message": f"Processed {len(saved_files)} files"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@app.post("/process-youtube")
async def process_youtube(video:VideoID, user:dict = Depends(get_current_user)):
    try:
        id = video.video_id
        videos, title = load_youtube(id)
        rag.process_youtube(videos)
        return {"message": f"Processed {title}", "title": title}
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@app.post("/chat")
async def chat(question: str = Body(..., embed=True), user:dict = Depends(get_current_user)):
    try:
        # Using the already extracted question parameter
        if not question:
            raise HTTPException(status_code=422, detail="Question field is required")
        response = rag.chat(question)
        return {"response": response}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
