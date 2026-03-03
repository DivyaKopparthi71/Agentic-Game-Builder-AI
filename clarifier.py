from groq_client import ask_llm
from prompts import CLARIFIER_PROMPT

def clarify(idea):
    prompt = f"{CLARIFIER_PROMPT}\n\n{idea}"
    return ask_llm(prompt)