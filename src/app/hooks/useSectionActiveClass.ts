"use client";

import { useEffect } from "react";

type UseSectionActiveClassOptions = {
	/** Array of section IDs to observe */
	sectionIds: string[];
	/** Offset from top in pixels - when section crosses this line, it becomes active */
	offsetTop?: number;
	/** CSS selector for section buttons to apply 'active' class */
	buttonSelector?: string;
	/** Whether observer should be active */
	enabled?: boolean;
};

/**
 * Intersection Observer hook that directly manipulates DOM classes
 * WITHOUT causing React re-renders. Perfect for highlighting section buttons
 * based on scroll position without interfering with animations.
 */
export const useSectionActiveClass = ({
	sectionIds,
	offsetTop = 100,
	buttonSelector = ".stickySectionButton",
	enabled = true,
}: UseSectionActiveClassOptions) => {
	useEffect(() => {
		if (typeof window === "undefined" || typeof document === "undefined") return;

		if (!enabled) {
			document.querySelectorAll(`[data-section]`).forEach((btn) => {
				btn.classList.remove("active");
			});
			return;
		}

		let currentActiveIdsKey = "";

		const getActiveSectionIds = () => {
			const labelButtons = Array.from(document.querySelectorAll(buttonSelector));

			const candidates: Array<{
				id: string;
				top: number;
			}> = [];

			labelButtons.forEach((button) => {
				const sectionId = button.getAttribute("data-section");
				if (!sectionId || !sectionIds.includes(sectionId)) return;

				const rect = button.getBoundingClientRect();
				const isVisibleInNavbarBand = rect.top <= offsetTop && rect.bottom > 0;

				if (isVisibleInNavbarBand) {
					candidates.push({
						id: sectionId,
						top: rect.top,
					});
				}
			});

			if (candidates.length === 0) {
				return [];
			}

			return candidates
				.sort((a, b) => a.top - b.top)
				.slice(0, 2)
				.map((candidate) => candidate.id);
		};

		const updateActiveButtons = () => {
			const newActiveIds = getActiveSectionIds();
			const newActiveIdsKey = newActiveIds.join("|");

			if (newActiveIdsKey === currentActiveIdsKey) return;

			document.querySelectorAll(`${buttonSelector}, [data-section]`).forEach((btn) => {
				btn.classList.remove("active");
			});

			newActiveIds.forEach((activeId) => {
				const activeButtons = document.querySelectorAll(
					`[data-section="${activeId}"]`
				);

				activeButtons.forEach((activeButton) => {
					activeButton.classList.add("active");
				});
			});

			currentActiveIdsKey = newActiveIdsKey;
		};

		const observer = new IntersectionObserver(
			() => updateActiveButtons(),
			{
				root: null,
				rootMargin: "0px",
				threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
			}
		);

		// Observe all sections
		sectionIds.forEach((id) => {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		});

		updateActiveButtons();

		const onViewportChange = () => {
			updateActiveButtons();
		};

		window.addEventListener("resize", onViewportChange);
		window.addEventListener("orientationchange", onViewportChange);

		// Cleanup on unmount
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", onViewportChange);
			window.removeEventListener("orientationchange", onViewportChange);
		};
	}, [sectionIds, offsetTop, buttonSelector, enabled]);
};
