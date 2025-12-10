import { activateStep } from "./stepRunner";
import { recordEvent } from "../api/recordEvents";
import type { TourStep } from "../types";

export class TourEngine {
	private steps: TourStep[];
	private index = 0;
	private cleanup: (() => void) | null = null;
	private sessionId = crypto.randomUUID();
	private tourId: string;

	constructor(tourId: string, steps: TourStep[]) {
		this.tourId = tourId;
		this.steps = steps;
	}

	start() {
		if (this.steps.length === 0) {
			console.warn("No steps to run");
			return;
		}
		this.runStep();
	}

	private runStep() {
		const step = this.steps[this.index];
		if (!step) {
			// Tour completed
			this.completeTour();
			return;
		}

		// Cleanup previous step
		if (this.cleanup) {
			this.cleanup();
			this.cleanup = null;
		}

		// Log step start
		recordEvent({
			tour_id: this.tourId,
			step_id: step.id,
			event_type: "step_started",
			session_id: this.sessionId,
		});

		// Activate the step
		this.cleanup = activateStep(
			step,
			() => this.next(),
			() => this.back(),
			() => this.skip()
		);
	}

	private next() {
		const currentStep = this.steps[this.index];
		if (!currentStep) return;

		// Log step completion
		recordEvent({
			tour_id: this.tourId,
			step_id: currentStep.id,
			event_type: "step_completed",
			session_id: this.sessionId,
		});

		// Check if this was the last step
		if (this.index >= this.steps.length - 1) {
			this.completeTour();
			return;
		}

		// Move to next step
		this.index++;
		this.runStep();
	}

	private back() {
		const currentStep = this.steps[this.index];
		if (!currentStep) return;

		// Can't go back from first step
		if (this.index === 0) {
			console.warn("Already at first step");
			return;
		}

		// Log navigation
		recordEvent({
			tour_id: this.tourId,
			step_id: currentStep.id,
			event_type: "step_completed", // Mark current as completed before going back
			session_id: this.sessionId,
		});

		// Move to previous step
		this.index--;
		this.runStep();
	}

	private skip() {
		const currentStep = this.steps[this.index];
		if (!currentStep) return;

		// Log skip event
		recordEvent({
			tour_id: this.tourId,
			step_id: currentStep.id,
			event_type: "step_skipped",
			session_id: this.sessionId,
		});

		// Log tour exit
		recordEvent({
			tour_id: this.tourId,
			step_id: currentStep.id,
			event_type: "tour_exited",
			session_id: this.sessionId,
		});

		// Cleanup and end tour
		if (this.cleanup) {
			this.cleanup();
			this.cleanup = null;
		}
	}

	private completeTour() {
		const lastStep = this.steps[this.steps.length - 1];
		if (!lastStep) return;

		// Log tour completion
		recordEvent({
			tour_id: this.tourId,
			step_id: lastStep.id,
			event_type: "tour_completed",
			session_id: this.sessionId,
		});

		// Cleanup
		if (this.cleanup) {
			this.cleanup();
			this.cleanup = null;
		}
	}

	// Public method to destroy the tour manually
	public destroy() {
		if (this.cleanup) {
			this.cleanup();
			this.cleanup = null;
		}
	}
}
