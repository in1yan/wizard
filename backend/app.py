from fastapi import FastAPI, UploadFile, File, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from rag import ConversationalRAG
from pathlib import Path
from pydantic import BaseModel
import shutil
import os
from utils.loaders import load_youtube
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag = ConversationalRAG()

# Create uploads directory if it doesn't exist
UPLOADS_DIR = Path("uploads")
UPLOADS_DIR.mkdir(exist_ok=True)
class VideoID(BaseModel):
    video_id: str
@app.post("/upload")
async def upload_file(files: list[UploadFile] = File(...)):
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
async def process_youtube(video:VideoID):
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
async def chat(question: str = Body(..., embed=True)):
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
