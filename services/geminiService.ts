import { GoogleGenAI } from "@google/genai";
import { GeminiSearchResponse } from "../types";

// Note: API Key is accessed via process.env.API_KEY injected by the environment

export const searchWithGemini = async (query: string): Promise<GeminiSearchResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Use gemini-2.5-flash for search grounding
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: query,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const text = response.text || "No information found.";
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

  return { text, groundingChunks };
};