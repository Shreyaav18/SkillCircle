from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.users import repository as user_repo
from app.modules.skills import repository as skill_repo
from app.modules.users.schemas import UserRegister, UserLogin, UserUpdate
from app.modules.users.models import User
from app.core.security import hash_password, verify_password, create_access_token, decode_access_token
from app.shared.exceptions import ConflictError, UnauthorizedError, NotFoundError, ForbiddenError

async def register_user(db: AsyncSession, data: UserRegister) -> User:
    existing = await user_repo.get_by_email(db, data.email)
    if existing:
        raise ConflictError("Email already registered")
    hashed = hash_password(data.password)
    return await user_repo.create(db, data, hashed)

async def login_user(db: AsyncSession, data: UserLogin) -> str:
    user = await user_repo.get_by_email(db, data.email)
    if not user or not verify_password(data.password, user.hashed_password):
        raise UnauthorizedError("Invalid email or password")
    if not user.is_active:
        raise ForbiddenError("Account is deactivated")
    return create_access_token({"sub": str(user.id)})

async def get_user_by_id(db: AsyncSession, user_id: int) -> User:
    user = await user_repo.get_by_id(db, user_id)
    if not user:
        raise NotFoundError("User")
    return user

async def get_current_user(db: AsyncSession, token: str) -> User:
    payload = decode_access_token(token)
    if not payload:
        raise UnauthorizedError("Invalid or expired token")
    user_id = int(payload.get("sub"))
    user = await user_repo.get_by_id(db, user_id)
    if not user:
        raise UnauthorizedError("User no longer exists")
    if not user.is_active:
        raise ForbiddenError("Account is deactivated")
    return user

async def update_user(db: AsyncSession, user_id: int, data: UserUpdate) -> User:
    user = await get_user_by_id(db, user_id)
    return await user_repo.update(db, user, data)

async def add_offered_skill(db: AsyncSession, user_id: int, skill_id: int) -> None:
    skill = await skill_repo.get_by_id(db, skill_id)
    if not skill:
        raise NotFoundError("Skill")
    already_exists = await user_repo.exists_offered_skill(db, user_id, skill_id)
    if already_exists:
        raise ConflictError("Skill already in offered skills")
    await user_repo.add_offered_skill(db, user_id, skill_id)

async def remove_offered_skill(db: AsyncSession, user_id: int, skill_id: int) -> None:
    exists = await user_repo.exists_offered_skill(db, user_id, skill_id)
    if not exists:
        raise NotFoundError("Offered skill")
    await user_repo.remove_offered_skill(db, user_id, skill_id)

async def add_wanted_skill(db: AsyncSession, user_id: int, skill_id: int) -> None:
    skill = await skill_repo.get_by_id(db, skill_id)
    if not skill:
        raise NotFoundError("Skill")
    already_exists = await user_repo.exists_wanted_skill(db, user_id, skill_id)
    if already_exists:
        raise ConflictError("Skill already in wanted skills")
    await user_repo.add_wanted_skill(db, user_id, skill_id)

async def remove_wanted_skill(db: AsyncSession, user_id: int, skill_id: int) -> None:
    exists = await user_repo.exists_wanted_skill(db, user_id, skill_id)
    if not exists:
        raise NotFoundError("Wanted skill")
    await user_repo.remove_wanted_skill(db, user_id, skill_id)