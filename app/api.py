from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil

from app.pdf_loader import load_pdf
from app.chunking import create_chunk
from app.embedding import model
from app.vectordb import store_documents

from app.embedding import model
from app.vectordb import search_documents
from app.llm import generate_answer


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ 
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "PolyMind API is running"}


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = f"data/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = load_pdf(file_path)

    chunks = create_chunk(
        text,
        chunk_size=500
    )

    embeddings = model.encode(chunks)

    store_documents(
        chunks,
        embeddings,
        file.filename
    )

    return {
        "message": "PDF uploaded successfully",
        "filename": file.filename,
        "chunks": len(chunks)
    }

@app.post("/ask")
async def ask_question(query: str):

    query_embedding = model.encode(query)

    results = search_documents(query_embedding)

    documents = results["documents"]
    metadatas = results["metadatas"]

    content = "\n\n".join(documents)

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