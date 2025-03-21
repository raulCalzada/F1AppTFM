import axios from 'axios';

const OpenAIProxyUrl = '/openai-api/v1/chat/completions';
const apiKey = '';  

export const obtainDescription = async (name: string) => {
    const requestBody = {
        model: "gpt-4-1106-preview",
        messages: [
            {
                role: "user",
                content: `Dame una breve descripción de ${name} en 50 tokens.`
            }
        ],
        max_tokens: 50,
        temperature: 0.7
    };

    try {
        const response = await axios.post(OpenAIProxyUrl, requestBody, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching pilot description:", error);
        throw error;
    }
};
