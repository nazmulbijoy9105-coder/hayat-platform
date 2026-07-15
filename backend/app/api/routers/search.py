from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.search_service import SemanticSearchService

router = APIRouter()
search_service = SemanticSearchService()

class SearchQuery(BaseModel):
    query: str
    limit: int = 10

@router.post("/")
async def semantic_search(payload: SearchQuery):
    try:
        results = search_service.search_paragraphs(payload.query, payload.limit)
        return {"query": payload.query, "results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
