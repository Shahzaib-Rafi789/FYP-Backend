from fastapi_clerk_auth import HTTPAuthorizationCredentials

def get_authenticated_user(credentials: HTTPAuthorizationCredentials):
    """
    Extract and return authenticated user details from Clerk credentials.
    """
    return {
        "token": credentials.credentials,
        "token_type": credentials.scheme
    }
