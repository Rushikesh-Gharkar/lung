from pydantic import BaseModel


class ExplanationRecord(BaseModel):
    id: str
    created_at: str
    input_data: dict
    result: dict

