'use client';

import { useState } from 'react';
import { Character } from '@/lib/characters';
import LandingPage from '@/components/LandingPage';
import CharacterSelector from '@/components/CharacterSelector';
import ChatInterface from '@/components/ChatInterface';

type AppState = 'landing' | 'select-character' | 'chat';

export default function Home() {
    const [appState, setAppState] = useState<AppState>('landing');
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

    const handleGetStarted = () => {
        setAppState('select-character');
    };

    const handleSelectCharacter = (character: Character) => {
        setSelectedCharacter(character);
        setAppState('chat');
    };

    const handleReset = () => {
        setSelectedCharacter(null);
        setAppState('select-character');
    };

    const handleBackToLanding = () => {
        setAppState('landing');
    };

    return (
        <main>
            {appState === 'landing' && <LandingPage onGetStarted={handleGetStarted} />}

            {appState === 'select-character' && (
                <CharacterSelector
                    onSelectCharacter={handleSelectCharacter}
                    onBack={handleBackToLanding}
                />
            )}

            {appState === 'chat' && selectedCharacter && (
                <ChatInterface
                    character={selectedCharacter}
                    onReset={handleReset}
                />
            )}
        </main>
    );
}
