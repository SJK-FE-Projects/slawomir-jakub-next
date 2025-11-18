"use client";

import { useEffect } from "react";

type UseSectionActiveClassOptions = {
	/** Array of section IDs to observe */
	sectionIds: string[];
	/** Offset from top in pixels - when section crosses this line, it becomes active */
	offsetTop?: number;
	/** CSS selector for section buttons to apply 'active' class */
	buttonSelector?: string;
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
}: UseSectionActiveClassOptions) => {
	useEffect(() => {
		if (typeof window === "undefined" || typeof document === "undefined") return;

		console.log("🔍 useSectionActiveClass initialized with:", sectionIds);

		let currentActiveId: string | null = null;

		const observer = new IntersectionObserver(
			() => {
				// On any intersection change, check ALL sections
				const viewportHeight = window.innerHeight;
				const fiftyVh = viewportHeight * 0.5;

				// Find sections whose top edge has passed 50vh line
				const activeSections: Array<{ id: string; top: number }> = [];

				sectionIds.forEach((id) => {
					const element = document.getElementById(id);
					if (!element) return;

					const rect = element.getBoundingClientRect();

					// Section is active if its top edge is above 50vh line
					// AND bottom is still below 50vh (section still in play)
					if (rect.top <= fiftyVh && rect.bottom > fiftyVh) {
						activeSections.push({
							id,
							top: rect.top,
						});
					}
				});

				// Sort by top position - closest to top (most scrolled) wins
				activeSections.sort((a, b) => a.top - b.top);

				let newActiveId: string | null = null;

				// Set active to first section that crossed 50vh
				if (activeSections.length > 0) {
					newActiveId = activeSections[0].id;
					console.log(`📍 Active: ${newActiveId} (top: ${Math.round(activeSections[0].top)}px, 50vh: ${Math.round(fiftyVh)}px)`);
				}

				// Update DOM only if active section changed
				if (newActiveId !== currentActiveId) {
					// Remove 'active' class from all section buttons
					document.querySelectorAll(`[data-section]`).forEach((btn) => {
						btn.classList.remove("active");
					});

					// Add 'active' class to the button matching the active section
					if (newActiveId) {
						const activeButton = document.querySelector(
							`[data-section="${newActiveId}"]`
						);

						if (activeButton) {
							activeButton.classList.add("active");
							console.log(`✓ Added active to: ${newActiveId}`);
						}
					}

					currentActiveId = newActiveId;
				}
			},
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
				console.log(`👁️ Observing section: ${id}`);
				observer.observe(element);
			} else {
				console.warn(`❌ Section NOT found: ${id}`);
			}
		});

		// Initial check - find which section is past 50vh
		const checkInitialSection = () => {
			const viewportHeight = window.innerHeight;
			const fiftyVh = viewportHeight * 0.5;

			for (const id of sectionIds) {
				const element = document.getElementById(id);
				if (element) {
					const rect = element.getBoundingClientRect();

					// Only activate if top is above 50vh and bottom is below 50vh
					if (rect.top <= fiftyVh && rect.bottom > fiftyVh) {
						const activeButton = document.querySelector(
							`[data-section="${id}"]`
						);
						if (activeButton) {
							activeButton.classList.add("active");
							currentActiveId = id;
							console.log(`✓ Initial active: ${id} (top: ${Math.round(rect.top)}px, 50vh: ${Math.round(fiftyVh)}px)`);
						}
						break; // Only activate first matching section
					}
				}
			}
		};

		// Run initial check after DOM is ready
		setTimeout(checkInitialSection, 100);

		// Cleanup on unmount
		return () => {
			observer.disconnect();
		};
	}, [sectionIds, offsetTop, buttonSelector]);
};
