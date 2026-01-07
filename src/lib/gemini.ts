import Groq from 'groq-sdk';

// Initialize Groq API
const apiKey = process.env.GEMINI_API_KEY;

let groq: Groq | null = null;

if (apiKey) {
  groq = new Groq({ apiKey });
}

// Get the Groq client
export function getGroqClient() {
  if (!groq) {
    throw new Error('GEMINI_API_KEY is not set in environment variables. Please add it to your .env.local file.');
  }
  return groq;
}

// Generate chat response
export async function generateChatResponse(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: { role: string; text: string }[] = []
): Promise<string> {
  try {
    const client = getGroqClient();

    // Convert conversation history to Groq format
    const messages = [
      { role: 'system', content: systemPrompt }
    ];

    // Add history
    conversationHistory.forEach(msg => {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text
      });
    });

    // Add current user message
    messages.push({ role: 'user', content: userMessage });

    const completion = await client.chat.completions.create({
      messages: messages as any,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.9,
      max_tokens: 1024,
      top_p: 0.95,
      stream: false,
    });

    return completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
}
