class TaskClassifier:
    def needs_calendar(self, task):
        keywords = ["week", "schedule", "calendar", "day plan", "timetable"]
        return any(keyword in task.lower() for keyword in keywords)
