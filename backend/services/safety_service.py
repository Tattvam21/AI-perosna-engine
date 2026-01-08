UNSAFE_KEYWORDS = [
    "kill", "suicide", "harm", "illegal", "bomb", "drugs"
]

def is_safe(text: str) -> bool:
    text = text.lower()
    return not any(word in text for word in UNSAFE_KEYWORDS)
