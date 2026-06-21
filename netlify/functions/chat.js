// H.U.N.T.R.E.S.S. Netlify Serverless Proxy (Gemini AI Core v1.5)

exports.handler = async (event, context) => {
    // SECURITY: Reject non-POST requests
    if (event.httpMethod !== "POST") {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ reply: "ACCESS DENIED: Invalid request method." }) 
        };
    }

    try {
        // Parse the incoming tactical query from dashboard.html
        const { message } = JSON.parse(event.body);
        
        // Pull the secure API key from Netlify Environment Variables
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return { 
                statusCode: 500, 
                body: JSON.stringify({ reply: "[SYSTEM FATAL]: GEMINI_API_KEY environment variable missing." }) 
            };
        }

        // System Prompt to keep the AI in character
        const systemPrompt = "You are the AI Core of H.U.N.T.R.E.S.S., a highly classified cyber-intelligence platform. Keep your answers brief, tactical, and slightly cryptic. Do not break character. Respond directly to: ";
        
        // Execute the Uplink to Gemini 1.5 Flash Architecture
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemPrompt + message }] }]
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || "Unknown Gemini API Error");
        }

        // Extract the AI's response text
        const aiReply = data.candidates[0].content.parts[0].text;

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply: aiReply })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ reply: "[NEURAL CORE OFFLINE]: " + error.message })
        };
    }
};