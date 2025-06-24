"use client";

import { useEffect, useState } from 'react';

// Device detection hooks (from detectDevice.js)
export const useDeviceDetection = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [isTouch, setIsTouch] = useState(false);

	useEffect(() => {
		// Check if mobile (touch capability)
		const checkMobile = () => {
			return 'ontouchstart' in document.documentElement;
		};

		// Check if touch events are supported
		const checkTouch = () => {
			try {
				document.createEvent("TouchEvent");
				return true;
			} catch (e) {
				return false;
			}
		};

		setIsMobile(checkMobile());
		setIsTouch(checkTouch());

		console.log('Is Mobile? ', checkMobile());
		console.log('Is Touch? ', checkTouch());
	}, []);

	return { isMobile, isTouch };
};

// Scroll direction tracking (from detectScroll.js and fluid.js)
export const useScrollDirection = () => {
	const [direction, setDirection] = useState<'up' | 'down'>('down');
	const [scrollPos, setScrollPos] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = document.body.getBoundingClientRect().top;

			if (currentScrollPos > scrollPos) {
				setDirection('up');
				// Trigger custom scroll:up event (like reference)
				document.dispatchEvent(new CustomEvent('scroll:up'));
			} else {
				setDirection('down');
				// Trigger custom scroll:down event (like reference)
				document.dispatchEvent(new CustomEvent('scroll:down'));
			}

			setScrollPos(currentScrollPos);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [scrollPos]);

	return direction;
};

// Header scroll effects (from index.js)
export const useHeaderScroll = (threshold: number = 110) => {
	const [isFixed, setIsFixed] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY >= threshold) {
				setIsFixed(true);
			} else {
				setIsFixed(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [threshold]);

	return isFixed;
};
