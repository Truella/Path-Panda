export class Highlight {
	private clone: HTMLElement;
	private target: HTMLElement;

	constructor(target: HTMLElement) {
		this.target = target;

		// Clone DOM node without children
		this.clone = target.cloneNode(false) as HTMLElement;

		Object.assign(this.clone.style, {
			position: "fixed",
			pointerEvents: "none",
			zIndex: "99998",
			borderRadius: "8px",
			boxShadow: "0 0 0 4px white, 0 0 25px rgba(0,0,0,0.4)",
			background: "white",
			overflow: "hidden",
			transition: "all 0.2s ease",
		});

		document.body.appendChild(this.clone);
		this.updatePosition();
	}

	updatePosition() {
		const rect = this.target.getBoundingClientRect();

		Object.assign(this.clone.style, {
			top: rect.top + "px",
			left: rect.left + "px",
			width: rect.width + "px",
			height: rect.height + "px",
		});
	}

	remove() {
		this.clone.remove();
	}
}
