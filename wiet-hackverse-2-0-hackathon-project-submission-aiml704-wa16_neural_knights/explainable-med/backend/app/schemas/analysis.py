from pydantic import BaseModel, Field


class FeatureWeight(BaseModel):
    name: str
    weight: int = Field(ge=0, le=100)
    color: str


class Differential(BaseModel):
    label: str
    confidence: int = Field(ge=0, le=100)


class AnalysisResult(BaseModel):
    originalImageUrl: str
    heatmapImageUrl: str
    label: str
    confidence: int = Field(ge=0, le=100)
    severity: str = Field(pattern="^(low|moderate|high)$")
    explanation: str
    keyFindings: list[str] = Field(default_factory=list)
    differentials: list[Differential] = Field(default_factory=list)
    featureWeights: list[FeatureWeight] = Field(default_factory=list)
    # "chest_xray" = pneumonia model | "lung_ct" = lung cancer model
    scanType: str = Field(default="chest_xray")
