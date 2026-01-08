import requests

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL = "phi3"

def call_llm(messages):
    payload = {
        "model": MODEL,
        "messages": messages,
        "stream": False,
        "options": {
            "temperature": 0.2,
            "num_predict": 600
        }
    }

    response = requests.post(
        OLLAMA_URL,
        json=payload,
        timeout=120
    )
    

    response.raise_for_status()
    return response.json()["message"]["content"]
