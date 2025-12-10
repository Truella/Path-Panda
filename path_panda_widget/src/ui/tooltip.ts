export class Tooltip {
	private el: HTMLDivElement;
	private arrow: HTMLDivElement;

	constructor() {
		this.el = document.createElement("div");
		this.el.className = "tour-tooltip";

		this.arrow = document.createElement("div");
		this.arrow.className = "tour-tooltip-arrow";

		this.el.appendChild(this.arrow);
		document.body.appendChild(this.el);
	}

	setContent(title: string, description: string) {
		this.el.innerHTML = `
      <div class="tour-tooltip-inner">
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="tour-tooltip-actions">
          <button data-back>Back</button>
          <button data-next>Next</button>
          <button data-skip>Skip</button>
        </div>
      </div>
    `;

		// re-attach arrow inside after innerHTML reset
		this.el.appendChild(this.arrow);
	}

	on(event: "next" | "back" | "skip", handler: () => void) {
		const btn = this.el.querySelector(`[data-${event}]`);
		if (btn) btn.addEventListener("click", handler);
	}

	remove() {
		this.el.remove();
	}

	get element() {
		return this.el;
	}

	get arrowElement() {
		return this.arrow;
	}
}
