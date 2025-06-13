from datetime import datetime

def format_datetime(iso_str):
    return datetime.fromisoformat(iso_str).strftime("%A, %d %B %Y at %I:%M %p")