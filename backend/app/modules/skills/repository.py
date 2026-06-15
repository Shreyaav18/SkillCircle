from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.modules.skills.models import Skill
from app.modules.skills.schemas import SkillCreate, SkillUpdate

async def get_by_id(db: AsyncSession, skill_id: int) -> Skill | None:
    result = await db.execute(select(Skill).where(Skill.id == skill_id))
    return result.scalar_one_or_none()

async def get_by_name_case_insensitive(db: AsyncSession, name: str) -> Skill | None:
    result = await db.execute(select(Skill).where(func.lower(Skill.name) == name.lower().strip()))
    return result.scalar_one_or_none()

async def get_all(db: AsyncSession) -> list[Skill]:
    result = await db.execute(select(Skill).order_by(Skill.category, Skill.name))
    return list(result.scalars().all())

async def get_by_category(db: AsyncSession, category: str) -> list[Skill]:
    result = await db.execute(
        select(Skill)
        .where(func.lower(Skill.category) == category.lower().strip())
        .order_by(Skill.name)
    )
    return list(result.scalars().all())

async def search_by_name(db: AsyncSession, query: str) -> list[Skill]:
    result = await db.execute(
        select(Skill)
        .where(Skill.name.ilike(f"%{query.strip()}%"))
        .order_by(Skill.name)
    )
    return list(result.scalars().all())

async def get_all_categories(db: AsyncSession) -> list[str]:
    result = await db.execute(select(Skill.category).distinct().order_by(Skill.category))
    return list(result.scalars().all())

async def create(db: AsyncSession, data: SkillCreate) -> Skill:
    skill = Skill(
        name=data.name.strip(),
        category=data.category.strip(),
        description=data.description.strip() if data.description else None,
    )
    db.add(skill)
    await db.flush()
    await db.refresh(skill)
    return skill

async def update(db: AsyncSession, skill: Skill, data: SkillUpdate) -> Skill:
    if data.name is not None:
        skill.name = data.name.strip()
    if data.category is not None:
        skill.category = data.category.strip()
    if data.description is not None:
        skill.description = data.description.strip()
    await db.flush()
    await db.refresh(skill)
    return skill

async def delete(db: AsyncSession, skill: Skill) -> None:
    await db.delete(skill)
    await db.flush()