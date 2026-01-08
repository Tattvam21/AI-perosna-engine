export type PersonaId = 'aria' | 'vikram' | 'neha';

export interface ChatRequest {
  persona_id: PersonaId;
  user_message: string;
}

export interface ChatResponse {
  reply: string;
}

const API_URL = 'http://127.0.0.1:8000/chat';

export async function sendMessage(
  personaId: PersonaId,
  message: string
): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      persona_id: personaId,
      user_message: message,
    } as ChatRequest),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data: ChatResponse = await response.json();
  return data.reply;
}
