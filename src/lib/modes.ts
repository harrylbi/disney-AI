// Mode type definitions
export interface Mode {
    id: string;
    name: string;
    description: string;
    icon: string;
    promptModifier: string;
}

// Mode database
export const modes: Record<string, Mode> = {
    motivation: {
        id: 'motivation',
        name: 'Motivation',
        description: 'Get inspired and boost your confidence',
        icon: '💪',
        promptModifier: `Focus on being uplifting, encouraging, and motivational. 
Help the user feel empowered and inspired. Share relevant inspirational insights 
while staying in character. End responses with encouragement that motivates action.`
    },

    consultation: {
        id: 'consultation',
        name: 'Consultation',
        description: 'Receive practical advice and guidance',
        icon: '💭',
        promptModifier: `Focus on providing practical, actionable advice. 
Listen carefully to the user's situation and offer thoughtful guidance. 
Ask clarifying questions when needed. Provide step-by-step suggestions 
when appropriate while maintaining your character's personality and wisdom.`
    },

    roleplay: {
        id: 'roleplay',
        name: 'Roleplay',
        description: 'Have a fun, in-character conversation',
        icon: '🎭',
        promptModifier: `Engage in safe, fun roleplay conversation. 
Be more playful and interactive while staying true to your character. 
You can respond to scenarios, answer "what if" questions, and have 
casual conversations as your character would. Keep interactions positive, 
safe, and family-friendly. Be creative and engaging.`
    }
};

export function getMode(id: string): Mode | undefined {
    return modes[id];
}

export function getAllModes(): Mode[] {
    return Object.values(modes);
}
