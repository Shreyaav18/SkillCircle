
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, insert, delete
from app.modules.users.models import User, user_skills_offered, user_skills_wanted
from app.modules.users.schemas import UserRegister, UserUpdate

async def get_by_id(db: AsyncSession, user_id: int) -> User | None:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()

async def get_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email.lower().strip()))
    return result.scalar_one_or_none()

async def create(db: AsyncSession, data: UserRegister, hashed_password: str) -> User:
    user = User(
        email=data.email.lower().strip(),
        hashed_password=hashed_password,
        full_name=data.full_name.strip(),
    )
    db.add(user)
    await db.flush()
    await db.refresh(user)
    return user

async def update(db: AsyncSession, user: User, data: UserUpdate) -> User:
    if data.full_name is not None:
        user.full_name = data.full_name.strip()
    if data.bio is not None:
        user.bio = data.bio.strip()
    if data.city is not None:
        user.city = data.city.strip()
    if data.state is not None:
        user.state = data.state.strip()
    if data.country is not None:
        user.country = data.country.strip()
    if data.hourly_rate is not None:
        user.hourly_rate = data.hourly_rate
    if data.avatar_url is not None:
        user.avatar_url = data.avatar_url.strip()
    if data.portfolio_url is not None:
        user.portfolio_url = data.portfolio_url.strip()
    await db.flush()
    await db.refresh(user)
    return user

async def exists_offered_skill(db: AsyncSession, user_id: int, skill_id: int) -> bool:
    result = await db.execute(
        select(user_skills_offered).where(
            user_skills_offered.c.user_id == user_id,
            user_skills_offered.c.skill_id == skill_id,
        )
    )
    return result.first() is not None

async def exists_wanted_skill(db: AsyncSession, user_id: int, skill_id: int) -> bool:
    result = await db.execute(
        select(user_skills_wanted).where(
            user_skills_wanted.c.user_id == user_id,
            user_skills_wanted.c.skill_id == skill_id,
        )
    )
    return result.first() is not None

async def add_offered_skill(db: AsyncSession, user_id: int, skill_id: int) -> None:
    await db.execute(insert(user_skills_offered).values(user_id=user_id, skill_id=skill_id))
    await db.flush()

async def remove_offered_skill(db: AsyncSession, user_id: int, skill_id: int) -> None:
    await db.execute(
        delete(user_skills_offered).where(
            user_skills_offered.c.user_id == user_id,
            user_skills_offered.c.skill_id == skill_id,
        )
    )
    await db.flush()

async def add_wanted_skill(db: AsyncSession, user_id: int, skill_id: int) -> None:
    await db.execute(insert(user_skills_wanted).values(user_id=user_id, skill_id=skill_id))
    await db.flush()

async def remove_wanted_skill(db: AsyncSession, user_id: int, skill_id: int) -> None:
    await db.execute(
        delete(user_skills_wanted).where(
            user_skills_wanted.c.user_id == user_id,
            user_skills_wanted.c.skill_id == skill_id,
        )
    )
    await db.flush()