import React from 'react';
import Image from 'next/image';

interface Article {
  title: string;
  link: string;
  description: string;
  keywords?: string[];
  date: string;
  author: string;
  imageUrl?: string;
  imageAlt?: string;
}

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const hasImage = article.imageUrl || article.link;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4">
      {hasImage && (
        <div className="p-4">
          <Image 
            src={article.imageUrl || `https://api.microlink.io?url=${encodeURIComponent(article.link)}&screenshot=true&meta=false&embed=screenshot.url`}
            alt={article.imageAlt || `Screenshot of ${article.title}`}
            width={300}
            height={200}
            layout="responsive"
            className="rounded-lg"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mt-2">
          <a href={article.link} className="text-blue-600 hover:underline">
            {article.title}
          </a>
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">{article.description}</p>
        <div className="flex flex-wrap justify-between items-center">
          <time dateTime={article.date} className="text-sm text-gray-500">
            {new Date(article.date).toLocaleDateString()}
          </time>
        </div>
        <p className="text-sm text-gray-500 mt-2">By {article.author}</p>
        {/* Hidden keywords for SEO */}
        <div className="sr-only">
          {article.keywords && article.keywords.map((keyword, index) => (
            <span key={index}>{keyword}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

async function getArticles(): Promise<Article[]> {
  const isProduction = process.env.NODE_ENV === 'production';
  const url = isProduction 
    ? 'https://jackoregankenny.netlify.app/articles.json'
    : 'http://localhost:3000/articles.json';

  console.log('Fetching articles from:', url);

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    
    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log('Fetched data:', data);
    
    // Ensure we have an array of articles, even if the structure isn't exactly as expected
    const articles = Array.isArray(data) ? data : data.articles || [];
    
    return articles.map((article: any) => ({
      title: article.title || 'Untitled Article',
      link: article.link || '#',
      description: article.description || 'No description available.',
      keywords: article.keywords || [],
      date: article.date || new Date().toISOString(),
      author: article.author || 'Unknown Author',
      imageUrl: article.imageUrl,
      imageAlt: article.imageAlt
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function generateMetadata() {
  const pageTitle = "Latest Articles";
  const pageDescription = "Explore our collection of insightful articles on various topics.";
  const canonicalUrl = "https://jackoregankenny.com/articles";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      type: 'website',
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ArticlesSection() {
  const articles: Article[] = await getArticles();
  const pageTitle = "Latest Articles";

  console.log('Fetched articles:', articles);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white sm:text-center md:text-left">
          {pageTitle}
        </h1>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">No articles found. Check back later!</p>
        )}
      </div>
    </section>
  );
}