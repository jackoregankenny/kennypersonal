// src/app/resources/page.tsx
import FilterableList from '@/components/FilterableList';
import { getResources } from '@/lib/notion';

export const revalidate = 3600; // Revalidate every hour

export default async function ResourcesPage() {
  const resources = await getResources();

  const introText = "Welcome to our curated list of resources for startups. Here you'll find tools, articles, and services that can help you build and grow your business. Use the search and filter options to find exactly what you need.";

  return (
    <FilterableList items={resources} introText={introText} />
  );
}