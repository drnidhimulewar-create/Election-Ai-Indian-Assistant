import { GoogleGenAI } from "@google/genai";
import { Interaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function askElectionAssistant(query: string, history: Interaction[] = []) {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.content }] })),
      { role: 'user', parts: [{ text: query }] }
    ],
    config: {
      systemInstruction: `You are a helpful, friendly, and neutral Indian Election Assistant. 
      Explaining the Indian election process clearly (voter registration, voting day, results).
      When asked about candidates, provide structured information including:
      - Education
      - Achievements
      - Social contributions
      Use a warm and respectful tone. Avoid bias and focus on verifiable facts.
      Format your output using Markdown for better readability.`,
    },
  });

  const response = await model;
  return response.text || "I'm sorry, I couldn't process that request.";
}

export async function getCandidateInfo(candidateName: string) {
  const prompt = `Provide detailed information for the Indian candidate: ${candidateName}. 
  Include:
  - Full Name
  - Educational Background
  - Key Achievements
  - Social Work/Contributions to Society
  Return the response in a structured JSON format with these exact keys:
  {
    "name": string,
    "education": string,
    "achievements": string[],
    "socialWork": string,
    "party": string,
    "constituency": string
  }`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ text: prompt }],
    config: {
      responseMimeType: "application/json",
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse candidate info", e);
    return null;
  }
}
