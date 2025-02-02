export const generateAIResponse = async (prompt: string, onChunk: (chunk: string) => void) => {
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
            content: `You are AI Country Asisstant made by Ifal Fahri, specializing in travel and culture. Keep your responses brief, clear, and directly answer the question asked. 
                     Avoid unnecessary explanations or additional information unless specifically requested.
                     Focus only on providing factual, concise information about:
                     - Countries information and their culture
                     - Travel information
                     - Local customs
                     - Basic translations`,
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.6,
        stream: true,
      }),
    });

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No reader available");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = new TextDecoder().decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          // Handle [DONE] message
          if (data.trim() === '[DONE]') continue;
          
          try {
            const json = JSON.parse(data);
            if (json.choices[0]?.delta?.content) {
              onChunk(json.choices[0].delta.content);
            }
          } catch (e) {
            console.warn('Failed to parse chunk:', e, data);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error calling NIM API:", error);
    throw error;
  }
};