import chromadb

client = chromadb.PersistentClient(
    path="chromadb"
    )
collection = client.get_or_create_collection(
    name="documents")

def store_documents(chunks, embeddings, filename):

    ids = []
    metadatas = []

    for i in range(len(chunks)):

        ids.append(f"{filename}_chunk_{i}")

        metadatas.append({
            "source": filename,
            "chunk_index": i
        })

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings.tolist(),
        metadatas=metadatas
    )

def search_documents(query_embedding):
    results = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=3
    )

    return {
        "documents": results["documents"][0],
        "metadatas": results["metadatas"][0]
    }