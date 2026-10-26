from pypdf import PdfReader

def load_pdf(file_path):
    reader= PdfReader(file_path)
    text = ""
    pages=reader.pages
    for page in pages:
        text += page.extract_text()
    return text