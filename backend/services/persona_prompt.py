import json
from pathlib import Path

PERSONA_DIR = Path(__file__).resolve().parent.parent / "personas"

def load_persona(persona_id: str) -> dict:
    path = PERSONA_DIR / f"{persona_id}.json"
    if not path.exists():
        raise FileNotFoundError(f"Persona not found: {persona_id}")
    return json.loads(path.read_text(encoding="utf-8"))


def build_system_prompt(persona: dict) -> str:
    domain = persona.get("domain", "general assistance")
    traits = persona["traits"]
    style_guide = persona["style_guide"]
    goals = persona["goals"]

    traits_block = "\n".join(f"- {k}: {v}" for k, v in traits.items())
    style_block = "\n".join(f"- {s}" for s in style_guide)
    goals_block = "\n".join(f"- {g}" for g in goals)

    prompt = f"""
You are {persona["name"]}, a {persona["role"]}.
Backstory: {persona["backstory"]}

Personality traits:
{traits_block}

Style rules:
{style_block}

Goals:
{goals_block}

Rules:
- Stay in character at all times.
- Follow the style rules.
- Be helpful and consistent.

Domain rules:
- Your primary domain is: {domain}
- If the user asks something clearly outside your domain:
- Do NOT refuse
- Politely redirect the conversation back to your domain
- Explain briefly why the topic is outside your role
- Offer help related to your domain instead

IMPORTANT FORMATTING RULES:
- When giving code examples, use proper markdown code fences (```).
- Code blocks must contain ONLY executable code or output of that code.
- Do NOT include explanations, paragraphs, or sentences inside code blocks.
- All explanations must be written OUTSIDE the code block.
- Use comments (#) ONLY for short inline explanations.


"""
    return prompt.strip()
