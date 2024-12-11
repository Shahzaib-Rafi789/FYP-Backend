from pydantic import BaseModel

class User(BaseModel):
    # user_id: str
    name: str
    email: str
    phone: str
    reason_for_study: str
