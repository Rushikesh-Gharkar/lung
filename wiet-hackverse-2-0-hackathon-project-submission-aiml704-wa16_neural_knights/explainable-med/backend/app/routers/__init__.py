from fastapi import APIRouter

from app.routers.analyze import router as analyze_router
from app.routers.explanations import router as explanations_router
from app.routers.predict import router as predict_router

api_router = APIRouter()
api_router.include_router(analyze_router, tags=["analyze"])
api_router.include_router(predict_router, tags=["predict"])
api_router.include_router(explanations_router, tags=["explanations"])

