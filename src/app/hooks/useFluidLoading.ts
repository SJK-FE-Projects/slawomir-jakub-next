"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

// Scroll direction detection (from detectScroll.js)
export const useScrollDirection = () => {
	const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
	const scrollPos = useRef(0);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const handleScroll = () => {
			const currentScrollPos = document.body.getBoundingClientRect().top;

			if (currentScrollPos > scrollPos.current) {
				setScrollDirection('up');
			} else {
				setScrollDirection('down');
			}

			scrollPos.current = currentScrollPos;
		};

		document.addEventListener('scroll', handleScroll);
		return () => document.removeEventListener('scroll', handleScroll);
	}, []);

	return scrollDirection;
};

// Fluid loading animation hook (from fluid.js)
export const useFluidLoading = () => {
	const [isInitialized, setIsInitialized] = useState(false);
	const scrollDirection = useScrollDirection();
	const elementsRef = useRef<Map<HTMLElement, { randomClass: string }>>(new Map());

	const observeElement = useCallback((element: HTMLElement) => {
		if (!element || elementsRef.current.has(element)) return;

		// Add random temp class (1-10)
		const randomClassNumber = Math.ceil(Math.random() * 10);
		const randomClass = `temp-${randomClassNumber}`;

		element.classList.add('fluid', randomClass);
		elementsRef.current.set(element, { randomClass });

		// Set initial state based on scroll direction
		if (scrollDirection === 'up') {
			element.classList.add('top');
			element.classList.remove('bottom', 'active');
		} else {
			element.classList.add('bottom');
			element.classList.remove('top', 'active');
		}

		return () => {
			element.classList.remove('fluid', randomClass, 'active', 'top', 'bottom');
			elementsRef.current.delete(element);
		};
	}, [scrollDirection]);

	const checkVisible = useCallback(() => {
		if (typeof window === 'undefined') return;

		const windowHeight = window.innerHeight;
		const scrollTop = window.pageYOffset;

		elementsRef.current.forEach((data, element) => {
			const rect = element.getBoundingClientRect();
			const itemTop = rect.top + scrollTop;
			const itemHeight = rect.height;

			// Element is in viewport
			if ((itemTop + itemHeight * 0.7 - scrollTop) >= 0 &&
				(itemTop) <= (scrollTop + windowHeight) ||
				scrollTop === 0) {
				element.classList.add('active');
				element.classList.remove('bottom', 'top');
			} else {
				element.classList.remove('active');
			}

			// Element is above viewport (scrolled past)
			if ((itemTop + itemHeight * 0.7 - scrollTop) < 100 && scrollTop > 0) {
				element.classList.add('top');
				element.classList.remove('bottom', 'active');
			}

			// Element is below viewport
			if ((itemTop) > scrollTop + windowHeight) {
				element.classList.add('bottom');
				element.classList.remove('top', 'active');
			}
		});
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const handleScroll = () => {
			checkVisible();
		};

		const handleResize = () => {
			checkVisible();
		};

		// Initial check
		checkVisible();

		document.addEventListener('scroll', handleScroll);
		document.addEventListener('resize', handleResize);

		setIsInitialized(true);

		return () => {
			document.removeEventListener('scroll', handleScroll);
			document.removeEventListener('resize', handleResize);
		};
	}, [checkVisible]);

	return { observeElement, isInitialized };
};

// Hook for individual elements
export const useFluidElement = () => {
	const elementRef = useRef<HTMLElement>(null);
	const { observeElement } = useFluidLoading();

	useEffect(() => {
		const element = elementRef.current;
		if (!element || !observeElement) return;

		const cleanup = observeElement(element);
		return cleanup;
	}, [observeElement]);

	return elementRef;
};
