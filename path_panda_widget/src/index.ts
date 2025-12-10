// src/index.ts
import { getTour } from "./api/getTours";
import { getTourSteps } from "./api/getTourSteps";
import { recordEvent } from "./api/recordEvents";
import type {  TourState} from "./types";
import "./styles/widget.css";

class TourWidget {
	private state: TourState | null = null;
	private overlayEl: HTMLElement | null = null;
	private tooltipEl: HTMLElement | null = null;
	private clonedEl: HTMLElement | null = null;
	private resizeObserver: ResizeObserver | null = null;
	private originalOverflow: string | null = null;

	private getStorageKey(tourId: string) {
		return `tour_progress_${tourId}`;
	}

	private getDismissKey(tourId: string) {
		return `tour_dismissed_${tourId}`;
	}

	private loadProgress(tourId: string) {
		try {
			const raw = localStorage.getItem(this.getStorageKey(tourId));
			if (!raw) return null;
			return JSON.parse(raw) as {
				currentStepIndex: number;
				sessionId: string;
				stepsLength: number;
			};
		} catch {
			return null;
		}
	}

	private saveProgress() {
		if (!this.state) return;
		try {
			const { tour, currentStepIndex, sessionId, steps } = this.state;
			localStorage.setItem(
				this.getStorageKey(tour.id),
				JSON.stringify({
					currentStepIndex,
					sessionId,
					stepsLength: steps.length,
				})
			);
		} catch {
			// Ignore storage failures
		}
	}

	private clearProgress(tourId: string) {
		try {
			localStorage.removeItem(this.getStorageKey(tourId));
		} catch {
			// Ignore
		}
	}

	private markDismissed(tourId: string) {
		try {
			localStorage.setItem(this.getDismissKey(tourId), "1");
		} catch {
			// ignore
		}
	}

	private isDismissed(tourId: string) {
		try {
			return localStorage.getItem(this.getDismissKey(tourId)) === "1";
		} catch {
			return false;
		}
	}

	async init(embedKey: string) {
		try {
			// Fetch tour data
			const tour = await getTour(embedKey);
			const steps = await getTourSteps(tour.id);

			if (this.isDismissed(tour.id)) {
				return;
			}

			const saved = this.loadProgress(tour.id);
			const initialIndex =
				saved && saved.stepsLength === steps.length
					? Math.min(Math.max(saved.currentStepIndex, 0), steps.length - 1)
					: 0;
			const sessionId =
				saved && saved.sessionId ? saved.sessionId : this.generateSessionId();

			// Initialize state
			this.state = {
				currentStepIndex: initialIndex,
				steps,
				tour,
				sessionId,
				isActive: true,
			};

			// Render the widget
			this.render();

			// Record tour start
			await this.recordStepEvent("step_started");
			this.saveProgress();
		} catch (error) {
			console.error("Tour initialization failed:", error);
		}
	}

	private generateSessionId(): string {
		return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	private render() {
		if (!this.state) return;

		// Create overlay
		this.createOverlay();

		// Highlight target element
		this.highlightElement();

		// Create tooltip
		this.createTooltip();
	}

	private createOverlay() {
		// Remove existing overlay if any
		if (this.overlayEl) {
			this.overlayEl.remove();
		}

		this.overlayEl = document.createElement("div");
		this.overlayEl.id = "tour-overlay";
		this.overlayEl.className = "tour-overlay";
		document.body.appendChild(this.overlayEl);

		this.lockScroll();

		// Fade in animation
		requestAnimationFrame(() => {
			this.overlayEl?.classList.add("active");
		});
	}

	private highlightElement() {
		if (!this.state) return;

		const currentStep = this.state.steps[this.state.currentStepIndex];
		const targetEl = document.querySelector(
			currentStep.selector
		) as HTMLElement;

		if (!targetEl) {
			console.warn(`Target element not found: ${currentStep.selector}`);
			return;
		}

		// Ensure the target is visible to the user.
		targetEl.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

		// Remove previous clone
		if (this.clonedEl) {
			this.clonedEl.remove();
		}

		// Clone the target element
		const clone = targetEl.cloneNode(true) as HTMLElement;
		clone.id = "tour-highlight-clone";
		clone.className = "tour-highlight-clone";

		// Get position
		const rect = targetEl.getBoundingClientRect();
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const scrollLeft =
			window.pageXOffset || document.documentElement.scrollLeft;

		// Copy computed styles so the clone visually matches the target
		const computed = window.getComputedStyle(targetEl);
		for (const prop of Array.from(computed)) {
			clone.style.setProperty(
				prop,
				computed.getPropertyValue(prop),
				computed.getPropertyPriority(prop)
			);
		}

		// Position the clone
		clone.style.position = "absolute";
		clone.style.top = `${rect.top + scrollTop}px`;
		clone.style.left = `${rect.left + scrollLeft}px`;
		clone.style.width = `${rect.width}px`;
		clone.style.height = `${rect.height}px`;
		clone.style.zIndex = "10001";
		clone.style.pointerEvents = "none";
		clone.style.transition = "all 0.3s ease";

		document.body.appendChild(clone);
		this.clonedEl = clone;

		// Animate in
		requestAnimationFrame(() => {
			clone.classList.add("active");
		});

		// Update position on resize/scroll
		this.setupPositionTracking(targetEl);
	}

	private setupPositionTracking(targetEl: HTMLElement) {
		// Cleanup previous observer
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}

		// Track position changes
		const updatePosition = () => {
			if (!this.clonedEl) return;

			const rect = targetEl.getBoundingClientRect();
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;
			const scrollLeft =
				window.pageXOffset || document.documentElement.scrollLeft;

			this.clonedEl.style.top = `${rect.top + scrollTop}px`;
			this.clonedEl.style.left = `${rect.left + scrollLeft}px`;
			this.clonedEl.style.width = `${rect.width}px`;
			this.clonedEl.style.height = `${rect.height}px`;

			// Update tooltip position too
			this.updateTooltipPosition();
		};

		window.addEventListener("scroll", updatePosition, { passive: true });
		window.addEventListener("resize", updatePosition);

		this.resizeObserver = new ResizeObserver(updatePosition);
		this.resizeObserver.observe(targetEl);
	}

