# backend/services/memory_service.py

from datetime import datetime

_embedder = None
_collection = None


def get_embedder():
    global _embedder
    if _embedder is None:
        from sentence_transformers import SentenceTransformer
        _embedder = SentenceTransformer("all-MiniLM-L6-v2")
    return _embedder


def get_collection():
    global _collection
    if _collection is None:
        import chromadb
        client = chromadb.Client()
        _collection = client.get_or_create_collection("persona_memory")
    return _collection


def should_store_as_memory(text: str) -> bool:
    text = text.lower().strip()

    # ❌ never store questions
    if text.endswith("?"):
        return False

    keywords = [
        "my name is",
        "i am ",
        "i like",
        "i love",
        "i hate",
        "remember",
        "always",
        "never"
    ]

    return any(k in text for k in keywords)

def store_memory(persona_id: str, content: str, source: str = "user"):
    embedding = get_embedder().encode(content).tolist()

    metadata = {
        "persona_id": persona_id,
        "source": source,
        "timestamp": datetime.utcnow().isoformat()
    }

    get_collection().add(
        documents=[content],
        embeddings=[embedding],
        metadatas=[metadata],    # ✅ CORRECT
        ids=[f"{persona_id}-{datetime.utcnow().timestamp()}"]
    )


def retrieve_memories(persona_id: str, query: str, k: int = 3):
    query_embedding = get_embedder().encode(query).tolist()

    results = get_collection().query(
        query_embeddings=[query_embedding],
        n_results=k,
        where={"persona_id": persona_id}
    )

    if not results or not results["documents"]:
        return []

    return results["documents"][0]
