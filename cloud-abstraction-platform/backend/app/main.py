from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import deployment_router
from .database import init_db

app = FastAPI(title="Vendor-Neutral Cloud Control Plane")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Database
@app.on_event("startup")
def on_startup():
    init_db()

# Include Routers
app.include_router(deployment_router.router, tags=["Deployments"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Vendor-Neutral Cloud Control Plane API"}
