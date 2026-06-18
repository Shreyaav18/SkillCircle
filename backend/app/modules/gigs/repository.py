from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, insert, delete
from app.modules.gigs.models import Gig, Proposal, gig_required_skills
from app.modules.gigs.schemas import GigCreate, GigUpdate, GigFilters, ProposalCreate

async def get_by_id(db: AsyncSession, gig_id: int) -> Gig | None:
    result = await db.execute(select(Gig).where(Gig.id == gig_id))
    return result.scalar_one_or_none()

async def get_all_with_filters(db: AsyncSession, filters: GigFilters) -> list[Gig]:
    conditions = []
    if filters.category:
        conditions.append(Gig.category == filters.category)
    if filters.city:
        conditions.append(Gig.city == filters.city)
    if filters.is_remote is not None:
        conditions.append(Gig.is_remote == filters.is_remote)
    if filters.urgency:
        conditions.append(Gig.urgency == filters.urgency)
    if filters.status:
        conditions.append(Gig.status == filters.status)
    query = select(Gig).order_by(Gig.created_at.desc())
    if conditions:
        query = query.where(*conditions)
    result = await db.execute(query)
    return list(result.scalars().all())

async def create(db: AsyncSession, user_id: int, data: GigCreate) -> Gig:
    gig = Gig(
        posted_by=user_id,
        title=data.title.strip(),
        description=data.description.strip(),
        category=data.category.strip(),
        budget=data.budget,
        duration_days=data.duration_days,
        is_remote=data.is_remote,
        city=data.city.strip() if data.city else None,
        urgency=data.urgency,
        status="open",
    )
    db.add(gig)
    await db.flush()
    await db.refresh(gig)
    return gig

async def update(db: AsyncSession, gig: Gig, data: GigUpdate) -> Gig:
    if data.title is not None:
        gig.title = data.title.strip()
    if data.description is not None:
        gig.description = data.description.strip()
    if data.category is not None:
        gig.category = data.category.strip()
    if data.budget is not None:
        gig.budget = data.budget
    if data.duration_days is not None:
        gig.duration_days = data.duration_days
    if data.is_remote is not None:
        gig.is_remote = data.is_remote
    if data.city is not None:
        gig.city = data.city.strip()
    if data.urgency is not None:
        gig.urgency = data.urgency
    if data.status is not None:
        gig.status = data.status
    await db.flush()
    await db.refresh(gig)
    return gig

async def delete(db: AsyncSession, gig: Gig) -> None:
    await db.delete(gig)
    await db.flush()

async def exists_required_skill(db: AsyncSession, gig_id: int, skill_id: int) -> bool:
    result = await db.execute(
        select(gig_required_skills).where(
            gig_required_skills.c.gig_id == gig_id,
            gig_required_skills.c.skill_id == skill_id,
        )
    )
    return result.first() is not None

async def add_required_skill(db: AsyncSession, gig_id: int, skill_id: int) -> None:
    await db.execute(insert(gig_required_skills).values(gig_id=gig_id, skill_id=skill_id))
    await db.flush()

async def remove_required_skill(db: AsyncSession, gig_id: int, skill_id: int) -> None:
    await db.execute(
        delete(gig_required_skills).where(
            gig_required_skills.c.gig_id == gig_id,
            gig_required_skills.c.skill_id == skill_id,
        )
    )
    await db.flush()

async def get_proposal_by_id(db: AsyncSession, gig_id: int, proposal_id: int) -> Proposal | None:
    result = await db.execute(
        select(Proposal).where(
            Proposal.id == proposal_id,
            Proposal.gig_id == gig_id,
        )
    )
    return result.scalar_one_or_none()

async def get_proposals_by_gig(db: AsyncSession, gig_id: int) -> list[Proposal]:
    result = await db.execute(
        select(Proposal)
        .where(Proposal.gig_id == gig_id)
        .order_by(Proposal.created_at.desc())
    )
    return list(result.scalars().all())

async def exists_proposal_by_user(db: AsyncSession, gig_id: int, user_id: int) -> bool:
    result = await db.execute(
        select(Proposal).where(
            Proposal.gig_id == gig_id,
            Proposal.proposed_by == user_id,
        )
    )
    return result.scalar_one_or_none() is not None

async def create_proposal(db: AsyncSession, gig_id: int, user_id: int, data: ProposalCreate) -> Proposal:
    proposal = Proposal(
        gig_id=gig_id,
        proposed_by=user_id,
        cover_letter=data.cover_letter.strip(),
        bid_amount=data.bid_amount,
        status="pending",
    )
    db.add(proposal)
    await db.flush()
    await db.refresh(proposal)
    return proposal

async def update_proposal_status(db: AsyncSession, proposal: Proposal, status: str) -> Proposal:
    proposal.status = status
    await db.flush()
    await db.refresh(proposal)
    return proposal

async def update_status(db: AsyncSession, gig: Gig, status: str) -> Gig:
    gig.status = status
    await db.flush()
    await db.refresh(gig)
    return gig