from groq_client import ask_llm
from prompts import PLANNER_PROMPT

def plan_game(text):
    prompt = f"{PLANNER_PROMPT}\n\n{text}"
    return ask_llm(prompt)