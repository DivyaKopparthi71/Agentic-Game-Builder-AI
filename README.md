                                     Agentic Game-Builder AI

This project implements an agentic AI system capable of designing and generating a small playable browser game (using HTML, CSS, and JavaScript) from an ambiguous natural-language input.
The system does not simply generate code from a single prompt.
Instead, it follows a structured, multi-phase process that includes clarification, planning, and execution.
The objective of this project is to demonstrate:

Proper control flow
Clear decision-making steps
Structured engineering design
Reliable AI orchestration

When a user provides a simple idea such as:

"Create an endless game where a player avoids falling blocks"

The AI agent will:
Ask clarifying questions before implementation
Stop asking questions once the requirements are clear

Produce a structured internal plan
Decide the framework (Vanilla JavaScript)
Define core systems such as input handling, rendering, and game state logic
Generate a playable game using:

index.html
style.css
game.js

Automatically save runnable files that work locally in a browser
This project is not a prompt-engineering exercise.
It is a structured AI system designed with clear phases and responsibilities, packaged inside a Docker container for reproducibility and evaluation.

How the Agent Works
Think of this system as a small team of workers.
Each worker has one clear job.

The process works step by step:
User Idea
  ↓
Clarifier
  ↓
Planner
  ↓
Generator
  ↓
File Writer
  ↓
Playable Game
Each step has a single responsibility.
This makes the system organized, predictable, and reliable.

Folder Structure and Design Explanation
agentic-game-builder/
│
├── app/
   ├── main.py
   ├── clarifier.py
   ├── planner.py
   ├── generator.py
   ├── file_writer.py
   ├── groq_client.py
   ├── prompts.py
│
├── output/
   ├── Index.html
   ├── game.js
   └── style.css
The project is divided into small modules.
Each file has one responsibility.

This modular structure makes the system:

Easy to understand
Easy to maintain
Easy to extend
More professional and scalable

main.py – The Controller
This file controls the entire workflow.
It:

Accepts the user’s game idea
Calls the clarifier
Calls the planner
Calls the generator
Calls the file writer

It connects all components together. Without this file, the system cannot run.  You can think of it as the central coordinator.

clarifier.py – Requirements Clarification Phase
This module ensures the idea is clearly understood before building.
It:

Sends the user’s idea to the language model
Asks only necessary follow-up questions
Avoids excessive questioning

Prevents premature code generation
This step ensures that requirements are sufficiently clear before moving forward.

planner.py – Planning Phase
This module converts the clarified idea into a structured internal plan.
It defines:

Player movement
Game mechanics
Scoring rules
Game over conditions
Framework choice
Required file structure

This phase ensures that the system thinks before building.

generator.py – Execution Phase
This module generates the actual game files.
It:

Uses the structured plan
Produces:
index.html
style.css
game.js

Ensures the game runs locally in a browser
It strictly follows a defined format to ensure safe extraction.

file_writer.py – Output Validation and Saving
This module:

Extracts HTML, CSS, and JavaScript from the model output
Validates that all required files exist
Saves them inside the output/ folder

This acts as a safety layer.  If the format is incorrect, the process stops.
This prevents saving broken or incomplete files.

groq_client.py – LLM Communication Layer
This module handles communication with the Groq API.
It:

Sends prompts to the language model
Receives responses
Returns output to the system

Separating this layer keeps the architecture clean and allows easy model replacement in the future.

prompts.py – System Instructions
This file contains:

Clarifier instructions
Planner instructions
Generator instructions

Keeping prompts separate:

Improves maintainability
Allows behavioral changes without modifying core logic
Keeps the system modular
Automatic File Generation and Saving

After the AI completes planning and generation, the system automatically saves:

index.html
style.css
game.js

The process:
Extracts content between specific tags
Validates all required files
Writes files to the output/ directory
To play the game, open: output/index.html in your browser.

Docker Packaging
The entire system is packaged inside a Docker container.
This ensures:

Consistent execution environment
No dependency conflicts
Easy evaluation
Reproducibility

Docker allows reviewers to build and run the agent without setup issues.

How to Run the Project

Step 1: Clone the Repository
git clone <your-repo-link>
cd agentic-game-builder

Step 2: Create a .env File
Create a file named .env and add:
GROQ_API_KEY=your_api_key_here

Step 3: Build Docker Image
docker build -t game-agent .

Step 4: Run the Agent
docker run -it -v ${PWD}/output:/app/output game-agent

Step 5: Play the Game
Open:  output/index.html in a browser.

Trade-offs
The following design decisions were made:
Used Vanilla JavaScript instead of Phaser
 → Keeps the system lightweight and simple.

Used a single LLM model
 → Reduces orchestration complexity.

Used CLI interface instead of web UI
 → Simplifies Docker execution.

No automatic retry system
 → Focused on clean architecture first.

No advanced static validation
 → Prioritized agent structure and flow.

Improvements With More Time
Possible improvements include:

Automatic retry for invalid LLM output
JavaScript syntax validation
Automated test cases
Memory-based refinement system
Web-based user interface
Multi-model fallback mechanism
Improved logging
Enhanced error handling
Persistent high score storage
Stronger prompt guardrails






