"use client";

import {
	useEffect,
	useState,
	useRef
}

	from "react";

type UseSectionObserverOptions = {
	/** Array of section IDs to observe */
	sectionIds: string[];
	/** Offset from top in pixels - when section crosses this line, it becomes active */
	offsetTop?: number;
}

	;

export const useSectionObserver = ({
	sectionIds,
	offsetTop, // Will use middle of viewport if not specified
}

	: UseSectionObserverOptions) => {
	const [activeSection,
		setActiveSection] = useState<string | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const handleScroll = () => {

			// Debounce to avoid flickering
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				// Distance threshold from top of viewport (half of viewport height)
				const threshold = offsetTop ?? window.innerHeight / 2;

				// Find all sections and their positions relative to viewport top
				const sectionPositions = sectionIds.map((id) => {
					const element = document.getElementById(id);
					if (!element) return null;

					const rect = element.getBoundingClientRect();
					const distanceFromTop = rect.top;

					return {
						id,
						distanceFromTop,
						height: rect.height,
					}

						;
				}

				).filter((section): section is NonNullable<typeof section> => section !== null);

				if (sectionPositions.length === 0) return;

				// Special case: if we're at the bottom of the page, activate last section
				const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;

				if (isAtBottom) {
					setActiveSection(sectionPositions[sectionPositions.length - 1].id);
					return;
				}

				// Find the section whose top edge is closest to viewport top but still within threshold
				// Active section = section where distance from top < threshold
				let activeSectionId = sectionPositions[0].id; // Default to first section

				for (const section of sectionPositions) {
					// If section's top is less than threshold from viewport top, it's active
					if (section.distanceFromTop <= threshold && section.distanceFromTop >= 0) {
						activeSectionId = section.id;
						break; // Use the first one that meets criteria
					}
					// If section is above viewport (negative distance), check if it's still visible
					if (section.distanceFromTop < 0 && Math.abs(section.distanceFromTop) < section.height) {
						activeSectionId = section.id;
					}
				}

				setActiveSection(activeSectionId);
			}

				, 50); // 50ms debounce
		}

			;

		// Initial check
		handleScroll();

		// Listen to scroll events
		window.addEventListener("scroll", handleScroll, {
			passive: true
		}

		);

		return () => {
			window.removeEventListener("scroll", handleScroll);

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		}

			;
	}

		, [sectionIds, offsetTop]);

	return activeSection;
}

	;