import { knowledgeBase } from './knowledge';

export function retrieveContext(characterId: string, query: string): string {
    const facts = knowledgeBase[characterId];

    if (!facts || facts.length === 0) {
        return "";
    }

    // Simple keyword matching retrieval
    // In a real production app, this would use vector embeddings and cosine similarity
    const queryTerms = query.toLowerCase().split(' ').filter(term => term.length > 3); // Filter out small words

    const relevantFacts = facts.filter(fact => {
        const factLower = fact.toLowerCase();
        // If query is very short, return random facts or all facts
        if (queryTerms.length === 0) return true;

        // Check if any significant term from the query appears in the fact
        return queryTerms.some(term => factLower.includes(term));
    });

    // If no specific facts match, return top 3 general facts to maintain context
    // This ensures the bot always has some "grounding" even if the query is vague
    const factsToReturn = relevantFacts.length > 0 ? relevantFacts : facts.slice(0, 5);

    // Limit to top 5 to avoid overwhelming the context window
    const limitedFacts = factsToReturn.slice(0, 5);

    if (limitedFacts.length === 0) return "";

    return `RELEVANT KNOWLEDGE BASE (Use this to ground your response):
${limitedFacts.map(fact => `- ${fact}`).join('\n')}`;
}
