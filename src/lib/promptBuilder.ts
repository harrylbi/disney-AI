import { Character } from './characters';
import { Mode } from './modes';

export function buildSystemPrompt(character: Character, mode: Mode): string {
    const safetyGuidelines = `

IMPORTANT SAFETY GUIDELINES:
- Keep all responses family-friendly and appropriate for all ages
- Avoid any harmful, offensive, or inappropriate content
- If asked something inappropriate, politely decline and redirect to positive topics
- Stay true to your character's positive qualities
- Focus on being helpful, encouraging, and constructive`;

    const responseFormat = `

RESPONSE GUIDELINES:
- Keep responses concise (2-4 paragraphs max)
- Be conversational and engaging
- Stay in character at all times
- Use natural language, not overly formal
- Show personality through word choice and tone`;

    return `${character.systemPrompt}

MODE: ${mode.name}
${mode.promptModifier}
${safetyGuidelines}
${responseFormat}`;
}

export function buildSystemPromptWithContext(character: Character, mode: Mode, context: string): string {
    const basePrompt = buildSystemPrompt(character, mode);

    if (!context) return basePrompt;

    return `${basePrompt}

${context}`;
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export function buildConversationHistory(messages: ChatMessage[]): { role: string; text: string }[] {
    // Only keep last 6 messages for context (3 exchanges)
    const recentMessages = messages.slice(-6);

    return recentMessages.map(msg => ({
        role: msg.role,
        text: msg.content
    }));
}
