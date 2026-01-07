import React from 'react';
import { Character, getAllCharacters } from '@/lib/characters';
import styles from './CharacterSelector.module.css';

interface CharacterSelectorProps {
    onSelectCharacter: (character: Character) => void;
    onBack?: () => void;
}

export default function CharacterSelector({ onSelectCharacter, onBack }: CharacterSelectorProps) {
    const characters = getAllCharacters();

    return (
        <div className={styles.selector}>
            <div className={`${styles.content} fade-in`}>
                <h2 className={styles.title}>Choose Your Character</h2>
                <p className={styles.subtitle}>
                    Select a character to chat with and receive personalized guidance
                </p>

                <div className={styles.characterGrid}>
                    {characters.map((character) => (
                        <div
                            key={character.id}
                            className={`${styles.characterCard} glass-card`}
                            onClick={() => onSelectCharacter(character)}
                            style={
                                {
                                    '--character-primary': character.theme.primary,
                                    '--character-accent': character.theme.accent,
                                } as React.CSSProperties
                            }
                        >
                            <div className={styles.characterAvatar}>{character.avatar}</div>
                            <h3 className={styles.characterName}>{character.name}</h3>
                            <p className={styles.characterDescription}>{character.description}</p>
                            <div className={styles.characterSpecialty}>
                                <span className={styles.specialtyBadge}>{character.specialty}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {onBack && (
                    <button onClick={onBack} className="btn btn-secondary">
                        ← Back
                    </button>
                )}
            </div>
        </div>
    );
}
