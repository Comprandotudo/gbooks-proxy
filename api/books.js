export default async function handler(req, res) {
  const { isbn } = req.query;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  if (!isbn || !apiKey) {
    return res.status(400).json({ error: "ISBN ou API key ausente" });
  }
  try {
    const resposta = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`
    );
    const data = await resposta.json();
    res.status(200).json(data);
  } catch (erro) {
    res.status(500).json({ error: "Erro ao acessar Google Books" });
  }
}
