// src/app/projects/page.tsx
import FilterableList from '@/components/FilterableList';
import { getProjects } from '@/lib/notion';

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#0000FF]">Projects</h1>
      <FilterableList items={projects} />
    </div>
  );
}