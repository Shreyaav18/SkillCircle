from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.modules.gigs import service as gig_service
from app.modules.gigs.schemas import (
    GigCreate, GigUpdate, GigRead, GigListRead,
    GigFilters, GigStatus, GigUrgency,
    ProposalCreate, ProposalUpdate, ProposalRead, ProposalListRead
)
from app.modules.users.router import get_current_user
from app.modules.users.models import User

router = APIRouter(prefix="/gigs", tags=["Gigs"])

@router.post("/", response_model=GigRead, status_code=201)
async def create_gig(
    data: GigCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    gig = await gig_service.create_gig(db, current_user.id, data)
    return await gig_service.build_gig_read(gig)

@router.get("/", response_model=GigListRead)
async def get_all_gigs(
    category: str | None = Query(None),
    city: str | None = Query(None),
    is_remote: bool | None = Query(None),
    urgency: GigUrgency | None = Query(None),
    status: GigStatus | None = Query(GigStatus.open),
    db: AsyncSession = Depends(get_db),
):
    filters = GigFilters(
        category=category,
        city=city,
        is_remote=is_remote,
        urgency=urgency,
        status=status,
    )
    gigs = await gig_service.get_all_gigs(db, filters)
    items = [await gig_service.build_gig_read(g) for g in gigs]
    return GigListRead(total=len(items), items=items)

@router.get("/{gig_id}", response_model=GigRead)
async def get_gig(gig_id: int, db: AsyncSession = Depends(get_db)):
    gig = await gig_service.get_gig_by_id(db, gig_id)
    return await gig_service.build_gig_read(gig)

@router.patch("/{gig_id}", response_model=GigRead)
async def update_gig(
    gig_id: int,
    data: GigUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    gig = await gig_service.update_gig(db, gig_id, current_user.id, data)
    return await gig_service.build_gig_read(gig)

@router.delete("/{gig_id}", status_code=204)
async def delete_gig(
    gig_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await gig_service.delete_gig(db, gig_id, current_user.id)

@router.post("/{gig_id}/skills/{skill_id}", status_code=204)
async def add_required_skill(
    gig_id: int,
    skill_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await gig_service.add_required_skill(db, gig_id, skill_id, current_user.id)

@router.delete("/{gig_id}/skills/{skill_id}", status_code=204)
async def remove_required_skill(
    gig_id: int,
    skill_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await gig_service.remove_required_skill(db, gig_id, skill_id, current_user.id)

@router.post("/{gig_id}/proposals", response_model=ProposalRead, status_code=201)
async def create_proposal(
    gig_id: int,
    data: ProposalCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await gig_service.create_proposal(db, gig_id, current_user.id, data)

@router.get("/{gig_id}/proposals", response_model=ProposalListRead)
async def get_proposals(
    gig_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    proposals = await gig_service.get_proposals(db, gig_id, current_user.id)
    return ProposalListRead(total=len(proposals), items=proposals)

@router.patch("/{gig_id}/proposals/{proposal_id}", response_model=ProposalRead)
async def update_proposal_status(
    gig_id: int,
    proposal_id: int,
    data: ProposalUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await gig_service.update_proposal_status(db, gig_id, proposal_id, current_user.id, data.status)