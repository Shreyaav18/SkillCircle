from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from app.modules.skills.schemas import SkillRead
class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=100)
    full_name: str = Field(..., min_length=2, max_length=150)
class UserLogin(BaseModel):
    email: EmailStr
    password: str
class UserUpdate(BaseModel):
    full_name: str | None = Field(None, min_length=2, max_length=150)
    bio: str | None = Field(None, max_length=500)
    city: str | None = Field(None, max_length=100)
    state: str | None = Field(None, max_length=100)
    country: str | None = Field(None, max_length=100)
    hourly_rate: float | None = Field(None, ge=0)
    avatar_url: str | None = Field(None, max_length=500)
    portfolio_url: str | None = Field(None, max_length=500)
class UserRead(BaseModel):
    id: int
    email: str
    full_name: str
    bio: str | None
    city: str | None
    state: str | None
    country: str | None
    hourly_rate: float | None
    trust_score: float
    is_verified: bool
    is_active: bool
    avatar_url: str | None
    portfolio_url: str | None
    skills_offered: list[SkillRead]
    skills_wanted: list[SkillRead]
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}

class UserPublicRead(BaseModel):
    id: int
    full_name: str
    bio: str | None
    city: str | None
    state: str | None
    country: str | None
    hourly_rate: float | None
    trust_score: float
    is_verified: bool
    avatar_url: str | None
    portfolio_url: str | None
    skills_offered: list[SkillRead]
    skills_wanted: list[SkillRead]

    model_config = {"from_attributes": True}

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"