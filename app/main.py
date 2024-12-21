from fastapi import FastAPI
# from app.api.routes.user import User
from app.api.routes.auth_routes import router as auth_router

app = FastAPI(
    title="IELTS Test Management API",
    description="API for managing exams, student responses, and user data.",
    version="1.0.0",
)

# app.include_router(exam.router)
# app.include_router(student.router)
# app.include_router(user.router)
app.include_router(auth_router, prefix="/api", tags=["Authentication"])

@app.get("/")
def root():
    return {"message": "Welcome to the IELTS Test Management API"}