	private createTooltip() {
		if (!this.state) return;

		// Remove existing tooltip
		if (this.tooltipEl) {
			this.tooltipEl.remove();
		}

		const currentStep = this.state.steps[this.state.currentStepIndex];

		this.tooltipEl = document.createElement("div");
		this.tooltipEl.id = "tour-tooltip";
		this.tooltipEl.className = "tour-tooltip";

		this.tooltipEl.innerHTML = `
      <div class="tour-tooltip-content">
        <div class="tour-tooltip-header">
          <h3 class="tour-tooltip-title">${this.escapeHtml(
						currentStep.title
					)}</h3>
          <button class="tour-close-btn" aria-label="Close tour">×</button>
        </div>
        <p class="tour-tooltip-description">${this.escapeHtml(
					currentStep.content || ""
				)}</p>
        <div class="tour-tooltip-footer">
          <div class="tour-progress">
            <span class="tour-progress-text">
              ${this.state.currentStepIndex + 1} of ${this.state.steps.length}
            </span>
            <div class="tour-progress-bar">
              <div class="tour-progress-fill" style="width: ${
								((this.state.currentStepIndex + 1) / this.state.steps.length) *
								100
							}%"></div>
            </div>
          </div>
          <div class="tour-controls">
            ${
							this.state.currentStepIndex > 0
								? '<button class="tour-btn tour-back-btn">Back</button>'
								: ""
						}
            <button class="tour-btn tour-skip-btn">Skip Tour</button>
            <button class="tour-btn tour-dismiss-btn">Don\'t show again</button>
            ${
							this.state.currentStepIndex < this.state.steps.length - 1
								? '<button class="tour-btn tour-next-btn tour-btn-primary">Next</button>'
								: '<button class="tour-btn tour-finish-btn tour-btn-primary">Finish</button>'
						}
          </div>
        </div>
      </div>
    `;

		document.body.appendChild(this.tooltipEl);

		// Position the tooltip
		this.updateTooltipPosition();

		// Attach event listeners
		this.attachTooltipEvents();

		// Animate in
		requestAnimationFrame(() => {
			this.tooltipEl?.classList.add("active");
		});
	}

	private updateTooltipPosition() {
		if (!this.tooltipEl || !this.clonedEl || !this.state) return;

		const currentStep = this.state.steps[this.state.currentStepIndex];
		const position = currentStep.position || "bottom";

		const cloneRect = this.clonedEl.getBoundingClientRect();
		const tooltipRect = this.tooltipEl.getBoundingClientRect();

		let top = 0;
		let left = 0;

		switch (position) {
			case "top":
				top = cloneRect.top - tooltipRect.height - 20;
				left = cloneRect.left + (cloneRect.width - tooltipRect.width) / 2;
				break;
			case "bottom":
				top = cloneRect.bottom + 20;
				left = cloneRect.left + (cloneRect.width - tooltipRect.width) / 2;
				break;
			case "left":
				top = cloneRect.top + (cloneRect.height - tooltipRect.height) / 2;
				left = cloneRect.left - tooltipRect.width - 20;
				break;
			case "right":
				top = cloneRect.top + (cloneRect.height - tooltipRect.height) / 2;
				left = cloneRect.right + 20;
				break;
			case "center":
				top = window.innerHeight / 2 - tooltipRect.height / 2;
				left = window.innerWidth / 2 - tooltipRect.width / 2;
				break;
		}

		// Keep tooltip in viewport
		//const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		//const scrollLeft =window.pageXOffset || document.documentElement.scrollLeft;

		top = Math.max(
			20,
			Math.min(top, window.innerHeight - tooltipRect.height - 20)
		);
		left = Math.max(
			20,
			Math.min(left, window.innerWidth - tooltipRect.width - 20)
		);

		this.tooltipEl.style.position = "fixed";
		this.tooltipEl.style.top = `${top}px`;
		this.tooltipEl.style.left = `${left}px`;
	}

