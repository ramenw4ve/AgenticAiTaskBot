import json

def save_to_memory(data, file_path="memory.json"):
    with open(file_path, "w") as f:
        json.dump(data, f, indent=2)

def load_from_memory(file_path="memory.json"):
    try:
        with open(file_path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}
