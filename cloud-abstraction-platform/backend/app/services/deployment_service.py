import datetime
from sqlalchemy.orm import Session
from ..models.models import Deployment
from ..providers.aws_provider import AWSProvider
from ..providers.gcp_provider import GCPProvider
from ..providers.base import BaseCloudProvider
from typing import List, Optional

class DeploymentService:
    def __init__(self):
        self._providers = {
            "aws": AWSProvider(),
            "gcp": GCPProvider()
        }

    def _get_provider(self, provider_name: str) -> BaseCloudProvider:
        """Isolated provider selection logic."""
        provider = self._providers.get(provider_name.lower())
        if not provider:
            raise ValueError(f"Provider {provider_name} not supported.")
        return provider

    def deploy(self, db: Session, provider_name: str, image: str, region: str) -> Deployment:
        provider_instance = self._get_provider(provider_name)
        
        # Call provider logic
        result = provider_instance.deploy_container(image, region)
        
        # Save to DB
        new_deployment = Deployment(
            id=result["deployment_id"],
            provider=provider_name.upper(),
            container_image=image,
            region=region,
            status="DEPLOYING",
            created_at=datetime.datetime.utcnow()
        )
        db.add(new_deployment)
        db.commit()
        db.refresh(new_deployment)
        return new_deployment

    def get_all_deployments(self, db: Session) -> List[Deployment]:
        deployments = db.query(Deployment).all()
        # Simulate status transition: DEPLOYING -> RUNNING after 10 seconds
        for d in deployments:
            self._update_simulated_status(db, d)
        return deployments

    def get_deployment_status(self, db: Session, deployment_id: str) -> Optional[Deployment]:
        deployment = db.query(Deployment).filter(Deployment.id == deployment_id).first()
        if deployment:
            self._update_simulated_status(db, deployment)
        return deployment

    def _update_simulated_status(self, db: Session, deployment: Deployment):
        """Simulates status transition from DEPLOYING to RUNNING after 10 seconds."""
        if deployment.status == "DEPLOYING":
            elapsed = datetime.datetime.utcnow() - deployment.created_at
            if elapsed.total_seconds() > 10:
                deployment.status = "RUNNING"
                db.commit()
                db.refresh(deployment)
