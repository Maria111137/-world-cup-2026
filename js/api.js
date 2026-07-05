/**
 * Thin wrapper around our own serverless proxy endpoints (/api/teams,
 * /api/matches), which in turn call football-data.org server-side.
 * We proxy instead of calling football-data.org directly from the browser
 * for two reasons: (1) their API key must stay secret, and (2) their CORS
 * policy blocks direct browser requests from arbitrary origins.
 */
class WorldCupApi {
  async getTeams() {
    const res = await fetch("/api/teams");
    if (!res.ok) {
      throw new Error(`Request failed (${res.status})`);
    }
    return res.json();
  }

  async getMatches(status = "") {
    const qs = status ? `?status=${encodeURIComponent(status)}` : "";
    const res = await fetch(`/api/matches${qs}`);
    if (!res.ok) {
      throw new Error(`Request failed (${res.status})`);
    }
    return res.json();
  }
}
