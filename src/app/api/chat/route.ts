import { NextRequest, NextResponse } from 'next/server';
import { getCharacter } from '@/lib/characters';
import { getMode } from '@/lib/modes';
import { buildSystemPromptWithContext, buildConversationHistory, ChatMessage } from '@/lib/promptBuilder';
import { generateChatResponse } from '@/lib/gemini';
import { retrieveContext } from '@/lib/rag';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { characterId, modeId, message, history = [] } = body;

        // Validation
        if (!characterId || !modeId || !message) {
            return NextResponse.json(
                { error: 'Missing required fields: characterId, modeId, or message' },
                { status: 400 }
            );
        }

        const character = getCharacter(characterId);
        const mode = getMode(modeId);

        if (!character) {
            return NextResponse.json(
                { error: `Character not found: ${characterId}` },
                { status: 404 }
            );
        }

        if (!mode) {
            return NextResponse.json(
                { error: `Mode not found: ${modeId}` },
                { status: 404 }
            );
        }

        // Retrieve relevant knowledge context
        const context = retrieveContext(characterId, message);

        // Build system prompt with context
        const systemPrompt = buildSystemPromptWithContext(character, mode, context);

        // Build conversation history
        const conversationHistory = buildConversationHistory(history as ChatMessage[]);

        // Generate response
        const response = await generateChatResponse(
            systemPrompt,
            message,
            conversationHistory
        );

        return NextResponse.json({
            success: true,
            response,
            character: character.name,
            mode: mode.name
        });

    } catch (error: any) {
        console.error('Chat API error:', error);

        // Handle specific error types
        if (error.message?.includes('API key')) {
            return NextResponse.json(
                { error: 'API configuration error. Please check your Gemini API key.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: 'An error occurred while processing your message. Please try again.' },
            { status: 500 }
        );
    }
}
