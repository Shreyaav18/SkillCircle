from sqlalchemy import Table, Column, ForeignKey, Numeric, Boolean, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.shared.base_model import AppBase
from app.core.database import Base
from app.modules.skills.models import Skill

user_skills_offered = Table(
    "user_skills_offered",
    Base.metadata,
    Column("user_id", ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
    Column("skill_id", ForeignKey("skills.id", ondelete="CASCADE"), primary_key=True),
)

user_skills_wanted = Table(
    "user_skills_wanted",
    Base.metadata,
    Column("user_id", ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
    Column("skill_id", ForeignKey("skills.id", ondelete="CASCADE"), primary_key=True),
)

class User(AppBase):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(150), nullable=False)
    bio: Mapped[str | None] = mapped_column(String(500), nullable=True)
    city: Mapped[str | None] = mapped_column(String(100), nullable=True)
    state: Mapped[str | None] = mapped_column(String(100), nullable=True)
    country: Mapped[str | None] = mapped_column(String(100), nullable=True)
    hourly_rate: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)
    trust_score: Mapped[float] = mapped_column(Numeric(4, 2), default=0.0, nullable=False)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    avatar_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    portfolio_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    skills_offered: Mapped[list[Skill]] = relationship(
        secondary=user_skills_offered,
        lazy="selectin",
    )
    skills_wanted: Mapped[list[Skill]] = relationship(
        secondary=user_skills_wanted,
        lazy="selectin",
    )

    def __repr__(self):
        return f"<User id={self.id} email={self.email}>"