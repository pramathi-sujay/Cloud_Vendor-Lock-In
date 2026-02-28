from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.deployment_service import DeploymentService
from pydantic import BaseModel
from typing import List

router = APIRouter()
service = DeploymentService()

class DeploymentRequest(BaseModel):
    provider: str
    image: str
    region: str

class DeploymentResponse(BaseModel):
    id: str
    provider: str
    container_image: str
    region: str
    status: str

@router.post("/deploy", response_model=DeploymentResponse)
def deploy_container(request: DeploymentRequest, db: Session = Depends(get_db)):
    try:
        deployment = service.deploy(db, request.provider, request.image, request.region)
        return deployment
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/deployments", response_model=List[DeploymentResponse])
def list_deployments(db: Session = Depends(get_db)):
    return service.get_all_deployments(db)

@router.get("/status/{deployment_id}", response_model=DeploymentResponse)
def get_status(deployment_id: str, db: Session = Depends(get_db)):
    deployment = service.get_deployment_status(db, deployment_id)
    if not deployment:
        raise HTTPException(status_code=404, detail="Deployment not found")
    return deployment
