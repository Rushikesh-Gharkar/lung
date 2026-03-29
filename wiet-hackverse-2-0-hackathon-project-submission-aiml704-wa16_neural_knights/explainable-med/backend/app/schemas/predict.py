from pydantic import BaseModel, Field


class PredictRequest(BaseModel):
    patient_id: str | None = None
    data: dict = Field(default_factory=dict, description="Arbitrary medical input payload")


class ExplanationPayload(BaseModel):
    summary: str
    highlights: list[dict] = Field(default_factory=list)


class PredictResponse(BaseModel):
    id: str
    label: str
    score: float | None = None
    explanation: ExplanationPayload

