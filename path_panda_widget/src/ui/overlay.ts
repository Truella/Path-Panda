export class Overlay {
	private el: HTMLDivElement;

	constructor() {
		this.el = document.createElement("div");

		Object.assign(this.el.style, {
			position: "fixed",
			top: "0",
			left: "0",
			width: "100vw",
			height: "100vh",
			backgroundColor: "rgba(0, 0, 0, 0.55)",
			backdropFilter: "blur(1px)",
			zIndex: "99997",
			pointerEvents: "auto",
			transition: "opacity 0.25s ease",
			opacity: "0",
		});

		document.body.appendChild(this.el);

		requestAnimationFrame(() => {
			this.el.style.opacity = "1";
		});
	}

	remove() {
		this.el.style.opacity = "0";
		setTimeout(() => this.el.remove(), 250);
	}

	get element() {
		return this.el;
	}
}
