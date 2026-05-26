export type Project = {
	id: string;
	title: string;
	client: string;
	agency?: string;
	roles: string;
	year: string;
	description: string;
	images: {
		src: string;
		alt: string;
		width?: number;
		pull?: number;
	}[];
	sectionLabel: string;
	width: 3 | 4 | 5 | 6;
	pull: 1 | 2 | 3;
};

// Single source of truth for all projects

export const projects: Project[] = [
	{
		id: "3",
		title: "Engineering Portfolio Website for Red Bull Advanced Technologies",
		client: "Red Bull Advanced Technologies",
		agency: "diesdas.digital",
		roles: "UX Design, Screen Design, Dev-ready Hand-off",
		year: "2025",
		description:
			"UX and screen design for a high-performance brand platform presenting Red Bull Advanced Technologies' engineering work across mobility and innovation domains. The challenge was to unify brand spectacle with practical navigation for different audiences: fans, partners, media, and talent. I developed page structures and responsive layouts that foreground key narratives such as projects, races, careers, and expertise while preserving premium visual impact. The outcome is a clear, scalable web experience that supports both storytelling and conversion-oriented journeys like recruitment and project discovery. Project delivered on behalf of diesdas.digital.",
		sectionLabel: "Product",
		width: 4,
		pull: 1,
		images: [
			{
				src: "/projectImages/P13/rbat0.jpg",
				alt: "P13 Image 1",
				width: 5,
				pull: 1,
			},
			{
				src: "/projectImages/P13/rbat0a.jpg",
				alt: "P13 Image 2",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P13/rbat1.jpg",
				alt: "P13 Image 3",
				width: 4,
				pull: 2,
			},
			{
				src: "/projectImages/P13/rbat2.jpg",
				alt: "P13 Image 3",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P13/rbat3.jpg",
				alt: "P13 Image 3",
				width: 4,
				pull: 1,
			},
			{
				src: "/projectImages/P13/rbat4.jpg",
				alt: "P13 Image 3",
				width: 4,
				pull: 2,
			},
		],
	},
	{
		id: "2",
		title: "Hermaid Health Care Journey Platform",
		client: "Hermaid",
		roles: "UI Design & Development",
		year: "2024",
		description:
			"Hermaid is a digital health platform for women navigating menopause, with a parallel value stream for HR and corporate stakeholders. The core UX challenge was combining education, symptom tracking, tele-consultation, and structured care journeys without overwhelming users. I led information architecture and screen design across desktop and mobile, including appointment booking flows, guided questionnaires, insights and journal areas, and post-session feedback loops. The solution balanced medical credibility with empathetic UX, making complex care pathways understandable, actionable, and suitable for long-term engagement.",
		sectionLabel: "Product",
		width: 4,
		pull: 1,
		images: [
			{
				src: "/projectImages/P12/hm1a.jpg",
				alt: "P12 Image 1",
				width: 5,
				pull: 1,
			},
			{
				src: "/projectImages/P12/hm2a.jpg",
				alt: "P12 Image 2",
				width: 4,
				pull: 2,
			},


			{
				src: "/projectImages/P12/hm5a.jpg",
				alt: "P12 Image 3",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P12/hm6a.jpg",
				alt: "P12 Image 3",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P12/hm7.jpg",
				alt: "P12 Image 3",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P12/hm8.jpg",
				alt: "P12 Image 3",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P12/hm9.jpg",
				alt: "P12 Image 3",
				width: 4,
				pull: 3,
			},
		],
	},

	{
		id: "4",
		title: "Creative Museum Participatory Platform",
		client: "Badisches Landesmuseum",
		agency: "anschlaege.de",
		roles: "UX/UI Design, Design System, Development",
		year: "2024",
		description:
			"Co-designed a participatory digital platform for Badisches Landesmuseum that invites younger and underrepresented audiences to create, share, and vote on cultural content. The central problem was turning passive museum consumption into active contribution while keeping participation simple and motivating. Through workshops, user journeys, wireframes, and UI iterations, we shaped a feed-based, campaign-driven product with gamified mechanics, profile progression, and lightweight creation tools including media and audio contribution flows. The final concept positions visitors as co-creators and strengthens continuous engagement beyond a one-time museum visit. Credits: anschlaege.de x Badisches Landesmuseum.",
		sectionLabel: "Product",
		width: 4,
		pull: 1,
		images: [
			{
				src: "/projectImages/P11/blm9.jpg",
				alt: "P11 Image 3",
				width: 4,
				pull: 2,
			},
			{
				src: "/projectImages/P11/blm0.jpg",
				alt: "P11 Image 1",
				width: 6,
				pull: 1,
			},
			{
				src: "/projectImages/P11/blm1.jpg",
				alt: "P11 Image 1",
				width: 5,
				pull: 1,
			},
			{
				src: "/projectImages/P11/blm2.jpg",
				alt: "P11 Image 2",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P11/blm3a.jpg",
				alt: "P11 Image 3",
				width: 4,
				pull: 2,
			},
			{
				src: "/projectImages/P11/blm4a.jpg",
				alt: "P11 Image 3",
				width: 4,
				pull: 1,
			},
			{
				src: "/projectImages/P11/blm6.jpg",
				alt: "P11 Image 3",
				width: 4,
				pull: 2,
			},
			{
				src: "/projectImages/P11/blm7.jpg",
				alt: "P11 Image 3",
				width: 4,
				pull: 3,
			},

		],
	},

	{
		id: "11",
		title: "Program Hub for August Bebel Institut",
		client: "August Bebel Institut",
		agency: "anschlaege.de",
		roles: "Screen Design / UX Concept / Design System",
		year: "2023",
		description:
			"Designed visual communication and digital screen concepts for August Bebel Institut, focused on political education programs and event discovery. The UX challenge was organizing high-volume, frequently changing event content into an experience that works for mobile-first, real-world usage patterns. I developed a design system and responsive views for overview, filtering, category-based browsing, and program detail reading. The result improves program visibility and helps users move quickly from exploration to participation. Developed on behalf of anschlaege.de.",
		sectionLabel: "Cultural",
		width: 4,
		pull: 1,
		images: [
			{
				src: "/projectImages/P7/abi1.mp4",
				alt: "ABI Video 1",
				width: 6,
				pull: 1,
			},
			{
				src: "/projectImages/P7/abi8d.jpg",
				alt: "ABI Video 2",
				width: 5,
				pull: 2,
			},
			{
				src: "/projectImages/P7/abi8c.jpg",
				alt: "ABI Video 3",
				width: 4,
				pull: 1,
			},
			{
				src: "/projectImages/P7/abi8b.jpg",
				alt: "ABI Video 3",
				width: 4,
				pull: 2,
			},
			{
				src: "/projectImages/P7/abi6b.jpg",
				alt: "ABI Video 3",
				width: 5,
				pull: 1,
			},
		],
	},
	{
		id: "7",
		title: "Program Discovery Experience for Jugend im Museum",
		client: "Jugend im Museum",
		agency: "anschlaege.de",
		roles: "Design System / WebFlow / UX / UI",
		year: "2023",
		description:
			"Designed a web and design-system foundation for Jugend im Museum, serving children, teens, parents, educators, and partner institutions. The main UX problem was navigation complexity across diverse offerings such as courses, school formats, projects, and association content. I developed clearer category architecture, filter interactions, and reusable UI patterns to support both fast discovery and deeper editorial browsing. The outcome is a more inclusive and maintainable platform that helps users find relevant programs faster and supports ongoing content growth. Developed on behalf of anschlaege.de.",
		sectionLabel: "Cultural",
		width: 4,
		pull: 1,
		images: [
			{
				src: "/projectImages/P3/JiM1.mp4",
				alt: "JiM Video 1",
				width: 5,
				pull: 1,
			},
			{
				src: "/projectImages/P3/JiM2.mp4",
				alt: "JiM Video 2",
				width: 5,
				pull: 2,
			},
			{
				src: "/projectImages/P3/JiM3.jpg",
				alt: "JiM Image 3",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P3/JiM4.jpg",
				alt: "JiM Image 4",
				width: 4,
				pull: 1,
			},
			{
				src: "/projectImages/P3/JiM5.jpg",
				alt: "JiM Image 5",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P3/JiM6.jpg",
				alt: "JiM Image 6",
				width: 4,
				pull: 2,
			},
			{
				src: "/projectImages/P3/JiM7.jpg",
				alt: "JiM Image 7",
				width: 5,
				pull: 1,
			},
		],
	},

	{
		id: "8",
		title: "Campaign System for Zukunftszentrum Jena",
		client: "Stadt Jena",
		agency: "anschlaege.de",
		roles: " Screen Design / Lay-Outing / Branding / Workshop Facilitation ",
		year: "2023",
		description:
			"Contributed to campaign design and digital storytelling for Jena's Zukunftszentrum initiative, including workshop-driven concept work, visual identity assets, and social-first screen outputs. The core challenge was communicating historical transformation in a format that feels relevant and participatory for contemporary audiences. I translated workshop insights into narrative modules and platform-specific visuals, including social post formats that highlight personal testimonies and civic voices. The result was a coherent campaign language connecting institutional goals with accessible public communication. Developed on behalf of anschlaege.de.",
		sectionLabel: "Cultural",
		width: 4,
		pull: 1,
		images: [
			{
				src: "/projectImages/P4/jzet0a.mp4",
				alt: "Jzet Video Intro",
				width: 4,
				pull: 1,
			},
			{
				src: "/projectImages/P4/jzet1.mp4",
				alt: "Jzet Video 1",
				width: 5,
				pull: 2,
			},
			{
				src: "/projectImages/P4/jzet2.mp4",
				alt: "Jzet Video 2",
				width: 5,
				pull: 1,
			},
			{
				src: "/projectImages/P4/jzet3.mp4",
				alt: "Jzet Video 3",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P4/jzet4.jpg",
				alt: "Jzet Image 4",
				width: 4,
				pull: 1,
			},
			{
				src: "/projectImages/P4/jzet5.jpg",
				alt: "Jzet Image 5",
				width: 5,
				pull: 2,
			},
			{
				src: "/projectImages/P4/jzet6.jpg",
				alt: "Jzet Image 6",
				width: 5,
				pull: 1,
			},
		],
	},
	{
		id: "10",
		title: "Content Platform for Kleist Museum",
		client: "Kleist Museum Frankfurt (Oder)",
		agency: "anschlaege.de",
		roles: "Screen Design / UX Concept",
		year: "2022",
		description:
			"Developed UX concept and screen design for a text-heavy editorial museum platform where content depth and accessibility are equally critical. The challenge was to preserve literary richness while improving scanability, orientation, and cross-linking between exhibitions, events, and educational material. I created component and layout patterns for long-form pages, modular media inserts, and clearer thematic navigation. The resulting direction supports broader audience access to complex cultural content without diluting institutional tone. Project developed on behalf of anschlaege.de.",
		sectionLabel: "Cultural",
		width: 4,
		pull: 1,
		images: [
			{
				src: "/projectImages/P6/km0.mp4",
				alt: "KM Video Intro",
				width: 5,
				pull: 2,
			},
			{
				src: "/projectImages/P6/km1.png",
				alt: "KM Image 1",
				width: 4,
				pull: 1,
			},
			{
				src: "/projectImages/P6/km2.jpg",
				alt: "KM Image 2",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P6/km5.png",
				alt: "KM Image 5",
				width: 4,
				pull: 2,
			},
			{
				src: "/projectImages/P6/km6.png",
				alt: "KM Image 6",
				width: 4,
				pull: 1,
			},
			{
				src: "/projectImages/P6/km2.mp4",
				alt: "KM Image 6",
				width: 5,
				pull: 2,
			},
		],
	},
	{
		id: "1",
		title: "Operations Dashboard for Porsche",
		client: "Porsche",
		roles: "UX Design / Screen Design / Visual Design",
		year: "2022",
		description:
			"Designed the web flow and interface system for Porsche's internal test-drive rental operations, focusing on staff who manage vehicle pickup, return, and location control under time pressure. The main challenge was reducing errors in barcode and key scanning and making fallback actions explicit when scans fail. I mapped the operational workflow end to end, then designed clear table hierarchies, status indicators, and decision-focused modals, such as retry scan versus manual booking number input. The result was a robust, high-clarity back-office UI that supports faster handling, fewer handover mistakes, and better traceability across locations.",
		sectionLabel: "Product",
		width: 4,
		pull: 1,
		images: [
			{
				src: "/projectImages/P1/PorscheLogin.mp4",
				alt: "Porsche UI Design",
				width: 5,
				pull: 1,
			},
			{
				src: "/projectImages/P1/Porsche1.jpg",
				alt: "Porsche Login Animation",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P1/Porsche2.jpg",
				alt: "Porsche Interface",
				width: 4,
				pull: 1,
			},
			{
				src: "/projectImages/P1/Porsche3.jpg",
				alt: "Porsche Design System",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P1/PorscheIcons.mp4",
				alt: "Porsche Icons Animation",
				width: 4,
				pull: 2,
			},
		],
	},

	{
		id: "6",
		title: "Documenta '15",
		client: "Documenta 15",
		agency: "StanHema",
		roles: "Screen Design",
		year: "2021",
		description:
			"Created screen layouts and motion-focused digital assets for a branding context linked to the fifteenth edition of Documenta, developed on behalf of StanHema. The challenge was translating a strong cultural identity into animated digital expressions that remained readable across channels and devices. My process centered on visual rhythm, typographic timing, and modular layout systems that support campaign consistency. The result was a cohesive set of UI and animation components that extended the brand language into dynamic media touchpoints.",
		width: 4,
		pull: 1,
		sectionLabel: "Cultural",
		images: [
			{
				src: "/projectImages/P2/doc1.mp4",
				alt: "Documenta Video 1",
				width: 5,
				pull: 1,
			},
			{
				src: "/projectImages/P2/doc2.mp4",
				alt: "Documenta Video 2",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P2/doc3.mp4",
				alt: "Documenta Video 3",
				width: 4,
				pull: 2,
			},
			{
				src: "/projectImages/P2/doc4.mp4",
				alt: "Documenta Video 4",
				width: 5,
				pull: 1,
			},
		],
	},

	{
		id: "9",
		title: "suissimage Industry Support Platform",
		client: "suissimage",
		agency: "formdusche",
		roles: "Screen Design / UX Conept",
		year: "2021",
		description:
			"UI and UX concept with screen design for a platform in the Swiss cinematographic sector, developed for a pitch project for formdusche design agency. The core goal was to support industry professionals with clear access to relevant information, practical guidance, and support resources. I designed user flows and content structures that make key services easier to find, reduce navigation friction, and improve clarity in content-dense interfaces. The outcome was a focused platform direction centered on professional needs, everyday usability, and fast access to help.",
		sectionLabel: "Cultural",
		width: 4,
		pull: 1,
		images: [
			{
				src: "/projectImages/P5/si1.mp4",
				alt: "SI Video 1",
				width: 5,
				pull: 1,
			},
			{
				src: "/projectImages/P5/si2.mp4",
				alt: "SI Video 2",
				width: 5,
				pull: 2,
			},
			{
				src: "/projectImages/P5/si3.mp4",
				alt: "SI Video 3",
				width: 5,
				pull: 1,
			},
			{
				src: "/projectImages/P5/si4.mp4",
				alt: "SI Video 4",
				width: 5,
				pull: 2,
			},
		],
	},


	{
		id: "12",
		title: "Rebrand Concept for ROC Berlin",
		client: "ROC Berlin",
		agency: "SMITH Berlin",
		roles: "Branding / Design System / Screen Design",
		year: "2019",
		description:
			"Created rebranding concepts for ROC Berlin spanning corporate identity, visual system, and digital and print applications in a pitch context for SMITH Berlin. The challenge was establishing a contemporary, distinctive identity that scales consistently from editorial surfaces to practical business collateral. I defined typographic and compositional rules, then applied them across stationery, brand artifacts, and screen-directed assets to validate real-world flexibility. The outcome is a coherent brand foundation that supports recognition, consistency, and future product communication.",
		sectionLabel: "Cultural",
		width: 4,
		pull: 1,
		images: [
			{
				src: "/projectImages/P8/roc1.jpg",
				alt: "ROC Image 1",
				width: 5,
				pull: 1,
			},
			{
				src: "/projectImages/P8/roc2.jpg",
				alt: "ROC Image 2",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P8/roc3.jpg",
				alt: "ROC Image 3",
				width: 5,
				pull: 1,
			},
			{
				src: "/projectImages/P8/roc4.jpg",
				alt: "ROC Image 4",
				width: 4,
				pull: 2,
			},
			{
				src: "/projectImages/P8/roc5a.jpg",
				alt: "ROC Image 5A",
				width: 5,
				pull: 1,
			},
			{
				src: "/projectImages/P8/roc5b.jpg",
				alt: "ROC Image 5B",
				width: 4,
				pull: 3,
			},
			{
				src: "/projectImages/P8/roc5c.jpg",
				alt: "ROC Image 5C",
				width: 4,
				pull: 1,
			},
			{
				src: "/projectImages/P8/roc5d.jpg",
				alt: "ROC Image 5D",
				width: 4,
				pull: 2,
			},
			{
				src: "/projectImages/P8/roc5e.jpg",
				alt: "ROC Image 5E",
				width: 4,
				pull: 3,
			},
		],
	},
];