	private attachTooltipEvents() {
		if (!this.tooltipEl) return;

		const nextBtn = this.tooltipEl.querySelector(".tour-next-btn");
		const backBtn = this.tooltipEl.querySelector(".tour-back-btn");
		const skipBtn = this.tooltipEl.querySelector(".tour-skip-btn");
		const dismissBtn = this.tooltipEl.querySelector(".tour-dismiss-btn");
		const finishBtn = this.tooltipEl.querySelector(".tour-finish-btn");
		const closeBtn = this.tooltipEl.querySelector(".tour-close-btn");

		nextBtn?.addEventListener("click", () => this.nextStep());
		backBtn?.addEventListener("click", () => this.prevStep());
		skipBtn?.addEventListener("click", () => this.skipTour());
		dismissBtn?.addEventListener("click", () => this.dismissTour());
		finishBtn?.addEventListener("click", () => this.finishTour());
		closeBtn?.addEventListener("click", () => this.closeTour());
	}

	private async nextStep() {
		if (!this.state) return;

		await this.recordStepEvent("step_completed");

		if (this.state.currentStepIndex < this.state.steps.length - 1) {
			this.state.currentStepIndex++;
			await this.recordStepEvent("step_started");
			this.render();
			this.saveProgress();
		}
	}

	private async prevStep() {
		if (!this.state || this.state.currentStepIndex === 0) return;

		this.state.currentStepIndex--;
		await this.recordStepEvent("step_started");
		this.render();
		this.saveProgress();
	}

	private async skipTour() {
		await this.recordStepEvent("step_skipped");
		await this.recordTourEvent("tour_exited");
		this.destroy();
	}

	private closeTour() {
		// Just hide UI but keep progress so refresh resumes where left off
		this.destroy(false);
	}

	private dismissTour() {
		if (!this.state) {
			this.destroy();
			return;
		}
		this.markDismissed(this.state.tour.id);
		this.destroy();
	}

	private async finishTour() {
		await this.recordStepEvent("step_completed");
		await this.recordTourEvent("tour_completed");
		this.destroy();
	}

	private async recordStepEvent(
		eventType: "step_started" | "step_completed" | "step_skipped"
	) {
		if (!this.state) return;

		const currentStep = this.state.steps[this.state.currentStepIndex];

		await recordEvent({
			tour_id: this.state.tour.id,
			step_id: currentStep.id,
			event_type: eventType,
			session_id: this.state.sessionId,
		});
	}

	private async recordTourEvent(eventType: "tour_completed" | "tour_exited") {
		if (!this.state) return;

		const currentStep = this.state.steps[this.state.currentStepIndex];

		await recordEvent({
			tour_id: this.state.tour.id,
			step_id: currentStep.id,
			event_type: eventType,
			session_id: this.state.sessionId,
		});
	}

	private destroy(clearProgress = true) {
		// Fade out
		this.overlayEl?.classList.remove("active");
		this.tooltipEl?.classList.remove("active");
		this.clonedEl?.classList.remove("active");

		// Remove after animation
		setTimeout(() => {
			this.overlayEl?.remove();
			this.tooltipEl?.remove();
			this.clonedEl?.remove();

			if (this.resizeObserver) {
				this.resizeObserver.disconnect();
			}

			if (this.state && clearProgress) {
				this.clearProgress(this.state.tour.id);
			}

			this.unlockScroll();

			this.state = null;
		}, 300);
	}

	private lockScroll() {
		if (this.originalOverflow === null) {
			this.originalOverflow = document.body.style.overflow || "";
		}
		document.body.style.overflow = "hidden";
	}

	private unlockScroll() {
		if (this.originalOverflow !== null) {
			document.body.style.overflow = this.originalOverflow;
			this.originalOverflow = null;
		}
	}

	private escapeHtml(text: string): string {
		const div = document.createElement("div");
		div.textContent = text;
		return div.innerHTML;
	}
}

// Auto-initialize when script loads
(function () {
	// In module builds document.currentScript can be null, so fall back to any
	// script tag carrying the data-embed-key attribute.
	const script =
		(document.currentScript as HTMLScriptElement | null) ??
		(document.querySelector(
			'script[data-embed-key]'
		) as HTMLScriptElement | null);

	const embedKey = script?.getAttribute("data-embed-key");

	if (embedKey) {
		const widget = new TourWidget();
		widget.init(embedKey);
	} else {
		console.error("Tour Widget: Missing data-embed-key attribute");
	}
})();
