from dotenv import load_dotenv
load_dotenv()

from clarifier import clarify
from planner import plan_game
from generator import generate_code
from file_writer import save_files

idea = input("Enter your game idea: ")

questions = clarify(idea)
print("\nAgent Questions:\n", questions)

answers = input("\nProvide answers to the questions (or press Enter to accept defaults): ")

final_requirements = idea + "\n\nUser Answers:\n" + answers

plan = plan_game(final_requirements)
print("\nPlan:\n", plan)

code = generate_code(plan)
print("\nMODEL OUTPUT:\n", code)
save_files(code)

print("\nGame files generated in output/")