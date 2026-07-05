/**
 * CUSTOM UI REQUIREMENT: Collapsible sidebar with icons and labels.
 *
 * - Expanded state (default): each nav item shows an icon + text label.
 * - Collapsed state: sidebar shrinks to icon-only width; labels are hidden
 *   via CSS (width/opacity transition) rather than removed from the DOM,
 *   so the collapse/expand animates smoothly.
 * - State is toggled by clicking the chevron button in the sidebar header.
 * - The current page's nav link gets an "active" class based on the
 *   current URL, so navigation state is visible even when collapsed
 *   (the highlighted icon still shows which page you're on).
 */
class Sidebar {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);
    this.toggleButton = this.root.querySelector(".sidebar-toggle");
    this.toggleIcon = this.toggleButton.querySelector("svg");

    this._bindToggle();
    this._highlightActiveLink();
  }

  _bindToggle() {
    this.toggleButton.addEventListener("click", () => this.toggle());
  }

  toggle() {
    this.root.classList.toggle("collapsed");
    const collapsed = this.root.classList.contains("collapsed");
    // Flip the chevron direction to match state
    this.toggleIcon.innerHTML = collapsed
      ? '<polyline points="9 18 15 12 9 6"></polyline>'
      : '<polyline points="15 18 9 12 15 6"></polyline>';
  }

  _highlightActiveLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    this.root.querySelectorAll(".sidebar-link").forEach((link) => {
      const linkPage = link.getAttribute("href");
      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Sidebar(".sidebar");
});
