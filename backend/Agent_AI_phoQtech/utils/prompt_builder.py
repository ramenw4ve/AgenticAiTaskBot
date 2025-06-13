def build_prompt(task, calendar_data=None):
    prompt = f"You are an assistant that helps break down tasks into subtasks.\nTask: {task}\n"
    if calendar_data:
        prompt += "Here are the user's upcoming events:\n"
        for event in calendar_data:
            prompt += f"- {event['title']} from {event['start']} to {event['end']}\n"
        prompt += "Consider the schedule when planning the subtasks.\n"
    prompt += "List the subtasks clearly as bullet points."
    return prompt
