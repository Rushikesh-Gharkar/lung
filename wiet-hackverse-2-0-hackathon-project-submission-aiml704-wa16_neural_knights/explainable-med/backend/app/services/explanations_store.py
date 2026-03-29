from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from uuid import uuid4


@dataclass
class ExplanationsStore:
    _records: dict[str, dict] = field(default_factory=dict)

    def create(self, *, input_data: dict, result: dict) -> str:
        explanation_id = str(uuid4())
        self._records[explanation_id] = {
            "id": explanation_id,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "input_data": input_data,
            "result": result,
        }
        return explanation_id

    def get(self, explanation_id: str) -> dict | None:
        return self._records.get(explanation_id)


store = ExplanationsStore()

