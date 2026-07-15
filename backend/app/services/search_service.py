# Module 5: Semantic Search & pgvector Integration
from sentence_transformers import SentenceTransformer
from sqlalchemy import text
from app.db.session import SessionDb
import uuid

class SemanticSearchService:
    def __init__(self):
        # Multilingual model for Bangla + English legal text
        self.model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

    def generate_embedding(self, text: str):
        return self.model.encode(text).tolist()

    def search_paragraphs(self, query: str, limit: int = 10):
        query_embedding = self.generate_embedding(query)
        query_str = """
            SELECT id, text, case_id, 
                   embedding <=> :embedding AS distance
            FROM paragraphs
            WHERE embedding IS NOT NULL
            ORDER BY distance
            LIMIT :limit;
        """
        with SessionDb() as db:
            result = db.execute(text(query_str), {"embedding": query_embedding, "limit": limit})
            return [{"text": row[1], "case_id": row[2], "distance": row[3]} for row in result.fetchall()]
