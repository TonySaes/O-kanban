import { HttpError } from "../errors/http.errors.js";
export async function callAPI(systemMessage, userMessage) {
  const response = await fetch(process.env.MISTRAL_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.MISTRAL_MODEL,
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage }
      ]
    })
  });
  if (!response.ok) {
    throw new HttpError("Appel à l'API LLM échoué", response.status);
  }
  const data = await response.json();
  return data.choices[0].message.content;
}
