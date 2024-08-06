// src/app/resources/page.tsx
import FilterableList from '@/components/FilterableList';
import { getResources } from '@/lib/notion';

export const revalidate = 3600; // Revalidate every hour

export default async function ResourcesPage() {
  const resources = await getResources();

  const introText = "I used to have a list of things, mainly tools I reccomended to early stage companies or patch teams, usually to speed up things or as effective low cost alternatives to somethig they already used. I lost that file and lots of people asked me for it so I'm going to remake it";

  return (
    <FilterableList items={resources} introText={introText} />
  );
}