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
	buttonSelector = "[data-section]",
	enabled = true,
}: UseSectionActiveClassOptions) => {
	useEffect(() => {
		if (typeof window === "undefined" || typeof document === "undefined") return;

		if (!enabled) {
			document.querySelectorAll(buttonSelector).forEach((btn) => {
				btn.classList.remove("active");
			});
			return;
		}

		let currentActiveIdsKey = "";

		const getActiveSectionIds = () => {
			const candidates: Array<{
				id: string;
				top: number;
				ratio: number;
			}> = [];

			sectionIds.forEach((id) => {
				const el = document.getElementById(id);
				if (!el) return;

				const rect = el.getBoundingClientRect();
				const height = rect.height || Math.max(el.scrollHeight, 1);
				const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
				const visibleRatio = visibleHeight > 0 ? visibleHeight / height : 0;

				// consider section active when at least 30% visible
				if (visibleRatio >= 0.3) {
					candidates.push({ id, top: rect.top, ratio: visibleRatio });
				}
			});

			// If none reach threshold, fallback to the section closest to top offset
			if (candidates.length === 0) {
				const nearest = sectionIds.reduce<{ id: string; distance: number; top: number } | null>((closest, id) => {
					const el = document.getElementById(id);
					if (!el) return closest;
					const rect = el.getBoundingClientRect();
					const distance = Math.abs(rect.top - offsetTop);
					if (closest === null || distance < closest.distance) {
						return { id, distance, top: rect.top };
					}
					return closest;
				}, null);

				return nearest !== null ? [nearest.id] : [];
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

			// remove active only from elements matching the provided button selector
			document.querySelectorAll(buttonSelector).forEach((btn) => {
				btn.classList.remove("active");
			});

			newActiveIds.forEach((activeId) => {
				const selector = `${buttonSelector}[data-section="${activeId}"]`;
				document.querySelectorAll(selector).forEach((activeButton) => {
					activeButton.classList.add("active");
				});
			});

			// Scroll the first active button inside the nav to the left (align start)
			if (newActiveIds.length > 0) {
				const nav = document.querySelector('[data-sections-nav]');
				const firstActiveId = newActiveIds[0];
				const activeInNav = nav?.querySelector(`[data-section="${firstActiveId}"]`);
				if (activeInNav && typeof (activeInNav as HTMLElement).scrollIntoView === 'function') {
					try {
						(activeInNav as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
					} catch (e) {
						// fallback: instant
						(activeInNav as HTMLElement).scrollIntoView({ block: 'nearest', inline: 'start' });
					}
				}
			}

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
