
import { useState } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const API =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";


function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [asking, setAsking] = useState(false);
  const [documentId, setDocumentId] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF first.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Upload failed.");
      }

     setDocumentId(data.document_id);

     setMessage(
  `${data.filename || file.name} uploaded successfully!`
);
setFile(null);
    } catch (error) {
      setMessage(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };


const handleAsk = async (question = query) => {
  if (!question.trim()) return;

  if (!documentId) {
    setMessage("Please upload a PDF before asking a question.");
    return;
  }

  setQuery(question);
  setAsking(true);
  setAnswer("");
  setSources([]);
  setMessage("");

  
try {
  const response = await fetch(
    `${API}/ask?query=${encodeURIComponent(question)}&document_id=${encodeURIComponent(documentId)}`,
    { method: "POST" }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Could not get an answer."
    );
  }

  setAnswer(data.answer || "No answer was returned.");
  setSources(data.sources || []);

} catch (error) {
  setMessage(`Something went wrong: ${error.message}`);
} finally {
  setAsking(false);
}
};


  const suggestions = [
    "What is this document about?",
    "Summarize the key points",
    "Explain this in simple terms",
    "What are the main findings?",
  ];

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="PolyMind home">
          <span className="brand-mark">P</span>
          <span>PolyMind</span>
        </a>

        <span className="topbar-label">
          Your personal document assistant
        </span>
      </header>

      <section className="workspace">
        <div className="hero">
          <div className="eyebrow">
            <span className="status-dot" />
            YOUR DOCUMENTS, UNDERSTOOD
          </div>

          <h1>
            Chat with your
            <br />
            <span>documents.</span>
          </h1>

          <p className="subtitle">
            Upload a PDF, ask anything, and discover
            <br className="desktop-break" />
            the information that matters to you.
          </p>
        </div>

        <section className="upload-card">
          <div className="upload-icon">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 16V4" />
              <path d="m7 9 5-5 5 5" />
              <path d="M20 16.5v2A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-2" />
            </svg>
          </div>

          <h2>Start with a document</h2>
          <p className="muted">
            Choose a PDF from your computer to get started.
          </p>

          <label className="file-picker">
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(event) => {
                setFile(event.target.files?.[0] || null);
                setMessage("");
              }}
            />
            {file ? file.name : "Choose a PDF"}
          </label>

          <button
            className="primary-button upload-button"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload document"}
          </button>

          <p className="file-note">PDF documents only</p>

          {message && (
            <p className="status-message" role="status">
              {message}
            </p>
          )}
        </section>

        <div className="divider-label">
          <span />
          OR ASK A QUESTION
          <span />
        </div>

        <section className="question-section">
          <form
            className="question-box"
            onSubmit={(event) => {
              event.preventDefault();
              handleAsk();
            }}
          >
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ask something about your documents..."
              aria-label="Ask a question"
            />

            <button
              type="submit"
              className="send-button"
              disabled={asking || !query.trim()}
              aria-label="Send question"
            >
              {asking ? "..." : "↑"}
            </button>
          </form>

          <div className="suggestions">
            <p>Try asking</p>
            <div className="suggestion-list">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  className="suggestion-chip"
                  onClick={() => handleAsk(suggestion)}
                  disabled={asking}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </section>

        
{(asking || answer) && (
  <section className="answer-card" aria-live="polite">
    <div className="answer-heading">
      <span className="answer-icon">✦</span>
      <div>
        <h2>PolyMind's answer</h2>
        <p>Generated from your document context</p>
      </div>
      <span className={`answer-status ${asking ? "is-loading" : ""}`}>
        {asking ? "Thinking..." : "Ready"}
      </span>
    </div>

    {asking ? (
      <div className="answer-loading">
        <span />
        <span />
        <span />
        <p>Finding relevant information...</p>
      </div>
    ) : (
      <>
        <div className="answer-content">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {answer}
  </ReactMarkdown>
</div>

        {sources.length > 0 && (
          <div className="sources">
            <div className="sources-heading">
              <div>
                <h3>Sources</h3>
                <p>
                  {sources.length} document
                  {sources.length === 1 ? "" : "s"} referenced
                </p>
              </div>
              <span className="sources-count">
                {sources.length}
              </span>
            </div>

            <div className="source-list">
              {sources.map((source, index) => (
                <div
                  className="source-item"
                  key={`${source}-${index}`}
                >
                  <span className="pdf-icon">PDF</span>
                  <span className="source-name">{source}</span>
                  <span className="source-label">Retrieved</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="answer-actions">
          <button
            className="copy-button"
            onClick={() => {
              navigator.clipboard.writeText(answer);
              setMessage("Answer copied to clipboard!");
            }}
          >
            <span>▢</span> Copy answer
          </button>
        </div>
      </>
    )}
  </section>
)}


        <footer className="footer">
          <span>PolyMind</span>
          <span>Find clarity in every document.</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
