
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

EMBEDDING_MODEL = "gemini-embedding-001"


def create_embedding(text):
    response = client.models.embed_content(
        model=EMBEDDING_MODEL,
        contents=text
    )
    return response.embeddings[0].values


def create_embeddings(texts):
    response = client.models.embed_content(
        model=EMBEDDING_MODEL,
        contents=texts
    )
    return [item.values for item in response.embeddings]
