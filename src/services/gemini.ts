import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY || "";

export async function generateSpeech(text: string): Promise<string | null> {
  if (!API_KEY) {
    console.error("Gemini API key is missing");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say clearly and professionally: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return `data:audio/mp3;base64,${base64Audio}`;
    }
  } catch (error) {
    console.error("Error generating speech:", error);
  }
  return null;
}
