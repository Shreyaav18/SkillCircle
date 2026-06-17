from sqlalchemy import Table, Column, ForeignKey, Numeric, Boolean, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.shared.base_model import AppBase
from app.core.database import Base
from app.modules.skills.models import Skill

gig_required_skills = Table(
    "gig_required_skills",
    Base.metadata,
    Column("gig_id", ForeignKey("gigs.id", ondelete="CASCADE"), primary_key=True),
    Column("skill_id", ForeignKey("skills.id", ondelete="CASCADE"), primary_key=True),
)

class Gig(AppBase):
    __tablename__ = "gigs"

    posted_by: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(String(2000), nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    budget: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    duration_days: Mapped[int | None] = mapped_column(Integer, nullable=True)
    is_remote: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    city: Mapped[str | None] = mapped_column(String(100), nullable=True, index=True)
    urgency: Mapped[str] = mapped_column(String(20), default="normal", nullable=False)
    status: Mapped[str] = mapped_column(String(20), default="open", nullable=False, index=True)

    required_skills: Mapped[list[Skill]] = relationship(
        secondary=gig_required_skills,
        lazy="selectin",
    )
    proposals: Mapped[list["Proposal"]] = relationship(
        back_populates="gig",
        lazy="selectin",
        cascade="all, delete-orphan",
    )

    def __repr__(self):
        return f"<Gig id={self.id} title={self.title} status={self.status}>"

class Proposal(AppBase):
    __tablename__ = "proposals"

    gig_id: Mapped[int] = mapped_column(ForeignKey("gigs.id", ondelete="CASCADE"), nullable=False, index=True)
    proposed_by: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    cover_letter: Mapped[str] = mapped_column(String(2000), nullable=False)
    bid_amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    status: Mapped[str] = mapped_column(String(20), default="pending", nullable=False)

    gig: Mapped["Gig"] = relationship(back_populates="proposals", lazy="selectin")

    def __repr__(self):
        return f"<Proposal id={self.id} gig_id={self.gig_id} status={self.status}>"