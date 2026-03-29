from fastapi import APIRouter, File, HTTPException, UploadFile

from app.schemas.analysis import AnalysisResult
from app.services.analysis_service import analyze_image_bytes
from app.services.explanations_store import store

router = APIRouter()

MAX_BYTES = 10 * 1024 * 1024


@router.post("/analyze", response_model=AnalysisResult)
async def analyze(file: UploadFile = File(...)) -> AnalysisResult:
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=415, detail="Only image uploads are supported")

    raw = await file.read()
    if len(raw) == 0:
        raise HTTPException(status_code=400, detail="Empty upload")
    if len(raw) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="File too large (max 10MB)")

    analysis_id, result = analyze_image_bytes(
        filename=file.filename or "upload",
        content_type=file.content_type,
        raw=raw,
    )
    store.create(input_data={"filename": file.filename, "content_type": file.content_type}, result=result.model_dump())
    return result


@router.post("/heatmap")
async def heatmap_only(file: UploadFile = File(...)) -> dict:
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=415, detail="Only image uploads are supported")

    raw = await file.read()
    if len(raw) == 0:
        raise HTTPException(status_code=400, detail="Empty upload")
    if len(raw) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="File too large (max 10MB)")

    _analysis_id, result = analyze_image_bytes(
        filename=file.filename or "upload",
        content_type=file.content_type,
        raw=raw,
    )
    return {"heatmapImageUrl": result.heatmapImageUrl}

