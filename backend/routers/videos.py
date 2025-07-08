# routers/videos.py
from googleapiclient.discovery import build


@router.get("/sync")
async def sync_youtube_videos(user_id: int):
    user = get_user_with_youtube_tokens(user_id)
    youtube = build('youtube', 'v3', developerKey=API_KEY)
    
    # Fetch latest videos from channel
    # Save to your videos table

# 1. Get channel info (after OAuth)
def get_channel_info(access_token):
    youtube = build('youtube', 'v3', developerKey=API_KEY)
    request = youtube.channels().list(
        part="snippet,statistics",
        mine=True,
        access_token=access_token
    )

# 2. Get latest videos from channel
def get_channel_videos(channel_id):
    youtube = build('youtube', 'v3', developerKey=API_KEY)
    request = youtube.search().list(
        part="snippet",
        channelId=channel_id,
        order="date",
        maxResults=10,
        type="video"
    )

@router.post("/sync")
async def sync_videos():
    # Fetch latest videos from YouTube
    # Compare with database
    # Add new ones
    return {"synced": num_new_videos}