from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import APIKeyHeader
import os
from dotenv import load_dotenv
from jose import jwt
import requests

load_dotenv()

app = FastAPI()

# Clerk environment variables (make sure these are set in your .env file)
CLERK_ISSUER = os.getenv("CLERK_ISSUER", "https://live-garfish-47.clerk.accounts.dev")  # Fallback example value
CLERK_AUDIENCE = os.getenv("CLERK_AUDIENCE", "your-clerk-frontend-api-key")            # Fallback example value
CLERK_JWKS_URL = os.getenv("CLERK_JWKS_URL", "https://api.clerk.dev/v1/jwks")         # Fallback example value

# Define API key header for Swagger
api_key_header = APIKeyHeader(name="Authorization", auto_error=False)

# Function to fetch JWKS (JSON Web Key Set)
def get_jwks():
    response = requests.get(CLERK_JWKS_URL)
    response.raise_for_status()
    return response.json()

# Verify token dependency
def verify_token(authorization: str = Depends(api_key_header)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing token")
    
    token = "eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18ybVZFSm1raDcxQUdzeWZzb2dQZ2Q3Mll6RHkiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE3MzMxMjQwMTksImZ2YSI6WzkwOCwtMV0sImlhdCI6MTczMzEyMzk1OSwiaXNzIjoiaHR0cHM6Ly9saXZlLWdhcmZpc2gtNDcuY2xlcmsuYWNjb3VudHMuZGV2IiwibmJmIjoxNzMzMTIzOTQ5LCJzaWQiOiJzZXNzXzJwY2RscU1kQ0YxSnlaQXc3Y2xTeWpvMUN1diIsInN1YiI6InVzZXJfMm9uMmxNNnF2NVNsT2xENUpXMEYyNXJURFgwIn0.alWy1vyW8EbCiP6-30SkPizlG60RkBEQCRRP8g29IFrLyFIv0y8SHHK53n5PksHiEzE4EhZ5dq96jj3a9aN-n0qUdYSGStG-WGZXQ6i4-wXEIyFKSQvQjUHu9WVm8LQpXXBcs5O3YuuhuxLxnYmXezxw89U44Gew64NvC8XigNVSzThiE37qn9nrxb_FpDxpxVLt5R2XMgj9yqZPZAMNYbnTn6qHZ34-FPbVzwXOyEE1nMXb5eUzDrGIpwReQVMI2bOAA_HLE34gsq7kzmi5oR-eWei4mZWq4Y2eddS0agfXZyb74YcNwyaUUzSkUzoqmiVSKCNlnuxukxiYDH4xoA"
    
    try:
        jwks = get_jwks()
        decoded_token = jwt.decode(
            token,
            jwks,
            algorithms=["RS256"],
            audience=CLERK_AUDIENCE,
            issuer=CLERK_ISSUER,
        )
        return decoded_token
    except jwt.JWTError as e:
        raise HTTPException(status_code=401, detail=f"Token verification failed: {e}")

@app.get("/protected")
def protected_route(decoded_token: dict = Depends(verify_token)):
    return {"message": "You're authorized", "user": decoded_token}
