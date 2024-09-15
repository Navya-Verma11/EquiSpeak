import Groq from "groq-sdk";

const groq = new Groq({ apiKey: "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", dangerouslyAllowBrowser: true});


export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion(content) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Remove gender bias in the following content: ${content}`,
      },
    ],
    model: "llama3-8b-8192",
  });
}
