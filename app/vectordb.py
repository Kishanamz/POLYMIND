
import chromadb

client = chromadb.PersistentClient(path="chromadb")

collection = client.get_or_create_collection(
    name="documents_gemini",
    metadata={"hnsw:space": "cosine"}
)


def store_documents(chunks, embeddings, filename, document_id):
    ids = [
        f"{document_id}_chunk_{i}"
        for i in range(len(chunks))
    ]

    metadatas = [
        {
            "source": filename,
            "document_id": document_id,
            "chunk_index": i,
        }
        for i in range(len(chunks))
    ]

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadatas,
    )

    print(
        f"Stored {len(chunks)} chunks for document "
        f"{document_id}"
    )


def search_documents(query_embedding, document_id):
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3,
        where={"document_id": document_id},
    )

    return {
        "documents": results["documents"][0],
        "metadatas": results["metadatas"][0],
    }
