export function trackTarget(element: HTMLElement, onMove: () => void) {
	// Resize observer
	const resizeObserver = new ResizeObserver(onMove);
	resizeObserver.observe(element);

	// Mutation observer (optional)
	const mutationObserver = new MutationObserver(onMove);
	mutationObserver.observe(document.body, { childList: true, subtree: true });

	// Scroll + window resize
	window.addEventListener("scroll", onMove);
	window.addEventListener("resize", onMove);

	return () => {
		resizeObserver.disconnect();
		mutationObserver.disconnect();
		window.removeEventListener("scroll", onMove);
		window.removeEventListener("resize", onMove);
	};
}
