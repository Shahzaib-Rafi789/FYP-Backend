from pydantic import BaseModel, Field
from typing import List

class Test(BaseModel):
    test_name: str = Field(..., alias="TestName")
