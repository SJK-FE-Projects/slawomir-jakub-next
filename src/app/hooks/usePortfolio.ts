'use client';

import { useEffect } from 'react';

/**
 * Reimplementation of portfolio.js using native DOM APIs and React lifecycle.
 * Expects DOM structure with:
 * - .js-projects-list containing .project items (each with id)
 * - .js-project-preview panels with class .js-<projectId>
 * - .img[data-src] items for lightbox
 * - .js-preview-container with .js-img-container and .js-close-preview
 * - .js-back elements to close previews
 */
export function usePortfolio() {
	useEffect(() => {
		if (typeof window === 'undefined' || typeof document === 'undefined') return;

		const patt = /#p=(.+)/i;

		const list = document.querySelector('.js-projects-list') as HTMLElement | null;
		const projects = list ? Array.from(list.querySelectorAll<HTMLElement>('.project')) : [];
		const previews = Array.from(document.querySelectorAll<HTMLElement>('.js-project-preview'));

		const imgs = Array.from(document.querySelectorAll<HTMLElement>('.img[data-src]'));
		const preview = document.querySelector('.js-preview-container') as HTMLElement | null;
		const previewImage = preview?.querySelector('.js-img-container') as HTMLElement | null;
		const previewClose = preview?.querySelector('.js-close-preview') as HTMLElement | null;

		const backButtons = Array.from(document.querySelectorAll<HTMLElement>('.js-back'));

		let activeProject: string | null = null;
		const device = checkDevice();

		// Initial from hash
		if (isSingleProject()) {
			const match = location.hash.match(patt)!;
			const projectId = match[1];
			activeProject = projectId;
			showSingleProjectFromHash(projectId);
		}

		// Handlers
		const onHashChange = () => {
			if (isSingleProject()) {
				const match = location.hash.match(patt)!;
				const projectId = match[1];
				const prevActive = activeProject;
				activeProject = projectId;
				if (prevActive) {
					switchSingleProjects(projectId);
				} else {
					openSingleProject(projectId);
				}
			} else {
				closeSingleProject();
				activeProject = null;
			}
		};

		const onBackClick = (e: Event) => {
			e.preventDefault();
			closeSingleProject();
		};

		const onImgClick = (e: Event) => {
			const target = e.currentTarget as HTMLElement | null;
			if (!target) return;
			if (preview && previewImage) {
				preview.classList.toggle('active');
				previewImage.innerHTML = addImg(target);
			}
		};

		const onPreviewImageClick = () => {
			preview?.classList.remove('active');
		};
		const onPreviewCloseClick = () => {
			preview?.classList.remove('active');
		};

		// Wire up listeners
		window.addEventListener('hashchange', onHashChange);
		backButtons.forEach((btn) => btn.addEventListener('click', onBackClick));
		imgs.forEach((img) => img.addEventListener('click', onImgClick));
		previewImage?.addEventListener('click', onPreviewImageClick);
		previewClose?.addEventListener('click', onPreviewCloseClick);

		// Helpers (match reference behavior)
		function checkDevice() {
			const width = document.documentElement.clientWidth || window.innerWidth;
			return width < 768 ? 'mobile' : 'desktop';
		}

		function openSingleProject(projectId: string) {
			hiddenProjectList();
			setTimeout(() => {
				showSingleProject(projectId);
			}, 700);
		}

		function closeSingleProject() {
			previews.forEach((p) => p.classList.remove('active'));
			setTimeout(() => {
				previews.forEach((p) => p.classList.add('hidden'));
				showProjectsList();
			}, 300);
		}

		function switchSingleProjects(projectId: string) {
			previews.forEach((p) => p.classList.remove('active'));
			previews.forEach((p) => p.classList.add('hidden'));
			showSingleProject(projectId);
		}

		function showProjectsList() {
			list?.classList.remove('hidden');
			setTimeout(() => {
				projects.forEach((p) => p.classList.remove('move'));
				const hash = location.hash ? location.hash.split('#')[1] : null;
				if (hash) {
					const target = projects.find((p) => p.id === hash);
					if (target) {
						const top = target.getBoundingClientRect().top + window.scrollY;
						// Match jQuery scrollTop behavior without animation
						window.scrollTo({ top: top - window.innerHeight * 0.2 });
					}
				}
			}, 200);
		}

		function hiddenProjectList() {
			projects.forEach((p) => p.classList.add('move'));
			setTimeout(() => {
				list?.classList.add('hidden');
			}, 700);
		}

		function showSingleProjectFromHash(projectId: string) {
			list?.classList.add('hidden');
			projects.forEach((p) => p.classList.add('move'));
			showSingleProject(projectId);
		}

		function showSingleProject(projectId: string) {
			const active = previews.find((p) => p.classList.contains(`js-${projectId}`));
			if (!active) return;

			const toLoad = Array.from(active.querySelectorAll<HTMLElement>('[data-src]'));
			toLoad.forEach((el) => {
				const tpl = el.getAttribute('data-src');
				if (!tpl) return;
				const imgUrl = tpl.replace('DEVICE', device);
				el.style.backgroundImage = `url(${imgUrl})`;
			});

			active.classList.remove('hidden');
			window.scrollTo({ top: 0 });
			active.classList.add('active');
		}

		function isSingleProject() {
			return !!(location.hash && patt.test(location.hash));
		}

		function addImg(imgEl: HTMLElement) {
			const src = imgEl.getAttribute('data-src') || '';
			const newSrc = src.replace('/DEVICE/', '/large/');
			const alt = imgEl.getAttribute('alt') || '';
			return `<img src="${newSrc}" class="preview" alt="${alt}" />`;
		}

		// Cleanup for StrictMode/dev
		return () => {
			window.removeEventListener('hashchange', onHashChange);
			backButtons.forEach((btn) => btn.removeEventListener('click', onBackClick));
			imgs.forEach((img) => img.removeEventListener('click', onImgClick));
			previewImage?.removeEventListener('click', onPreviewImageClick);
			previewClose?.removeEventListener('click', onPreviewCloseClick);
		};
	}, []);
}
