from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum
from app.modules.skills.schemas import SkillRead

class GigUrgency(str, Enum):
    low = "low"
    normal = "normal"
    high = "high"
    urgent = "urgent"

class GigStatus(str, Enum):
    open = "open"
    in_progress = "in_progress"
    completed = "completed"
    cancelled = "cancelled"

class ProposalStatus(str, Enum):
    pending = "pending"
    accepted = "accepted"
    rejected = "rejected"

class GigCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    description: str = Field(..., min_length=20, max_length=2000)
    category: str = Field(..., min_length=2, max_length=100)
    budget: float = Field(..., gt=0)
    duration_days: int | None = Field(None, gt=0)
    is_remote: bool = True
    city: str | None = Field(None, max_length=100)
    urgency: GigUrgency = GigUrgency.normal

class GigUpdate(BaseModel):
    title: str | None = Field(None, min_length=5, max_length=200)
    description: str | None = Field(None, min_length=20, max_length=2000)
    category: str | None = Field(None, min_length=2, max_length=100)
    budget: float | None = Field(None, gt=0)
    duration_days: int | None = Field(None, gt=0)
    is_remote: bool | None = None
    city: str | None = Field(None, max_length=100)
    urgency: GigUrgency | None = None
    status: GigStatus | None = None

class GigRead(BaseModel):
    id: int
    posted_by: int
    title: str
    description: str
    category: str
    budget: float
    duration_days: int | None
    is_remote: bool
    city: str | None
    urgency: GigUrgency
    status: GigStatus
    required_skills: list[SkillRead]
    proposal_count: int = 0
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}

class GigListRead(BaseModel):
    total: int
    items: list[GigRead]

class GigFilters(BaseModel):
    category: str | None = None
    city: str | None = None
    is_remote: bool | None = None
    urgency: GigUrgency | None = None
    status: GigStatus | None = GigStatus.open

class ProposalCreate(BaseModel):
    cover_letter: str = Field(..., min_length=20, max_length=2000)
    bid_amount: float = Field(..., gt=0)

class ProposalUpdate(BaseModel):
    status: ProposalStatus

class ProposalRead(BaseModel):
    id: int
    gig_id: int
    proposed_by: int
    cover_letter: str
    bid_amount: float
    status: ProposalStatus
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}

class ProposalListRead(BaseModel):
    total: int
    items: list[ProposalRead]