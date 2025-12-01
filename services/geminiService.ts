import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// Ideally, this key should be in a secure backend, but for this client-side demo we use process.env
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWelcomeMessage = async (userName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a short, inspiring, and futuristic welcome message for a user named "${userName}" logging into a "GlassOS" system. Keep it under 30 words. Tone: Sophisticated, welcoming, AI-like.`,
    });
    
    return response.text || `Welcome back to the system, ${userName}.`;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Welcome back, ${userName}. System online.`;
  }
};