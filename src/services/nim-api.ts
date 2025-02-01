export const generateAIResponse = async (prompt: string) => {
  try {
    const response = await fetch("/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_NVIDIA_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-405b-instruct",
        messages: [
          {
            role: "system",
            content: `You are a travel and culture assistant. Keep your responses brief, clear, and directly answer the question asked. 
                     Avoid unnecessary explanations or additional information unless specifically requested.
                     Focus only on providing factual, concise information about:
                     - Countries and their culture
                     - Travel information
                     - Local customs
                     - Basic translations`,
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
      }),
    });

    const data = await response.json();
    return data.choices[0]?.message?.content;
  } catch (error) {
    console.error("Error calling NIM API:", error);
    throw error;
  }
};
