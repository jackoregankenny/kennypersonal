import { Metadata } from 'next';
import ArticlesSection from '@/components/ArticleSection';

export const metadata: Metadata = {
  title: "Latest Articles",
  description: "Explore our collection of insightful articles on various topics.",
  openGraph: {
    title: "Latest Articles",
    description: "Explore our collection of insightful articles on various topics.",
    url: "https://jackoregankenny.com/articles",
    type: 'website',
  },
  alternates: {
    canonical: "https://jackoregankenny.com/articles",
  },
};

export default function ArticlesPage() {
  return <ArticlesSection />;
}