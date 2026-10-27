# 🧠 PolyMind — AI-Powered Document Assistant

**Chat with your documents. Find clarity in every page.**

PolyMind is an AI-powered document assistant that lets users upload PDF documents and ask questions about their contents. Using Retrieval-Augmented Generation (RAG), semantic search, and Google's Gemini API, PolyMind retrieves relevant document passages and generates context-aware answers.

## 🚀 Live Demo

- **Frontend:** https://polymind-nine.vercel.app/
- **Backend API:** https://polymind-mck7.onrender.com/
- **API Documentation:** https://polymind-mck7.onrender.com/docs

## ✨ Features

- 📄 **PDF Upload** — Upload PDF documents and extract their text.
- ✂️ **Text Chunking** — Split extracted content into smaller chunks for retrieval.
- 🧠 **Semantic Embeddings** — Generate text embeddings using Google's Gemini API.
- 🔍 **Vector Search** — Use ChromaDB to retrieve relevant document passages.
- 💬 **AI Question Answering** — Ask questions and receive answers based on retrieved document context.
- 📚 **Source References** — Identify the documents used to generate answers.
- 📝 **Markdown Responses** — Display formatted answers, lists, and code blocks.
- ⚡ **Responsive Interface** — A clean React-based interface for interacting with documents.

## 🛠️ Tech Stack

| Component | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Python, FastAPI |
| Embeddings | Google Gemini API (`gemini-embedding-001`) |
| Language Model | Google Gemini API |
| Vector Database | ChromaDB |
| PDF Processing | pypdf |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

## 🏗️ How It Works

1. **Upload:** The user uploads a PDF document.
2. **Extract:** PolyMind extracts the document's text.
3. **Chunk:** The text is divided into smaller passages.
4. **Embed:** Gemini converts the passages into numerical vectors.
5. **Store:** ChromaDB stores the passages and their embeddings.
6. **Retrieve:** The user's question is embedded and used to retrieve relevant passages.
7. **Generate:** Gemini uses the retrieved context to generate an answer.
8. **Display:** The frontend displays the answer and source documents.

## 📂 Project Structure

```text
POLYMIND/
├── app/
│   ├── api.py
│   ├── chunking.py
│   ├── embedding.py
│   ├── llm.py
│   ├── pdf_loader.py
│   ├── search.py
│   └── vectordb.py
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── requirements.txt
└── README.md
```

## ⚙️ Run Locally

### Prerequisites

- Python 3.10+
- Node.js and npm
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/Kishanamz/POLYMIND.git
cd POLYMIND
```

### 2. Configure the backend

Create and activate a virtual environment:

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the project root or in the location expected by your backend configuration, and configure:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit your API key to GitHub.

Start the backend from the project root:

```bash
uvicorn app.api:app --reload
```

The backend will run at `http://127.0.0.1:8000`.

API documentation is available at `http://127.0.0.1:8000/docs`.

### 3. Configure the frontend

Navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env.local` file inside `frontend/`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## 🔐 Environment Variables

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Auth