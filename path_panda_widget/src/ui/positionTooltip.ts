export function positionTooltip(
	tooltip: HTMLElement,
	arrow: HTMLElement,
	target: HTMLElement
) {
	const tRect = target.getBoundingClientRect();
	const ttRect = tooltip.getBoundingClientRect();

	const margin = 12;

	// Try BOTTOM
	if (tRect.bottom + ttRect.height + margin < window.innerHeight) {
		tooltip.style.top = tRect.bottom + margin + "px";
		tooltip.style.left = tRect.left + "px";
		arrow.style.top = "-6px";
		arrow.style.left = "20px";
		return;
	}

	// Try TOP
	if (tRect.top - ttRect.height - margin > 0) {
		tooltip.style.top = tRect.top - ttRect.height - margin + "px";
		tooltip.style.left = tRect.left + "px";
		arrow.style.bottom = "-6px";
		arrow.style.left = "20px";
		return;
	}

	// Try RIGHT
	if (tRect.right + ttRect.width + margin < window.innerWidth) {
		tooltip.style.left = tRect.right + margin + "px";
		tooltip.style.top = tRect.top + "px";
		arrow.style.left = "-6px";
		arrow.style.top = "20px";
		return;
	}

	// Try LEFT
	if (tRect.left - ttRect.width - margin > 0) {
		tooltip.style.left = tRect.left - ttRect.width - margin + "px";
		tooltip.style.top = tRect.top + "px";
		arrow.style.right = "-6px";
		arrow.style.top = "20px";
		return;
	}

	// FAILSAFE: center screen
	tooltip.style.top = window.innerHeight / 2 - ttRect.height / 2 + "px";
	tooltip.style.left = window.innerWidth / 2 - ttRect.width / 2 + "px";
}
