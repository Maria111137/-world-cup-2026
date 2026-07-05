// Vercel serverless function: GET /api/matches?status=SCHEDULED|LIVE|FINISHED
export default async function handler(req, res) {
  try {
    const { status } = req.query;
    const url = status
      ? `https://api.football-data.org/v4/competitions/WC/matches?status=${encodeURIComponent(status)}`
      : "https://api.football-data.org/v4/competitions/WC/matches";

    const response = await fetch(url, {
      headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY },
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
}
