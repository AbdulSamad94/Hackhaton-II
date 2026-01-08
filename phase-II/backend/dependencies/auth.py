from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError
from auth.jwt import verify_token as verify_jwt_token
from utils.errors import InvalidCredentialsException

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> str:
    """Get the current user from the JWT token."""
    token = credentials.credentials
    try:
        # Use centralized auth logic
        payload = verify_jwt_token(token)
        user_id: str = payload.get("sub")
        if user_id is None:
            raise JWTError("Sub missing")
        return user_id
    except JWTError:
        raise InvalidCredentialsException()
