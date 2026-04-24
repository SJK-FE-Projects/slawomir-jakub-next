export type Project = {
	id: string;
	title: string;
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
		id: "1",
		title: "PORSCHE",
		roles: "UX Design / Screen Design / Visual Design",
		year: "2022",
		description:
			"Web flow and screen design for PORSCHE. The backlog UI of the rental system for test drives.",
		sectionLabel: "Business",
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
		id: "2",
		title: "hermaid",
		roles: "UI Design & Development",
		year: "2024",
		description: `hermaid is a digital health app designed to support women navigating menopause by combining AI assisted self learning, symptom tracking, and expert consultations into one holistic platform. The redesign focused on crafting a clear information architecture, intuitive user flows, and visually coherent screen designs across mobile devices—all tailored to foster trust, accessibility, and long‑term engagement. The goal was to present menopause not as a medical issue, but as a journey supported through science based content, personalized recommendations, and seamless access to certified hormone experts. The result: a modern, professional wellness platform that empowers users and vouches for their hormonal health in a scalable and empathetic way.`,
		sectionLabel: "Business",
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
				src: "/projectImages/P12/hm3a.jpg",
				alt: "P12 Image 3",
				width: 4,
				pull: 3,
			},
		],
	},
	{
		id: "3",
		title: "RedBull Advanced Technologies",
		roles: "UX Design, Screen Design, Dev-ready Hand-off",
		year: "2025",
		description:
			"Red Bull Advanced Technologies is the engineering arm of Red Bull Racing, applying Formula 1 expertise to groundbreaking projects in automotive, aerospace, and advanced mobility. The redesigned website showcases this innovation through a streamlined site architecture, intuitive user journeys, and a bold, performance-driven visual design. Clear content structure and responsive layouts support a growing portfolio of high-impact projects. The result is a modern digital platform that reflects the precision, ambition, and technological edge of the RBAT brand. Project on behalf of diesdas.digital agency.",
		sectionLabel: "Business",
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
		id: "4",
		title: "Creative Museum 2.0. by BadischesLandes Museum",
		roles: "UX/UI Design, Development",
		year: "2023",
		description:
			"Designed with anschlaege.de for the Badisches Landesmuseum, Creative Museum is a digital participatory platform aimed at digitally curious and younger audiences as well as broader under‑represented visitor groups. The concept centers on user‑generated content, campaign‑based interactions, voting, feedback loops and gamified mechanics (points, badges, levels), creating a dynamic social feed that empowers users as curators, co‑creators and civic contributors. Concept development flowed through co‑design workshops, wireframing and screen design, resulting in dev‑ready hand‑off for implementation. Credits: anschlaege.de × Badisches Landesmuseum",
		sectionLabel: "Business",
		width: 4,
		pull: 1,
		images: [
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
			{
				src: "/projectImages/P11/blm9.jpg",
				alt: "P11 Image 3",
				width: 4,
				pull: 2,
			},
		],
	},
	{
		id: "6",
		title: "Documenta '15",
		roles: "Screen Design",
		year: "2021",
		description:
			"Layouting and UI animations for the branding project of fifteenth edition of Documenta developed by and on behalf of StanHema agency in Berlin.",
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
		id: "7",
		title: "Jugend im Museum",
		roles: "Design System / WebFlow / UX / UI",
		year: "2023",
		description:
			"Design system and screen design for Jugend im Museum in Berlin. Developed for and on behalf of design office anschlaege.de.",
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
		title:
			"Zukunftszentrum für Europäische Transformation und Deutsche Einheit in Jena",
		roles: " Screen Design / Lay-Outing / Branding / Workshop Facilitation ",
		year: "2023",
		description:
			"Workshops, branding and screen design for the campaign of city council of Jena for the German Center of Future. Developed on behalf of design office anschlaege.de.",
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
		id: "9",
		title: "suissimage",
		roles: "Screen Design / UX Conept",
		year: "2021",
		description:
			"UI & UX Design for the pitch project of swiss cinematographic cooperative. Developed on behalf of formdusche design office.",
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
		id: "10",
		title: "Kleist Museum Frankfurt Oder",
		roles: "Screen Design / UX Concept",
		year: "2022",
		description:
			"Comprehensive branding project for Kleist Museum in Frankfurt. Design of UI components and guidelines for various media. Developing extensive web flow and screen design for the text-oriented literature project. Project developed on behalf of design office anschlaege.de.",
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
		id: "11",
		title: "August Bebel Instutut Berlin",
		roles: "Screen Design / UX Concept / Design System",
		year: "2024",
		description:
			"Screen design visual communication for August Bebel Institut in Berlin. Developed on behalf of design office anschlaege.de.",
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
		id: "12",
		title: "ROC Berlin",
		roles: "Branding / Design System / Screen Design",
		year: "2024",
		description:
			"Pitch project for agency SMITH Berlin. Corporate identity, visual communication and web design for rebranding of ROC Berlin.",
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
