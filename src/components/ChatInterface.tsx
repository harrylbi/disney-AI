'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Character } from '@/lib/characters';
import { Mode, modes } from '@/lib/modes';
import ModeSelector from './ModeSelector';
import styles from './ChatInterface.module.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatInterfaceProps {
    character: Character;
    onReset: () => void;
}

export default function ChatInterface({ character, onReset }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMode, setSelectedMode] = useState<Mode>(modes.motivation);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    characterId: character.id,
                    modeId: selectedMode.id,
                    message: input,
                    history: messages,
                }),
            });

            const data = await response.json();

            if (data.success) {
                const assistantMessage: Message = {
                    role: 'assistant',
                    content: data.response,
                };
                setMessages((prev) => [...prev, assistantMessage]);
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (error: any) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                role: 'assistant',
                content: `I apologize, but I'm having trouble responding right now. ${error.message || 'Please try again.'}`,
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={styles.chatContainer}
            style={
                {
                    '--character-primary': character.theme.primary,
                    '--character-secondary': character.theme.secondary,
                    '--character-accent': character.theme.accent,
                } as React.CSSProperties
            }
        >
            <div className={`${styles.chatHeader} glass-card`}>
                <div className={styles.characterInfo}>
                    <div className={styles.characterAvatarLarge}>{character.avatar}</div>
                    <div>
                        <h2 className={styles.characterNameHeader}>{character.name}</h2>
                        <p className={styles.characterSpecialtyHeader}>{character.specialty}</p>
                    </div>
                </div>
                <div className={styles.headerActions}>
                    <ModeSelector selectedMode={selectedMode} onSelectMode={setSelectedMode} />
                    <button onClick={onReset} className="btn btn-secondary" title="Change character">
                        🔄 Change
                    </button>
                </div>
            </div>

            <div className={styles.messagesContainer}>
                {messages.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyStateAvatar}>{character.avatar}</div>
                        <h3>Start a conversation with {character.name}</h3>
                        <p>Ask for {selectedMode.name.toLowerCase()} and let the magic begin!</p>
                    </div>
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage
                                    } slide-in`}
                            >
                                {message.role === 'assistant' && (
                                    <div className={styles.messageAvatar}>{character.avatar}</div>
                                )}
                                <div className={styles.messageContent}>
                                    <div className={styles.messageText}>{message.content}</div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className={`${styles.message} ${styles.assistantMessage} slide-in`}>
                                <div className={styles.messageAvatar}>{character.avatar}</div>
                                <div className={styles.messageContent}>
                                    <div className={styles.loadingDots}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            <form onSubmit={sendMessage} className={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message ${character.name}...`}
                    className={`input ${styles.chatInput}`}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading || !input.trim()}
                >
                    Send ✨
                </button>
            </form>
        </div>
    );
}
