import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Disney Character Persona Chatbot',
    description: 'Chat with AI personas inspired by your favorite Disney characters. Get motivation, advice, and wisdom from legendary heroes.',
    keywords: ['Disney', 'Chatbot', 'AI', 'Character', 'Motivation', 'Advice'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
