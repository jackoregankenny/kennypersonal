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

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4">
    <div className="p-4">
      <Image 
        src={article.imageUrl || '/placeholder-image.jpg'} 
        alt={article.imageAlt || 'Article image'} 
        width={300} 
        height={200} 
        layout="responsive"
        className="rounded-lg"
      />
      <h3 className="text-xl font-semibold mt-2">
        <a href={article.link} className="text-blue-600 hover:underline">
          {article.title}
        </a>
      </h3>
    </div>
    <div className="p-4">
      <p className="text-gray-600 dark:text-gray-300 mb-2">{article.description}</p>
      <div className="flex flex-wrap justify-between items-center">
        <div>
          {article.keywords && article.keywords.map((keyword, index) => (
            <span key={index} className="text-gray-700 px-2 py-1 rounded-full text-sm mr-2 mb-2">
              {keyword}
            </span>
          ))}
        </div>
        <time dateTime={article.date} className="text-sm text-gray-500">
          {new Date(article.date).toLocaleDateString()}
        </time>
      </div>
      <p className="text-sm text-gray-500 mt-2">By {article.author}</p>
    </div>
  </div>
);

async function getArticles(): Promise<Article[]> {
  const isProduction = process.env.NODE_ENV === 'production';
  const baseUrl = isProduction ? 'https://jackoregankenny.com' : '';
  
  try {
    const res = await fetch(`${baseUrl}/articles.json`, { next: { revalidate: 86400 } });
    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return []; // Return an empty array or handle the error as appropriate
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
      {articles.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": articles.map((article, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": article.link,
              "name": article.title,
              "description": article.description,
              "datePublished": article.date,
              "author": {
                "@type": "Person",
                "name": article.author
              }
            }))
          })
        }} />
      )}
    </section>
  );
}