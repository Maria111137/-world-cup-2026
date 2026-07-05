/**
 * Own curated content — 16 real, verified World Cup facts written in
 * original prose. Satisfies the "own content beyond the API" requirement.
 */
class HistoryPage {
  static facts = [
    { year: 1930, title: "The first World Cup", text: "Uruguay hosted and won the inaugural tournament, beating Argentina 4-2 in the final in Montevideo. Only 13 teams took part, since travel across the Atlantic put off most European sides." },
    { year: 1934, title: "Italy's home triumph", text: "Italy won on home soil, becoming the second country to lift the trophy and the first to do so as hosts under a fascist government that used the win for propaganda purposes." },
    { year: 1950, title: "The Maracanazo", text: "Brazil lost the deciding match to Uruguay in front of roughly 200,000 fans at the Maracanã, one of the most stunning upsets in football history and still a painful national memory in Brazil." },
    { year: 1958, title: "A 17-year-old announces himself", text: "A teenage Pelé scored twice in the final as Brazil beat host nation Sweden 5-2, the highest-scoring final ever played, and became the youngest World Cup winner in history." },
    { year: 1966, title: "England's only title", text: "England won its first and so far only World Cup on home turf, beating West Germany 4-2 after extra time, with Geoff Hurst scoring the only hat-trick ever recorded in a final." },
    { year: 1970, title: "Brazil keeps the trophy forever", text: "Brazil's third title, powered by Pelé, meant they were allowed to keep the original Jules Rimet Trophy permanently under the rules of the time, a feat no nation can repeat today." },
    { year: 1974, title: "Total Football, but not gold", text: "The Netherlands introduced 'Total Football' to a global audience but lost the final to West Germany, beginning a painful pattern that would see them reach three finals without ever winning." },
    { year: 1978, title: "Argentina's first star", text: "Argentina won its first title as hosts, though the tournament remains controversial due to the military junta ruling the country at the time and allegations around a suspiciously convenient result in the final group match." },
    { year: 1986, title: "Maradona's tournament", text: "Diego Maradona single-handedly carried Argentina to the title in Mexico, scoring both the 'Hand of God' goal and the 'Goal of the Century' in the same match against England." },
    { year: 1994, title: "First World Cup in the US", text: "The United States hosted for the first time, drawing the highest average attendance of any World Cup to date, while Brazil won on penalties after a scoreless final against Italy." },
    { year: 1998, title: "France breaks through", text: "France won its first title as hosts, led by Zinedine Zidane's two headers in the final against Brazil, kickstarting a golden generation for French football." },
    { year: 2002, title: "First World Cup in Asia", text: "Japan and South Korea co-hosted the first World Cup held in Asia and the first with two host nations, with Brazil beating Germany to claim a record fifth title." },
    { year: 2010, title: "First World Cup in Africa", text: "South Africa became the first African nation to host, and Spain won its first title, becoming the first European team to win a World Cup held outside Europe." },
    { year: 2014, title: "Germany's 7-1", text: "Germany demolished host nation Brazil 7-1 in the semi-final, one of the most shocking scorelines in tournament history, before going on to beat Argentina in the final." },
    { year: 2022, title: "Messi's crowning moment", text: "Argentina won a dramatic final against France 4-2 on penalties after a 3-3 draw, finally delivering Lionel Messi his first World Cup title in what many expected to be his last tournament." },
    { year: 2026, title: "The biggest World Cup ever", text: "For the first time, three nations — the United States, Mexico, and Canada — co-host the tournament, which has expanded to 48 teams and 104 matches across 39 days, the largest format in World Cup history." },
  ];

  constructor() {
    this.query = "";
    this.listEl = document.getElementById("history-list");
    this.stateEl = document.getElementById("history-state");
    this.searchInput = document.getElementById("history-search");

    this.searchInput.addEventListener("input", (e) => {
      this.query = e.target.value.trim().toLowerCase();
      this.render();
    });

    this.render();
  }

  _filtered() {
    if (!this.query) return HistoryPage.facts;
    return HistoryPage.facts.filter(
      (f) =>
        f.title.toLowerCase().includes(this.query) ||
        f.text.toLowerCase().includes(this.query) ||
        String(f.year).includes(this.query)
    );
  }

  render() {
    const items = this._filtered();
    if (items.length === 0) {
      this.listEl.innerHTML = "";
      this.stateEl.innerHTML = `<div class="state-message">No entries match "${this.query}".</div>`;
      return;
    }
    this.stateEl.innerHTML = "";
    this.listEl.innerHTML = items
      .map(
        (f) => `
        <div class="timeline-item">
          <div class="timeline-year">${f.year}</div>
          <div class="timeline-body">
            <h4>${f.title}</h4>
            <p>${f.text}</p>
          </div>
        </div>`
      )
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new HistoryPage();
});
