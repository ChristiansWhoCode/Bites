from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from middleware.auth import require_auth

router = APIRouter(prefix="/blog", tags=["blog"])

# In-memory store for demo (replace with DB in production)
BLOGS = []

class BlogPostCreate(BaseModel):
    title: str
    content_markdown: str
    image_urls: Optional[List[str]] = None

class BlogPost(BlogPostCreate):
    id: int
    created_at: datetime

@router.post("/", response_model=BlogPost)
def create_blog(post: BlogPostCreate, user = Depends(require_auth)):
    """Create blog post - requires authentication"""
    blog = BlogPost(
        id=len(BLOGS) + 1,
        title=post.title,
        content_markdown=post.content_markdown,
        image_urls=post.image_urls,
        created_at=datetime.utcnow(),
    )
    BLOGS.append(blog)
    print(f"Blog created by: {user['email']}")
    return blog

@router.get("/", response_model=List[BlogPost])
def list_blogs():
    """List all blogs - public endpoint"""
    return BLOGS

@router.get("/{blog_id}", response_model=BlogPost)
def get_blog(blog_id: int):
    """Get specific blog - public endpoint"""
    for blog in BLOGS:
        if blog.id == blog_id:
            return blog
    raise HTTPException(status_code=404, detail="Blog not found")