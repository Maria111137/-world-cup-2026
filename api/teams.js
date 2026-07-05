// Vercel serverless function: GET /api/teams
// Proxies football-data.org so the API key stays server-side and CORS
// restrictions on their end don't affect the browser.
export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/WC/teams",
      { headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY } }
    );

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
