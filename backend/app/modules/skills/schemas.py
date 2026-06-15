from pydantic import BaseModel, Field
from datetime import datetime

class SkillCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    category: str = Field(..., min_length=2, max_length=100)
    description: str | None = Field(None, max_length=300)

class SkillUpdate(BaseModel):
    name: str | None = Field(None, min_length=2, max_length=100)
    category: str | None = Field(None, min_length=2, max_length=100)
    description: str | None = Field(None, max_length=300)

class SkillRead(BaseModel):
    id: int
    name: str
    category: str
    description: str | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}

class SkillListRead(BaseModel):
    total: int
    items: list[SkillRead]