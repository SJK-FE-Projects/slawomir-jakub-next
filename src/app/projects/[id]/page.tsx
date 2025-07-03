import { notFound } from "next/navigation";
import ProjectBlock from "../../components/ProjectBlock";

// This function can be async if you need to fetch data
export default function ProjectPage() {
  // Here you would typically fetch project data based on the ID
  // For now, we'll use dummy data
  const projectData = {
    title: "Project Title",
    year: "2024",
    roles: "Developer, Designer",
    description: "Project description goes here",
    images: [
      {
        src: "/placeholder.jpg",
        alt: "Project image",
      },
    ],
    sectionLabel: "View Project",
  };

  // If project not found, return 404
  if (!projectData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProjectBlock
        title={projectData.title}
        year={projectData.year}
        roles={projectData.roles}
        description={projectData.description}
        images={projectData.images}
        sectionLabel={projectData.sectionLabel}
      />
    </div>
  );
}
