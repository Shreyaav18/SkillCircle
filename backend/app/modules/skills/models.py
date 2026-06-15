from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Index
from app.shared.base_model import AppBase

class Skill(AppBase):
    __tablename__ = "skills"

    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    category: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    description: Mapped[str | None] = mapped_column(String(300), nullable=True)

    __table_args__ = (
        Index("ix_skill_name_category", "name", "category"),
    )

    def __repr__(self):
        return f"<Skill id={self.id} name={self.name} category={self.category}>"