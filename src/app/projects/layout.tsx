import SharedLayout from "../components/SharedLayout";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SharedLayout
      headline="Hej! I'm Slawomir Jakub Krzyzak"
      subheadline="Design and Development Projects"
      sections={["All Projects", "Web Development", "Design", "Mobile Apps"]}
    >
      {children}
    </SharedLayout>
  );
}
