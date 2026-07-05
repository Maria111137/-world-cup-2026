class TeamsPage {
  constructor() {
    this.api = new WorldCupApi();
    this.teams = [];
    this.filtered = [];
    this.query = "";
    this.page = 1;
    this.pageSize = 9;

    this.gridEl = document.getElementById("teams-grid");
    this.stateEl = document.getElementById("teams-state");
    this.searchInput = document.getElementById("teams-search");
    this.paginationEl = document.getElementById("teams-pagination");

    this._bindEvents();
    this.load();
  }

  _bindEvents() {
    this.searchInput.addEventListener("input", (e) => {
      this.query = e.target.value.trim().toLowerCase();
      this.page = 1;
      this._applyFilter();
      this.render();
    });
  }

  async load() {
    this._renderState("Loading teams...");
    try {
      const data = await this.api.getTeams();
      this.teams = data.teams || [];
      this._applyFilter();
      this.render();
    } catch (err) {
      this._renderState(
        `Couldn't load team data: ${err.message}. Check that FOOTBALL_DATA_API_KEY is set on your deployment.`,
        true
      );
    }
  }

  _applyFilter() {
    if (!this.query) {
      this.filtered = this.teams;
      return;
    }
    this.filtered = this.teams.filter(
      (t) =>
        t.name?.toLowerCase().includes(this.query) ||
        t.area?.name?.toLowerCase().includes(this.query)
    );
  }

  render() {
    if (this.filtered.length === 0) {
      this._renderState(`No teams match "${this.query}".`);
      this.paginationEl.innerHTML = "";
      return;
    }

    this.stateEl.innerHTML = "";
    const totalPages = Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
    this.page = Math.min(this.page, totalPages);
    const start = (this.page - 1) * this.pageSize;
    const pageItems = this.filtered.slice(start, start + this.pageSize);

    this.gridEl.innerHTML = pageItems
      .map(
        (team) => `
        <div class="team-card">
          ${team.crest ? `<img src="${team.crest}" alt="${team.name}" />` : ""}
          <div>
            <p class="team-name">${team.name}</p>
            <p class="team-country">${team.area?.name || ""}</p>
          </div>
        </div>`
      )
      .join("");

    this._renderPagination(totalPages);
  }

  _renderPagination(totalPages) {
    if (totalPages <= 1) {
      this.paginationEl.innerHTML = "";
      return;
    }
    this.paginationEl.innerHTML = `
      <button id="prev-page" ${this.page === 1 ? "disabled" : ""}>Previous</button>
      <span>Page ${this.page} of ${totalPages}</span>
      <button id="next-page" ${this.page === totalPages ? "disabled" : ""}>Next</button>
    `;
    document.getElementById("prev-page")?.addEventListener("click", () => {
      this.page -= 1;
      this.render();
    });
    document.getElementById("next-page")?.addEventListener("click", () => {
      this.page += 1;
      this.render();
    });
  }

  _renderState(message, isError = false) {
    this.gridEl.innerHTML = "";
    this.stateEl.innerHTML = `<div class="state-message${isError ? " error" : ""}">${message}</div>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TeamsPage();
});
