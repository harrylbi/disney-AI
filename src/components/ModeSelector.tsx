import React from 'react';
import { Mode, getAllModes } from '@/lib/modes';
import styles from './ModeSelector.module.css';

interface ModeSelectorProps {
    selectedMode: Mode;
    onSelectMode: (mode: Mode) => void;
}

export default function ModeSelector({ selectedMode, onSelectMode }: ModeSelectorProps) {
    const modes = getAllModes();

    return (
        <div className={styles.modeSelector}>
            <div className={styles.modeLabel}>Mode:</div>
            <div className={styles.modeButtons}>
                {modes.map((mode) => (
                    <button
                        key={mode.id}
                        className={`${styles.modeButton} ${selectedMode.id === mode.id ? styles.active : ''
                            }`}
                        onClick={() => onSelectMode(mode)}
                        title={mode.description}
                    >
                        <span className={styles.modeIcon}>{mode.icon}</span>
                        <span className={styles.modeName}>{mode.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
