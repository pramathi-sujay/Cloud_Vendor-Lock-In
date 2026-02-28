from abc import ABC, abstractmethod
from typing import List, Dict, Any

class BaseCloudProvider(ABC):
    
    @abstractmethod
    def deploy_container(self, image: str, region: str) -> Dict[str, Any]:
        """Deploy a container image to the cloud provider."""
        pass

    @abstractmethod
    def get_status(self, deployment_id: str) -> str:
        """Get the current status of a deployment."""
        pass

    @abstractmethod
    def list_deployments(self) -> List[Dict[str, Any]]:
        """List all deployments for this provider."""
        pass
