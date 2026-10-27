import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil

from app.pdf_loader import load_pdf
from app.chunking import create_chunk
from app.embedding import create_embedding, create_embeddings
from app.vectordb import store_documents
from app.vectordb import search_documents
from app.llm import generate_answer


app = FastAPI()

frontend_url = os.getenv("FRONTEND_URL", "").rstrip("/")

allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

if frontend_url:
    allowed_origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "PolyMind API is running"}



@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    os.makedirs("data", exist_ok=True)

    file_path = os.path.join("data", file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print("Uploaded filename:", file.filename)

    text = load_pdf(file_path)
    print("Extracted text length:", len(text))

    if not text or not text.strip():
        return {"error": "No text could be extracted from this PDF."}

    chunks = create_chunk(text, chunk_size=500)
    print("Number of chunks:", len(chunks))

    if not chunks:
        return {"error": "No chunks were created from the PDF."}

    embeddings = create_embeddings(chunks)

    store_documents(chunks, embeddings, file.filename)

    return {
        "message": "PDF uploaded successfully",
        "filename": file.filename,
        "chunks": len(chunks)
    }

@app.post("/ask")
async def ask_question(query: str):

    query_embedding = create_embedding(query)

    results = search_documents(query_embedding)

    documents = results["documents"]
    metadatas = results["metadatas"]
    print("Retrieved documents:", results["documents"])
    print("Retrieved metadata:", results["metadatas"]) 
    content = "\n\n".join(documents)
    print("Context length:", len(content))
    answer = generate_answer(
        query,
        content
    )
    sources = []

    for metadata in metadatas:
        if metadata["source"] not in sources:
            sources.append(metadata["source"])

    return {
        "question": query,
        "answer": answer,
        "sources": sources
    }