from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi_clerk_auth import HTTPAuthorizationCredentials
from app.auth.clerk import clerk_auth_guard
from app.auth.auth_service import get_authenticated_user

router = APIRouter()

@router.get("/auth")
async def get_user(credentials: HTTPAuthorizationCredentials | None = Depends(clerk_auth_guard)):
    """
    Fetch the currently authenticated user's details.
    """
    user_data = get_authenticated_user(credentials)
    return JSONResponse(content=jsonable_encoder(user_data))
