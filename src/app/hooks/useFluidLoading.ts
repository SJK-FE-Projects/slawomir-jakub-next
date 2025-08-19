"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

// ==============================
// Module-level singleton manager
// ==============================
const elements = new Set<HTMLElement>();
let listenersAttached = false;
let subscribers = 0;
let scrollPosGlobal = 0;
let directionGlobal = 0; // 0: down, 1: up

const hasTempClass = (el: HTMLElement) =>
	Array.from(el.classList).some((c) => /^temp-\d+$/.test(c));

const assignTempClass = (el: HTMLElement) => {
	if (!hasTempClass(el)) {
		const random = Math.ceil(Math.random() * 10); // 1..10
		el.classList.add(`temp-${random}`);
	}
};

const ensureBaseClasses = (el: HTMLElement) => {
	// Base class used by the reference SCSS: `.fluid`
	if (!el.classList.contains('fluid')) el.classList.add('fluid');
	assignTempClass(el);
};

const checkVisible = () => {
	const windowHeight = window.innerHeight;
	const scrollTop = window.scrollY;

	elements.forEach((item) => {
		const rectTop = item.getBoundingClientRect().top;
		const itemTop = rectTop + scrollTop; // jQuery offset().top equivalent
		const itemHeight = item.offsetHeight;

		// Same conditions as the reference
		if (
			((itemTop + itemHeight * 0.7 - scrollTop) >= 0 &&
				itemTop <= (scrollTop + windowHeight)) ||
			scrollTop === 0
		) {
			item.classList.add('active');
			item.classList.remove('bottom', 'top');
		} else {
			item.classList.remove('active');
		}

		if ((itemTop + itemHeight * 0.7 - scrollTop) < 100 && scrollTop > 0) {
			item.classList.add('top');
			item.classList.remove('bottom', 'active');
		}

		if (itemTop > scrollTop + windowHeight) {
			item.classList.add('bottom');
			item.classList.remove('top', 'active');
		}
	});
};

const dispatchDir = (dir: 'up' | 'down') => {
	document.dispatchEvent(new CustomEvent(`scroll:${dir}`));
};

const onScrollDir = () => {
	const top = document.body.getBoundingClientRect().top;
	if (top > scrollPosGlobal) {
		dispatchDir('up');
	} else {
		dispatchDir('down');
	}
	scrollPosGlobal = top;
};

const onUp = () => {
	directionGlobal = 1;
};

const onDown = () => {
	directionGlobal = 0;
};

const onScrollOrResize = () => checkVisible();

const attachListeners = () => {
	if (listenersAttached) return;
	listenersAttached = true;

	// Initial run
	checkVisible();

	document.addEventListener('scroll', onScrollOrResize, { passive: true });
	document.addEventListener('scroll', onScrollDir, { passive: true });
	window.addEventListener('resize', onScrollOrResize);
	document.addEventListener('scroll:up', onUp as EventListener);
	document.addEventListener('scroll:down', onDown as EventListener);
};

const detachListeners = () => {
	if (!listenersAttached) return;
	listenersAttached = false;

	document.removeEventListener('scroll', onScrollOrResize as EventListener);
	document.removeEventListener('scroll', onScrollDir as EventListener);
	window.removeEventListener('resize', onScrollOrResize);
	document.removeEventListener('scroll:up', onUp as EventListener);
	document.removeEventListener('scroll:down', onDown as EventListener);
};

const addElement = (el: HTMLElement) => {
	ensureBaseClasses(el);
	elements.add(el);
	// Evaluate immediately to set correct initial state
	checkVisible();
	return () => {
		elements.delete(el);
		// Do not forcibly remove classes; leave styling up to caller if needed
	};
};

// ==============================
// Hooks
// ==============================

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

		document.addEventListener('scroll', handleScroll, { passive: true });
		return () => document.removeEventListener('scroll', handleScroll as EventListener);
	}, []);

	return scrollDirection;
};

// Fluid loading animation hook (from fluid.js)
export const useFluidLoading = (settings?: { classes?: string }) => {
	const classes = settings?.classes ?? 'section';

	// Provide per-element observation
	const observeElement = useCallback((el: HTMLElement) => addElement(el), []);

	useEffect(() => {
		if (typeof window === 'undefined' || typeof document === 'undefined') return;

		subscribers++;

		// Track elements added by this subscription so we can remove them on cleanup
		const addedByThisHook: HTMLElement[] = [];

		// Query by class and add them
		const queried = Array.from(document.querySelectorAll<HTMLElement>(`.${classes}`));
		queried.forEach((el) => {
			if (!elements.has(el)) {
				addedByThisHook.push(el);
			}
			addElement(el);
		});

		// Ensure listeners are attached once
		attachListeners();

		return () => {
			// Remove only what this hook added
			addedByThisHook.forEach((el) => elements.delete(el));

			subscribers--;
			if (subscribers <= 0) {
				detachListeners();
				elements.clear();
			}
		};
	}, [classes]);

	return { observeElement };
};

// Hook for individual elements
export const useFluidElement = () => {
	const elementRef = useRef<HTMLElement | null>(null);
	const { observeElement } = useFluidLoading(); // uses default class scanning ('section') and listeners

	useEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		const cleanup = observeElement(element);
		return cleanup;
	}, [observeElement]);

	return elementRef;
};