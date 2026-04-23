import React from "react";
import Link from "next/link";
import styles from "../../project/project.module.css";
import ProjectDetailsContent from "../../components/ProjectDetailsContent";
import MediaElement from "../../components/MediaElement";
import SectionButton from "../../components/SectionButton";

type Project = {
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

// Same projects data as in /projects/page.tsx
const getAllProjects = (): Project[] => [
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
        alt: "P13 Image 4",
        width: 4,
        pull: 3,
      },
      {
        src: "/projectImages/P13/rbat3.jpg",
        alt: "P13 Image 5",
        width: 4,
        pull: 1,
      },
    ],
  },
  {
    id: "4",
    title: "OMR FESTIVAL",
    roles: "UX Design / Screen Design / Web development",
    year: "2023",
    description:
      "Redesign of the OMR Festival website including user flows, screen designs and development-ready hand-offs. Focus on mobile-first design and clear content hierarchy to showcase the annual marketing festival. Clean visual identity reflects the premium nature of the event.",
    sectionLabel: "Event",
    width: 4,
    pull: 1,
    images: [
      {
        src: "/projectImages/P4/omr0.jpg",
        alt: "P4 Image 1",
        width: 5,
        pull: 1,
      },
      {
        src: "/projectImages/P4/omr1.jpg",
        alt: "P4 Image 2",
        width: 4,
        pull: 3,
      },
      {
        src: "/projectImages/P4/omr2.jpg",
        alt: "P4 Image 3",
        width: 4,
        pull: 1,
      },
    ],
  },
  {
    id: "5",
    title: "FREITAG",
    roles: "Product Design / Interaction Design",
    year: "2023",
    description:
      "Product design and interaction design for FREITAG digital experiences. Focusing on sustainable materials and upcycling narrative through digital interfaces.",
    sectionLabel: "Product",
    width: 4,
    pull: 1,
    images: [
      {
        src: "/projectImages/P5/freitag0.jpg",
        alt: "P5 Image 1",
        width: 5,
        pull: 1,
      },
      {
        src: "/projectImages/P5/freitag1.jpg",
        alt: "P5 Image 2",
        width: 4,
        pull: 2,
      },
    ],
  },
  {
    id: "6",
    title: "VITRA",
    roles: "UX Design / Screen Design",
    year: "2022",
    description:
      "Furniture and design platform redesign for VITRA. Creating intuitive navigation for extensive product catalog with focus on visual design and user experience.",
    sectionLabel: "E-commerce",
    width: 4,
    pull: 1,
    images: [
      {
        src: "/projectImages/P6/vitra0.jpg",
        alt: "P6 Image 1",
        width: 5,
        pull: 1,
      },
      {
        src: "/projectImages/P6/vitra1.jpg",
        alt: "P6 Image 2",
        width: 4,
        pull: 3,
      },
      {
        src: "/projectImages/P6/vitra2.jpg",
        alt: "P6 Image 3",
        width: 4,
        pull: 1,
      },
    ],
  },
  {
    id: "7",
    title: "ARTLOG",
    roles: "UX Design / Brand Design / Web Development",
    year: "2021",
    description:
      "Digital platform for art collectors to log and manage their collections. Designed intuitive interfaces for artwork documentation, gallery management, and collection sharing.",
    sectionLabel: "Art",
    width: 4,
    pull: 1,
    images: [
      {
        src: "/projectImages/P7/artlog0.jpg",
        alt: "P7 Image 1",
        width: 5,
        pull: 1,
      },
      {
        src: "/projectImages/P7/artlog1.jpg",
        alt: "P7 Image 2",
        width: 4,
        pull: 2,
      },
    ],
  },
  {
    id: "8",
    title: "CLIMATE DATA",
    roles: "Data Visualization / Dashboard Design",
    year: "2024",
    description:
      "Interactive climate data visualization dashboard. Designed complex data representations into accessible, compelling visual narratives for climate research.",
    sectionLabel: "Data",
    width: 4,
    pull: 1,
    images: [
      {
        src: "/projectImages/P8/climate0.jpg",
        alt: "P8 Image 1",
        width: 5,
        pull: 1,
      },
      {
        src: "/projectImages/P8/climate1.jpg",
        alt: "P8 Image 2",
        width: 4,
        pull: 3,
      },
    ],
  },
  {
    id: "9",
    title: "WELLNESS APP",
    roles: "Mobile App Design / UX Design",
    year: "2024",
    description:
      "Mobile wellness application combining fitness tracking, nutrition planning, and mindfulness features. Designed intuitive interfaces for health data visualization and personalized recommendations.",
    sectionLabel: "Health",
    width: 4,
    pull: 1,
    images: [
      {
        src: "/projectImages/P9/wellness0.jpg",
        alt: "P9 Image 1",
        width: 4,
        pull: 1,
      },
      {
        src: "/projectImages/P9/wellness1.jpg",
        alt: "P9 Image 2",
        width: 4,
        pull: 3,
      },
      {
        src: "/projectImages/P9/wellness2.jpg",
        alt: "P9 Image 3",
        width: 4,
        pull: 1,
      },
    ],
  },
  {
    id: "10",
    title: "EDUCATION PLATFORM",
    roles: "Platform Design / Learning Experience Design",
    year: "2024",
    description:
      "Online education platform redesign with focus on learning experience and student engagement. Created intuitive course navigation, progress tracking, and community features.",
    sectionLabel: "Education",
    width: 4,
    pull: 1,
    images: [
      {
        src: "/projectImages/P10/edu0.jpg",
        alt: "P10 Image 1",
        width: 5,
        pull: 1,
      },
      {
        src: "/projectImages/P10/edu1.jpg",
        alt: "P10 Image 2",
        width: 4,
        pull: 2,
      },
      {
        src: "/projectImages/P10/edu2.jpg",
        alt: "P10 Image 3",
        width: 4,
        pull: 3,
      },
    ],
  },
];

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const { projectId } = await params;
  const allProjects = getAllProjects();
  const project = allProjects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Project Not Found</h1>
        <p>The project with ID &quot;{projectId}&quot; does not exist.</p>
        <Link href="/projects">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.overlayInner}>
        <div className={styles.leftColumn}>
          <Link href="/projects" className={styles.closeButton}>
            <SectionButton text="Close" selected={false} />
          </Link>
          <ProjectDetailsContent project={project} />
        </div>

        <div className={styles.rightColumn}>
          {project.images.map((item, index) => (
            <div key={`${item.src}-${index}`} className={styles.mediaSlide}>
              <MediaElement src={item.src} alt={item.alt} width={item.width} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
