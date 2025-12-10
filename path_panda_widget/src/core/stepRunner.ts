import { Overlay } from "../ui/overlay";
import { Highlight } from "../ui/highlight";
import { Tooltip } from "../ui/tooltip";
import { positionTooltip } from "../ui/positionTooltip";
import { trackTarget } from "../ui/position";
import "../styles/tooltip.css";
import type { TourStep } from "../types";

export function activateStep(
	step: TourStep,
	onNext: () => void,
	onBack: () => void,
	onSkip: () => void
) {
	const target = document.querySelector(step.selector) as HTMLElement;
	if (!target) throw new Error("Step target not found");

	const overlay = new Overlay();
	const highlight = new Highlight(target);
	const tooltip = new Tooltip();

	tooltip.setContent(step.title, step.content);

	tooltip.on("next", onNext);
	tooltip.on("back", onBack);
	tooltip.on("skip", onSkip);

	function update() {
		highlight.updatePosition();
		positionTooltip(tooltip.element, tooltip.arrowElement, target);
	}

	update();

	const stopTracking = trackTarget(target, update);

	requestAnimationFrame(() => {
		tooltip.element.classList.add("show");
	});

	return () => {
		overlay.remove();
		highlight.remove();
		tooltip.remove();
		stopTracking();
	};
}
