
from app.embedding import create_embedding
from app.vectordb import search_documents


def search(query):
    query_embedding = create_embedding(query)
    results = search_documents(query_embedding)
    return results
