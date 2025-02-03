export const generateAIResponse = async (
  prompt: string,
  onChunk: (chunk: string) => void,
  timeoutMs: number = 10000
) => {
  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;

  const fetchPromise = async () => {
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

    reader = response.body?.getReader();
    if (!reader) throw new Error("No reader available");

    const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          const data = line.replace(/^data: /, "").trim();
          if (!data) continue;
          if (data === "[DONE]") continue;

          try {
            const json = JSON.parse(data);
            if (json.choices[0]?.delta?.content) {
              onChunk(json.choices[0].delta.content);
            }
          } catch (e) {
            console.warn("Failed to parse chunk:", e, data);
          }
        }
      }
    } catch (error) {
      console.error("Error calling NIM API:", error);
      throw error;
    } finally {
      if (reader) {
        try {
          await reader.cancel();
        } catch (e) {
          console.error("Error closing reader:", e);
        }
      }
    }
  };

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timed out")), timeoutMs);
  });

  try {
    await Promise.race([fetchPromise(), timeoutPromise]);
  } catch (error) {
    if (error instanceof Error && error.message === "Request timed out") {
      throw new Error("I'm sorry, I took too long to respond. Please try asking again.");
    }
    throw error;
  }
};