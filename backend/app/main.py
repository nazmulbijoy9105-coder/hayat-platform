from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import documents, cases, search, statutes, graph

app = FastAPI(title="HAYAT API", description="Hierarchical AI Taxonomy for Bangladesh Law")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(documents.router, prefix="/api/v1/documents", tags=["Documents"])
app.include_router(cases.router, prefix="/api/v1/cases", tags=["Cases"])
app.include_router(search.router, prefix="/api/v1/search", tags=["Search"])
app.include_router(statutes.router, prefix="/api/v1/statutes", tags=["Statutes"])
app.include_router(graph.router, prefix="/api/v1/graph", tags=["Graph"])

@app.get("/health")
async def health():
    return {"status": "HAYAT OS Operational"}
