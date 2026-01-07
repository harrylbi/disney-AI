import React from 'react';
import styles from './LandingPage.module.css';

interface LandingPageProps {
    onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
    return (
        <div className={styles.landing}>
            <div className={styles.hero}>
                <div className={`${styles.heroContent} fade-in`}>
                    <h1 className={styles.title}>
                        Disney Character
                        <span className={styles.gradient}> Persona Chatbot</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Chat with AI personas inspired by your favorite Disney characters.
                        Get motivation, advice, and wisdom from legendary heroes.
                    </p>

                    <div className={styles.features}>
                        <div className={`${styles.feature} glass-card`}>
                            <span className={styles.featureIcon}>💪</span>
                            <h3>Motivation</h3>
                            <p>Get inspired and boost your confidence</p>
                        </div>
                        <div className={`${styles.feature} glass-card`}>
                            <span className={styles.featureIcon}>💭</span>
                            <h3>Consultation</h3>
                            <p>Receive practical advice and guidance</p>
                        </div>
                        <div className={`${styles.feature} glass-card`}>
                            <span className={styles.featureIcon}>🎭</span>
                            <h3>Roleplay</h3>
                            <p>Have fun, in-character conversations</p>
                        </div>
                    </div>

                    <button onClick={onGetStarted} className="btn btn-primary">
                        Get Started ✨
                    </button>
                </div>
            </div>

            <div className={styles.floatingElements}>
                <div className={`${styles.floatingElement} ${styles.element1}`}>❄️</div>
                <div className={`${styles.floatingElement} ${styles.element2}`}>🦁</div>
                <div className={`${styles.floatingElement} ${styles.element3}`}>🦾</div>
                <div className={`${styles.floatingElement} ${styles.element4}`}>🧙‍♂️</div>
            </div>
        </div>
    );
}
