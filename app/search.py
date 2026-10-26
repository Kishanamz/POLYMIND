from sentence_transformers import util

from app.embedding import model

def search(query,chunks,embeddings):

    query_embedding = model.encode(query)

    scores = util.cos_sim(
        query_embedding,
        embeddings
    )[0]

    best_match = scores.argmax().item()

    return chunks[best_match], scores[best_match].item()