from fastapi import Header, HTTPException, status
from api.config import settings


def verify_api_key(x_api_key: str = Header(...)):
    """
    Verifies API key sent in request header.
    """

    if x_api_key != settings.API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API Key"
        )

    return True