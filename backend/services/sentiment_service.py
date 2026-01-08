def analyze_sentiment(text: str) -> float:
    text = text.lower()

    positive = ["thank", "good", "helpful", "great"]
    negative = ["bad", "angry", "frustrated", "hate"]

    score = 0.0
    for p in positive:
        if p in text:
            score += 0.2

    for n in negative:
        if n in text:
            score -= 0.2

    return max(-1.0, min(1.0, score))
