from fastapi import APIRouter, HTTPException
from app.models.user import User
from app.db.database import db
from bson import ObjectId

router = APIRouter(
    prefix="/user",
    tags=["User Management"]
)

# MongoDB collection
user_collection = db['users']

# Helper function to convert MongoDB object to Pydantic model
def user_helper(user) -> dict:
    return {
        "user_id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "phone": user["phone"],
        "reason_for_study": user["reason_for_study"],
    }

# Register a new user
@router.post("/register", response_model=User)
def register_user(user: User):
    # Check if the email is already registered
    if user_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Insert new user into the database
    new_user = user.dict()
    new_user['_id'] = ObjectId()  # Generate a new unique MongoDB ObjectId
    
    inserted_user = user_collection.insert_one(new_user)
    
    created_user = user_collection.find_one({"_id": inserted_user.inserted_id})
    return user_helper(created_user)
