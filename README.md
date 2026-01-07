# Disney Character Persona Chatbot

A beautiful web application that lets you chat with AI personas inspired by Disney characters. Get motivation, advice, and wisdom from legendary heroes like Elsa, Mufasa, Iron Man, and Yoda.

## Features

- 🎭 **Character Personas**: Chat with 4 unique characters, each with distinct personalities
  - ❄️ **Elsa**: Self-confidence & Motivation
  - 🦁 **Mufasa**: Leadership & Wisdom
  - 🦾 **Iron Man**: Logic & Problem Solving
  - 🧙‍♂️ **Yoda**: Life Wisdom & Mindfulness

- 💫 **Multiple Modes**:
  - 💪 Motivation - Get inspired and boost your confidence
  - 💭 Consultation - Receive practical advice and guidance
  - 🎭 Roleplay - Have fun, in-character conversations

- ✨ **Premium UI**:
  - Glassmorphism effects
  - Smooth animations
  - Character-themed colors
  - Fully responsive design

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **AI**: Google Gemini API
- **Styling**: Vanilla CSS with CSS Modules
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd disney-AI
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_api_key_here
```

### Running the Application

Development mode:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:
```bash
npm run build
npm start
```

## Project Structure

```
disney-AI/
├── src/
│   ├── app/
│   │   ├── api/chat/          # Chat API endpoint
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main page
│   ├── components/
│   │   ├── LandingPage.tsx    # Landing page
│   │   ├── CharacterSelector.tsx
│   │   ├── ModeSelector.tsx
│   │   └── ChatInterface.tsx  # Main chat UI
│   └── lib/
│       ├── characters.ts      # Character definitions
│       ├── modes.ts          # Mode definitions
│       ├── gemini.ts         # Gemini AI integration
│       └── promptBuilder.ts  # Prompt engineering
├── package.json
├── tsconfig.json
└── next.config.js
```

## How It Works

1. **Character Selection**: Users choose from 4 distinct character personas
2. **Mode Selection**: Select conversation style (Motivation, Consultation, or Roleplay)
3. **AI-Powered Chat**: 
   - User messages are sent to the chat API
   - System prompts combine character personality + selected mode
   - Gemini AI generates in-character responses
   - No fine-tuning required - all done through prompt engineering

## Safety & Guidelines

- All responses are family-friendly and appropriate for all ages
- Characters stay true to their positive qualities
- Harmful or inappropriate requests are politely declined
- Conversations are not stored (privacy-first)

## License

This project is for educational and demonstration purposes.

## Acknowledgments

Character inspirations from Disney, Marvel, and Lucasfilm properties. This is an unofficial fan project and is not affiliated with or endorsed by Disney.
