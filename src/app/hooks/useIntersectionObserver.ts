"use client";

import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const [initialMarginTop] = useState(() => Math.floor(Math.random() * (200 - 50 + 1)) + 50);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		// Set initial random margin-top
		element.style.marginTop = `${initialMarginTop}px`;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsIntersecting(entry.isIntersecting);
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px',
				...options,
			}
		);

		observer.observe(element);

		return () => {
			observer.unobserve(element);
		};
	}, [initialMarginTop, options]);

	return [ref, isIntersecting, initialMarginTop] as const;
};

// Hook for individual elements with random margin-top animation
export const useElementAnimation = () => {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const [randomMarginTop] = useState(() => {
		const margins = [50, 100, 150, 200];
		return margins[Math.floor(Math.random() * margins.length)];
	});
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsIntersecting(true);
				}
			},
			{
				threshold: 0.1,
				rootMargin: '0px',
			}
		);

		observer.observe(element);

		return () => {
			observer.unobserve(element);
		};
	}, []);

	return [ref, isIntersecting, randomMarginTop] as const;
};
