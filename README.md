# 🧠 PolyMind — AI Document Assistant

**Chat with your documents using AI.**

PolyMind is an AI-powered document assistant that allows users to upload PDF documents and ask questions about their content. It uses Retrieval-Augmented Generation (RAG) to retrieve relevant information from documents and generate contextual answers using Google Gemini.

## ✨ Features

- 📄 **PDF Upload:** Upload PDF documents for analysis.
- 🔍 **Semantic Search:** Retrieve relevant document content using vector embeddings.
- 🤖 **AI-Powered Answers:** Generate contextual answers using Google Gemini.
- 🧩 **RAG Pipeline:** Combine document retrieval with large language model generation.
- 💬 **Interactive Chat Interface:** Ask questions about uploaded documents through a React-based UI.
- 📚 **Source Tracking:** Identify the source document used to answer a question.
- 🎨 **Minimalist UI:** Clean and user-friendly interface.

## 🛠️ Tech Stack

| Component | Technologies |
|---|---|
| Frontend | React, Vite, CSS |
| Backend | Python, FastAPI |
| AI Model | Google Gemini |
| Embeddings | Sentence Transformers |
| Vector Database | ChromaDB |
| PDF Processing | PyPDF |
| Markdown Rendering | React Markdown, Remark GFM |

## 🏗️ How It Works

1. **Upload:** The user uploads a PDF document.
2. **Extract:** Text is extracted from the PDF.
3. **Chunk:** The text is split into smaller chunks.
4. **Embed:** Sentence Transformers convert chunks into vector embeddings.
5. **Store:** ChromaDB stores the embeddings for retrieval.
6. **Retrieve:** A user's question is used to find relevant document chunks.
7. **Generate:** Google Gemini uses the retrieved context to generate an answer.
8. **Display:** The answer is presented in the React interface.

## 🔄 RAG Architecture

```text
         PDF Document
               |
               v
       Text Extraction
               |
               v
         Text Chunking
               |
               v
      Vector Embeddings
               |
               v
          ChromaDB
               |
               v
       User's Question
               |
               v
      Semantic Retrieval
               |
               v
      Relevant Context
               |
               v
        Google Gemini
               |
               v
        AI-Generated Answer
```

## 📁 Project Structure

```text
PolyMind/
├── app/
│   ├── api.py
│   ├── pdf_loader.py
│   ├── chunking.py
│   ├── embedding.py
│   ├── vectordb.py
│   └── llm.py
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── index.html
├── data/
├── chromadb/
├── main.py
├── .env
├── .gitignore
└── README.md
```

*Note: `.env`, local vector database files, and generated data should remain excluded from version control when they contain secrets or local data.*

## ⚙️ Getting Started

### Prerequisites

- Python 3.10
- Node.js and npm
- A Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/PolyMind.git
cd PolyMind
```

Replace `YOUR_USERNAME` with your GitHub username and use your actual repository URL.

### 2. Set Up the Backend

Create and activate a virtual environment:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install the Python dependencies:

```powershell
pip install fastapi "uvicorn[standard]" python-multipart pypdf sentence-transformers chromadb google-genai python-dotenv
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Use your actual API key locally. **Never commit your `.env` file or expose your API key publicly.**

### 4. Start the Backend

From the project root, run:

```powershell
uvicorn app.api:app --reload
```

The FastAPI server should be available at:

```text
http://127.0.0.1:8000
```

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

### 5. Start the Frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

Upload a PDF and start asking questions about its contents.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/upload` | Upload and process a PDF document |
| POST | `/ask?query=your_question` | Ask a question about stored document content |

## 🔐 Security Notes

- Keep API keys and other secrets in environment variables.
- Exclude `.env`, `.venv/`, `node_modules/`, and local vector database files from Git.
- Do not upload confidential documents to an untrusted or public deployment.
- Configure CORS appropriately before deploying the backend.

## 🚀 Future Improvements

- [ ] Display page-level citations for answers.
- [ ] Maintain conversation history and support follow-up questions.
- [ ] Improve answer formatting and response structure.
- [ ] Support multiple document formats.
- [ ] Add document management and deletion.
- [ ] Deploy the frontend and backend for public access.

## 👨‍💻 Author

**Kishan G**

B.Tech — Artificial Intelligence and Data Science

Interested in AI/ML, data analytics, and building practical AI applications.

---

*PolyMind — Making document understanding simpler with AI.*
