from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Deployment(Base):
    __tablename__ = "deployments"

    id = Column(String, primary_key=True)
    provider = Column(String, nullable=False)
    container_image = Column(String, nullable=False)
    region = Column(String, nullable=False)
    status = Column(String, default="DEPLOYING")
    created_at = Column(DateTime, default=datetime.utcnow)
