from fastapi import APIRouter, Depends, Header
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.modules.users import service as user_service
from app.modules.users.schemas import UserRegister, UserLogin, UserUpdate, UserRead, UserPublicRead, TokenResponse
from app.modules.users.models import User
from app.shared.exceptions import UnauthorizedError

auth_router = APIRouter(prefix="/auth", tags=["Auth"])
users_router = APIRouter(prefix="/users", tags=["Users"])

async def get_current_user(
    authorization: str = Header(...),
    db: AsyncSession = Depends(get_db),
) -> User:
    if not authorization.startswith("Bearer "):
        raise UnauthorizedError("Invalid authorization header")
    token = authorization.split(" ")[1]
    return await user_service.get_current_user(db, token)

@auth_router.post("/register", response_model=UserRead, status_code=201)
async def register(data: UserRegister, db: AsyncSession = Depends(get_db)):
    return await user_service.register_user(db, data)

@auth_router.post("/login", response_model=TokenResponse)
async def login(data: UserLogin, db: AsyncSession = Depends(get_db)):
    token = await user_service.login_user(db, data)
    return TokenResponse(access_token=token)

@users_router.get("/me", response_model=UserRead)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@users_router.patch("/me", response_model=UserRead)
async def update_me(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await user_service.update_user(db, current_user.id, data)

@users_router.get("/{user_id}", response_model=UserPublicRead)
async def get_user_profile(user_id: int, db: AsyncSession = Depends(get_db)):
    return await user_service.get_user_by_id(db, user_id)

@users_router.post("/me/skills/offered/{skill_id}", status_code=204)
async def add_offered_skill(
    skill_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await user_service.add_offered_skill(db, current_user.id, skill_id)

@users_router.delete("/me/skills/offered/{skill_id}", status_code=204)
async def remove_offered_skill(
    skill_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await user_service.remove_offered_skill(db, current_user.id, skill_id)

@users_router.post("/me/skills/wanted/{skill_id}", status_code=204)
async def add_wanted_skill(
    skill_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await user_service.add_wanted_skill(db, current_user.id, skill_id)

@users_router.delete("/me/skills/wanted/{skill_id}", status_code=204)
async def remove_wanted_skill(
    skill_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await user_service.remove_wanted_skill(db, current_user.id, skill_id)