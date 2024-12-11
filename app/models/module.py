from pydantic import BaseModel, Field
from typing import List

class Module(BaseModel):
    test_id: str = Field(..., alias="TestID")  # Foreign key to Test object
    module_type: str = Field(..., alias="ModuleType")  # Listening, Reading, Writing, Speaking
    sections: List[str] = Field(default=[], alias="Sections")  # Will contain a list of Part IDs

    class Config:
        allow_population_by_field_name = True
