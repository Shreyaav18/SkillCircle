from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.skills import repository as skill_repo
from app.modules.skills.schemas import SkillCreate, SkillUpdate
from app.modules.skills.models import Skill
from app.shared.exceptions import NotFoundError, ConflictError

async def create_skill(db: AsyncSession, data: SkillCreate) -> Skill:
    existing = await skill_repo.get_by_name_case_insensitive(db, data.name)
    if existing:
        raise ConflictError(f"Skill '{data.name}' already exists")
    return await skill_repo.create(db, data)

async def get_all_skills(db: AsyncSession) -> list[Skill]:
    return await skill_repo.get_all(db)

async def get_skill_by_id(db: AsyncSession, skill_id: int) -> Skill:
    skill = await skill_repo.get_by_id(db, skill_id)
    if not skill:
        raise NotFoundError("Skill")
    return skill

async def get_skills_by_category(db: AsyncSession, category: str) -> list[Skill]:
    return await skill_repo.get_by_category(db, category)

async def search_skills(db: AsyncSession, query: str) -> list[Skill]:
    return await skill_repo.search_by_name(db, query)

async def get_all_categories(db: AsyncSession) -> list[str]:
    return await skill_repo.get_all_categories(db)

async def update_skill(db: AsyncSession, skill_id: int, data: SkillUpdate) -> Skill:
    skill = await get_skill_by_id(db, skill_id)
    if data.name:
        existing = await skill_repo.get_by_name_case_insensitive(db, data.name)
        if existing and existing.id != skill_id:
            raise ConflictError(f"Skill '{data.name}' already exists")
    return await skill_repo.update(db, skill, data)

async def delete_skill(db: AsyncSession, skill_id: int) -> None:
    skill = await get_skill_by_id(db, skill_id)
    await skill_repo.delete(db, skill)