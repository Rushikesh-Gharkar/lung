from fastapi import APIRouter, HTTPException

from app.schemas.explanations import ExplanationRecord
from app.services.explanations_store import store

router = APIRouter()


@router.get("/explanations/{explanation_id}", response_model=ExplanationRecord)
def get_explanation(explanation_id: str) -> ExplanationRecord:
    record = store.get(explanation_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Explanation not found")
    return ExplanationRecord(**record)

