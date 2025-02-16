import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * AIHandler
 *
 * Handles interactions with Google's Gemini AI models, providing functionality for generating text,
 * chat responses, and card titles. This is implemented as a singleton so only one instance exists.
 */
class AIHandler {
    // The singleton instance of AIHandler
    static instance;

    // The main AI model (Gemini 1.5 Pro)
    _aiModel;
    // The fallback AI model (Gemini 1.5 Flash)
    _lightAIModel;

    /**
     * Private constructor to initialize AI models using the API key from environment variables.
     * The main model is "gemini-1.5-pro" and the fallback model is "gemini-1.5-flash."
     */
    constructor() {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error(
                "API key is not defined. Please set NEXT_PUBLIC_API_KEY in your environment.",
            );
        }

        // Initialize both models using the provided API key
        this._aiModel = new GoogleGenerativeAI(apiKey).getGenerativeModel({
            model: "gemini-1.5-pro",
        });

        this._lightAIModel = new GoogleGenerativeAI(apiKey).getGenerativeModel({
            model: "gemini-1.5-flash",
        });
    }

    /**
     * Retrieves the singleton instance of the AIHandler.
     *
     * @returns {AIHandler} The singleton instance of AIHandler.
     */
    static GetInstance() {
        if (!AIHandler.instance) {
            AIHandler.instance = new AIHandler();
        }
        return AIHandler.instance;
    }

    /**
     * Generates text based on the provided prompt using the main AI model.
     * If the quota is exhausted or an error occurs, it switches to the lighter model.
     *
     * @param {string} prompt - The text prompt to generate the response.
     * @returns {Promise<string>} The AI-generated text.
     */
    async GenerateText(prompt) {
        try {
            const response = await this._aiModel.generateContent([prompt]);
            return response.response.text();
        } catch (error) {
            if (
                error.message.includes("Resource has been exhausted") ||
                error.message.includes("Too Many Requests")
            ) {
                console.warn(
                    "Quota exceeded for the current model. Switching to lighter model.",
                );
                try {
                    const response = await this._lightAIModel.generateContent([
                        prompt,
                    ]);
                    return response.response.text();
                } catch (err) {
                    console.error(
                        "Failed to generate text with the lighter model.",
                        err,
                    );
                    throw err;
                }
            } else {
                console.warn(
                    "Attempting to generate text with the lighter model.",
                );
                try {
                    const response = await this._lightAIModel.generateContent([
                        prompt,
                    ]);
                    return response.response.text();
                } catch (err) {
                    console.error(
                        "Failed to generate text with the lighter model.",
                        err,
                    );
                    throw err;
                }
            }
        }
    }

    /**
     * Generates a chatbot response to the user's message.
     * Prompts ENVORA's assistant to provide concise, sustainable advice.
     *
     * @param {string} message - The user's input message.
     * @param {string[]} messages - The previous messages in the chat.
     * @param {string[]} sources - The provided sources to prioritize.
     * @returns {Promise<string>} The AI-generated chatbot response.
     */
    async GenerateResponse(message, messages, sources) {
        const prompt = `
You are ENVORA's intelligent assistant. Your primary objective is to help users understand and reduce their carbon footprint by providing concise, actionable advice on sustainable travel and eco-friendly practices.
For this conversation, consider the following sources (if any) provided by the user: ${sources.join(" ||| ")}.
Please respond concisely to the following message: ${message}
The conversation so far includes these messages: ${messages.join(" ||| ")}
    `;
        return await this.GenerateText(prompt);
    }

    /**
     * Generates a 4-5 word title for a chat based on its messages.
     *
     * @param {string[]} messages - The list of messages in the chat.
     * @returns {Promise<string>} The generated chat title.
     */
    async GenerateCardTitle(messages) {
        const prompt = `
Generate a title in 4-5 words max for a chat with these messages: ${messages.join(" ||| ")}.
If there are no messages, return "undefined".
    `;
        return await this.GenerateText(prompt);
    }

    /**
     * Generates a concise summary for a source based on its content.
     *
     * @param {string} source - The content of the source.
     * @returns {Promise<string>} The generated source summary.
     */
    async GenerateSourceSummary(source) {
        const prompt = `
Generate a 7 word max summary for the source provided. Ensure that the summary is precise, concise, and clear. If the content is empty, respond with "Empty source".
This is the content of the source: ${source}.
    `;
        return await this.GenerateText(prompt);
    }

    /**
     * Fetches the transcript of a YouTube video using an API request.
     *
     * @param {string} url - The YouTube video URL.
     * @returns {Promise<string>} The transcript of the video.
     */
    async FetchYoutubeTranscript(url) {
        try {
            const response = await fetch(`/api/transcription`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });
            const data = await response.json();
            return data.transcript.toString();
        } catch (error) {
            alert("Failed to fetch the YouTube transcript. Please try again.");
            throw error;
        }
    }
}

export default AIHandler;
