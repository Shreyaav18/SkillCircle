from sqlalchemy.ext.asyncio import AsyncSession
from app.modules.gigs import repository as gig_repo
from app.modules.skills import repository as skill_repo
from app.modules.gigs.schemas import GigCreate, GigUpdate, GigFilters, ProposalCreate, GigRead
from app.modules.gigs.models import Gig, Proposal
from app.shared.exceptions import NotFoundError, ConflictError, ForbiddenError

async def create_gig(db: AsyncSession, user_id: int, data: GigCreate) -> Gig:
    return await gig_repo.create(db, user_id, data)

async def get_all_gigs(db: AsyncSession, filters: GigFilters) -> list[Gig]:
    return await gig_repo.get_all_with_filters(db, filters)

async def get_gig_by_id(db: AsyncSession, gig_id: int) -> Gig:
    gig = await gig_repo.get_by_id(db, gig_id)
    if not gig:
        raise NotFoundError("Gig")
    return gig

async def update_gig(db: AsyncSession, gig_id: int, user_id: int, data: GigUpdate) -> Gig:
    gig = await get_gig_by_id(db, gig_id)
    if gig.posted_by != user_id:
        raise ForbiddenError("You do not own this gig")
    return await gig_repo.update(db, gig, data)

async def delete_gig(db: AsyncSession, gig_id: int, user_id: int) -> None:
    gig = await get_gig_by_id(db, gig_id)
    if gig.posted_by != user_id:
        raise ForbiddenError("You do not own this gig")
    await gig_repo.delete(db, gig)

async def add_required_skill(db: AsyncSession, gig_id: int, skill_id: int, user_id: int) -> None:
    gig = await get_gig_by_id(db, gig_id)
    if gig.posted_by != user_id:
        raise ForbiddenError("You do not own this gig")
    skill = await skill_repo.get_by_id(db, skill_id)
    if not skill:
        raise NotFoundError("Skill")
    already_exists = await gig_repo.exists_required_skill(db, gig_id, skill_id)
    if already_exists:
        raise ConflictError("Skill already required for this gig")
    await gig_repo.add_required_skill(db, gig_id, skill_id)

async def remove_required_skill(db: AsyncSession, gig_id: int, skill_id: int, user_id: int) -> None:
    gig = await get_gig_by_id(db, gig_id)
    if gig.posted_by != user_id:
        raise ForbiddenError("You do not own this gig")
    exists = await gig_repo.exists_required_skill(db, gig_id, skill_id)
    if not exists:
        raise NotFoundError("Required skill")
    await gig_repo.remove_required_skill(db, gig_id, skill_id)

async def create_proposal(db: AsyncSession, gig_id: int, user_id: int, data: ProposalCreate) -> Proposal:
    gig = await get_gig_by_id(db, gig_id)
    if gig.posted_by == user_id:
        raise ForbiddenError("You cannot propose on your own gig")
    if gig.status != "open":
        raise ConflictError("Gig is not open for proposals")
    already_proposed = await gig_repo.exists_proposal_by_user(db, gig_id, user_id)
    if already_proposed:
        raise ConflictError("You have already submitted a proposal for this gig")
    return await gig_repo.create_proposal(db, gig_id, user_id, data)

async def get_proposals(db: AsyncSession, gig_id: int, user_id: int) -> list[Proposal]:
    gig = await get_gig_by_id(db, gig_id)
    if gig.posted_by != user_id:
        raise ForbiddenError("You do not own this gig")
    return await gig_repo.get_proposals_by_gig(db, gig_id)

async def update_proposal_status(db: AsyncSession, gig_id: int, proposal_id: int, user_id: int, status: str) -> Proposal:
    gig = await get_gig_by_id(db, gig_id)
    if gig.posted_by != user_id:
        raise ForbiddenError("You do not own this gig")
    proposal = await gig_repo.get_proposal_by_id(db, gig_id, proposal_id)
    if not proposal:
        raise NotFoundError("Proposal")
    if proposal.status != "pending":
        raise ConflictError("Proposal has already been resolved")
    if status == "accepted":
        await gig_repo.update_status(db, gig, "in_progress")
    return await gig_repo.update_proposal_status(db, proposal, status)

async def build_gig_read(gig: Gig) -> GigRead:
    return GigRead(
        id=gig.id,
        posted_by=gig.posted_by,
        title=gig.title,
        description=gig.description,
        category=gig.category,
        budget=float(gig.budget),
        duration_days=gig.duration_days,
        is_remote=gig.is_remote,
        city=gig.city,
        urgency=gig.urgency,
        status=gig.status,
        required_skills=gig.required_skills,
        proposal_count=len(gig.proposals),
        created_at=gig.created_at,
        updated_at=gig.updated_at,
    )