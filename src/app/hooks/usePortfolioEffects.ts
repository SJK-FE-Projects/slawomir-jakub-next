"use client";

import { useState, useEffect, useCallback } from "react";

interface PreviewImage {
	src: string;
	alt: string;
	projectId: string;
}

interface ImagePreviewState {
	isOpen: boolean;
	previewImage: PreviewImage | null;
	openPreview: (src: string, alt: string, projectId: string) => void;
	closePreview: () => void;
}

interface FluidState {
	isInitialized: boolean;
	observeElement: (element: HTMLElement) => (() => void) | null;
}

interface NavigationState {
	navigateToHome: () => void;
}

interface HeaderScrollState {
	isHeaderFixed: boolean;
	isHeaderVisible: boolean;
}

interface PortfolioEffects {
	fluid: FluidState;
	navigation: NavigationState;
	imagePreview: ImagePreviewState;
	headerScroll: HeaderScrollState;
}

export function usePortfolioEffects(): PortfolioEffects {
	const [isFluidInitialized, setIsFluidInitialized] = useState(false);
	const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [isHeaderFixed, setIsHeaderFixed] = useState(false);
	const [isHeaderVisible, setIsHeaderVisible] = useState(true);

	// Initialize fluid effects
	useEffect(() => {
		// Simulate fluid initialization
		const timer = setTimeout(() => {
			setIsFluidInitialized(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	// Handle scroll for header effects
	useEffect(() => {
		let lastScrollY = 0;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			// Header fixed state (after scrolling down a bit)
			setIsHeaderFixed(currentScrollY > 100);

			// Header visibility (hide when scrolling down, show when scrolling up)
			if (currentScrollY > lastScrollY && currentScrollY > 200) {
				setIsHeaderVisible(false);
			} else {
				setIsHeaderVisible(true);
			}

			lastScrollY = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const openPreview = useCallback((src: string, alt: string, projectId: string) => {
		setPreviewImage({ src, alt, projectId });
		setIsPreviewOpen(true);
	}, []);

	const closePreview = useCallback(() => {
		setIsPreviewOpen(false);
		setPreviewImage(null);
	}, []);

	const observeElement = useCallback((element: HTMLElement): (() => void) | null => {
		// Simple intersection observer for fluid animations
		if (!element) return null;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("animate-in");
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: "50px",
			}
		);

		observer.observe(element);

		return () => {
			observer.unobserve(element);
			observer.disconnect();
		};
	}, []);

	const navigateToHome = useCallback(() => {
		// Simple navigation handler
		console.log("Navigating to home");
	}, []);

	// Handle ESC key to close preview
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isPreviewOpen) {
				closePreview();
			}
		};

		if (isPreviewOpen) {
			document.addEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "unset";
		};
	}, [isPreviewOpen, closePreview]);

	return {
		fluid: {
			isInitialized: isFluidInitialized,
			observeElement,
		},
		navigation: {
			navigateToHome,
		},
		imagePreview: {
			isOpen: isPreviewOpen,
			previewImage,
			openPreview,
			closePreview,
		},
		headerScroll: {
			isHeaderFixed,
			isHeaderVisible,
		},
	};
}
