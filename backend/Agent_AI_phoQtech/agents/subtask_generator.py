from langchain_ollama import OllamaLLM

class SubtaskGenerator:
    def __init__(self):
        self.llm = OllamaLLM(model="phi3:3.8b")

    def get_subtasks(self, prompt):  # NOTE: This should accept a prompt, NOT a task
        result = self.llm.invoke(prompt)
        print("Raw LLM response:\n", result)  # Optional

        # Clean bullet points into a list
        return [line.strip("-•1234567890. ") for line in result.split("\n") if line.strip()]
