import axios from 'axios';

// The chatbot service is running on a different port (8000) than the main backend
const CHAT_API_URL = 'https://chat.proberry.net/api/v1';
// const CHAT_API_URL = 'http://localhost:8000/api/v1'
export interface ChatProduct {
    id: string;
    name: string;
    price: number;
    image_url: string;
    url: string;
    slug?: string;
    description?: string;
}

export interface UnifiedChatResponse {
    response: string;
    conversation_id: string;
    tools_used: string[];
    metadata?: {
        agent_steps?: number;
        products?: ChatProduct[]; // Validating if we can get this from backend
        [key: string]: any;
    };
}

export const chatApi = {
    /**
     * Unified chat endpoint - handles both general chat and product search
     */
    search: async (
        message: string,
        userId: string,
        conversationId?: string | null
    ): Promise<UnifiedChatResponse> => {
        // The unified endpoint is at /chat/ (POST)
        const response = await axios.post(`${CHAT_API_URL}/chat/`, {
            user_id: userId,
            message: message,
            conversation_id: conversationId,
        });

        return response.data;
    }
};
