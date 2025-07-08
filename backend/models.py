# Database models placeholder
from sqlalchemy import Column, Integer, String, Text

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    password_hash = Column(String)
    youtube_access_token = Column(Text, nullable=True)
    youtube_refresh_token = Column(Text, nullable=True)
    youtube_channel_id = Column(String, nullable=True)