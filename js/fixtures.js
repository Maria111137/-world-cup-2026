class FixturesPage {
  constructor() {
    this.api = new WorldCupApi();
    this.status = "";

    this.listEl = document.getElementById("matches-list");
    this.stateEl = document.getElementById("matches-state");
    this.tabButtons = document.querySelectorAll(".filter-tab");

    this._bindEvents();
    this.load();
  }

  _bindEvents() {
    this.tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.tabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.status = btn.dataset.status || "";
        this.load();
      });
    });
  }

  async load() {
    this._renderState("Loading fixtures...");
    try {
      const data = await this.api.getMatches(this.status);
      this.render(data.matches || []);
    } catch (err) {
      this._renderState(`Couldn't load fixtures: ${err.message}`, true);
    }
  }

  render(matches) {
    if (matches.length === 0) {
      this._renderState("No matches found for this filter.");
      return;
    }
    this.stateEl.innerHTML = "";
    this.listEl.innerHTML = matches
      .map((m) => {
        const home = m.homeTeam?.name || "TBD";
        const away = m.awayTeam?.name || "TBD";
        const homeScore = m.score?.fullTime?.home ?? "-";
        const awayScore = m.score?.fullTime?.away ?? "-";
        const date = m.utcDate ? new Date(m.utcDate).toLocaleDateString() : "";
        return `
          <div class="match-row">
            <div class="match-teams">
              <span class="home">${home}</span>
              <span class="match-score">${homeScore} : ${awayScore}</span>
              <span class="away">${away}</span>
            </div>
            <span class="match-date">${date}</span>
          </div>`;
      })
      .join("");
  }

  _renderState(message, isError = false) {
    this.listEl.innerHTML = "";
    this.stateEl.innerHTML = `<div class="state-message${isError ? " error" : ""}">${message}</div>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new FixturesPage();
});
