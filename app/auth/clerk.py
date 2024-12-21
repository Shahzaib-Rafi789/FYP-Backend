from fastapi_clerk_auth import ClerkConfig, ClerkHTTPBearer
import os
from dotenv import load_dotenv

load_dotenv()

CLERK_JWKS_URL = os.getenv("CLERK_JWKS_URL", "https://api.clerk.dev/v1/jwks")

# Clerk configuration
clerk_config = ClerkConfig(jwks_url=CLERK_JWKS_URL)  # Replace with your Clerk JWKS endpoint

# Clerk authentication guard
clerk_auth_guard = ClerkHTTPBearer(config=clerk_config)
