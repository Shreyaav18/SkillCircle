from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.modules.skills import service as skill_service
from app.modules.skills.schemas import SkillCreate, SkillUpdate, SkillRead, SkillListRead

router = APIRouter(prefix="/skills", tags=["Skills"])

@router.post("/", response_model=SkillRead, status_code=201)
async def create_skill(data: SkillCreate, db: AsyncSession = Depends(get_db)):
    return await skill_service.create_skill(db, data)

@router.get("/", response_model=SkillListRead)
async def get_all_skills(db: AsyncSession = Depends(get_db)):
    skills = await skill_service.get_all_skills(db)
    return SkillListRead(total=len(skills), items=skills)

@router.get("/categories", response_model=list[str])
async def get_categories(db: AsyncSession = Depends(get_db)):
    return await skill_service.get_all_categories(db)

@router.get("/search", response_model=SkillListRead)
async def search_skills(q: str = Query(..., min_length=1), db: AsyncSession = Depends(get_db)):
    skills = await skill_service.search_skills(db, q)
    return SkillListRead(total=len(skills), items=skills)

@router.get("/{skill_id}", response_model=SkillRead)
async def get_skill(skill_id: int, db: AsyncSession = Depends(get_db)):
    return await skill_service.get_skill_by_id(db, skill_id)

@router.get("/category/{category}", response_model=SkillListRead)
async def get_by_category(category: str, db: AsyncSession = Depends(get_db)):
    skills = await skill_service.get_skills_by_category(db, category)
    return SkillListRead(total=len(skills), items=skills)

@router.patch("/{skill_id}", response_model=SkillRead)
async def update_skill(skill_id: int, data: SkillUpdate, db: AsyncSession = Depends(get_db)):
    return await skill_service.update_skill(db, skill_id, data)

@router.delete("/{skill_id}", status_code=204)
async def delete_skill(skill_id: int, db: AsyncSession = Depends(get_db)):
    await skill_service.delete_skill(db, skill_id)