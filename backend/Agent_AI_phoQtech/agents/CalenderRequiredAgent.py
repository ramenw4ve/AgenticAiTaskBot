# -------------------- agent/calendar_agent.py --------------------
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import datetime
import os
import pickle

class CalendarAgent:
    def init(self):
        self.SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]
        self.creds = None
        self.service = self.authenticate()

    def authenticate(self):
        if os.path.exists("token.pickle"):
            with open("token.pickle", "rb") as token:
                self.creds = pickle.load(token)
        if not self.creds or not self.creds.valid:
            if self.creds and self.creds.expired and self.creds.refresh_token:
                self.creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file("credentials.json", self.SCOPES)
                self.creds = flow.run_local_server(port=0)
            with open("token.pickle", "wb") as token:
                pickle.dump(self.creds, token)

        return build("calendar", "v3", credentials=self.creds)

    def get_events(self):
        now = datetime.datetime.utcnow().isoformat() + "Z"  # 'Z' = UTC time
        events_result = self.service.events().list(
            calendarId="primary", timeMin=now,
            maxResults=10, singleEvents=True,
            orderBy="startTime").execute()
        events = events_result.get("items", [])

        parsed_events = []
        for event in events:
            parsed_events.append({
                "title": event.get("summary", "No Title"),
                "start": event["start"].get("dateTime", event["start"].get("date")),
                "end": event["end"].get("dateTime", event["end"].get("date"))
            })

        return parsed_events