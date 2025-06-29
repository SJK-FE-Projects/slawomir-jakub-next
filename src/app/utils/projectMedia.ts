// Helper functions for managing project media files

export type MediaItem = {
	src: string;
	alt: string;
	width?: number;
	pull?: number;
};

export type ProjectData = {
	id: string;
	title: string;
	roles: string;
	year: string;
	description: string;
	sectionLabel: string;
	width: 3 | 4 | 5 | 6;
	pull: 1 | 2 | 3;
	marginTopClass: string;
	folder: string; // P1, P2, etc.
	mediaFiles: string[]; // filenames only
};

// Function to generate media items with full paths
export const generateMediaItems = (
	folder: string,
	files: string[],
	gridSettings: Array<{ width?: number, pull?: number, alt?: string }>
): MediaItem[] => {
	return files.map((file, index) => ({
		src: `/projectImages/${folder}/${file}`,
		alt: gridSettings[index]?.alt || `${folder} media ${index + 1}`,
		width: gridSettings[index]?.width || 4,
		pull: gridSettings[index]?.pull || 1,
	}));
};

// Example usage for easy project setup
export const getProjectMedia = (projectId: string): MediaItem[] => {
	const projectMediaMap: Record<string, { folder: string, files: string[], settings: Array<{ width?: number, pull?: number, alt?: string }> }> = {
		"1": {
			folder: "P1",
			files: ["Porsche1-2.jpg", "PorscheLogin2.mp4", "Porsche2A-2.jpg", "PorscheIcons2.mp4"],
			settings: [
				{ width: 5, pull: 1, alt: "Porsche UI Design" },
				{ width: 4, pull: 3, alt: "Porsche Login Animation" },
				{ width: 4, pull: 1, alt: "Porsche Interface" },
				{ width: 3, pull: 2, alt: "Porsche Icons Animation" },
			]
		},
		"2": {
			folder: "P2",
			files: ["doc1.mp4", "doc2.mp4", "doc3.mp4"],
			settings: [
				{ width: 5, pull: 2, alt: "Documenta Video 1" },
				{ width: 3, pull: 3, alt: "Documenta Video 2" },
				{ width: 4, pull: 1, alt: "Documenta Video 3" },
			]
		},
		// Add more projects as needed...
	};

	const projectData = projectMediaMap[projectId];
	if (!projectData) return [];

	return generateMediaItems(projectData.folder, projectData.files, projectData.settings);
};
