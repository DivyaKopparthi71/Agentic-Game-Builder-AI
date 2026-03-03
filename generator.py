from groq_client import ask_llm
from prompts import GENERATOR_PROMPT

def generate_code(plan):
    prompt = f"""
{GENERATOR_PROMPT}

GAME PLAN:
{plan}
"""
    return ask_llm(prompt)