// ArticlesSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
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
  return (
    <div className="bg-blend-color-dodge rounded-lg shadow-md overflow-hidden mb-4">
      <div className="p-4">
        {article.imageUrl && (
          <div className="mb-4 relative h-48">
            <Image 
              src={article.imageUrl}
              alt={article.imageAlt || `Image for ${article.title}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
        <h3 className="text-xl font-semibold mt-2">
          <a href={article.link} className="text-blue-600 hover:underline">
            {article.title}
          </a>
        </h3>
        <p className="text-gray-600 mb-2">{article.description}</p>
        <div className="flex flex-wrap justify-between items-center">
          <time dateTime={article.date} className="text-sm text-gray-500">
            {new Date(article.date).toLocaleDateString()}
          </time>
        </div>
        <p className="text-sm text-gray-500 mt-2">By {article.author}</p>
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
    : '/articles.json';

  console.log('Fetching articles from:', url);

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log('Fetched data:', data);
    
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

const ArticlesSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sortedArticles, setSortedArticles] = useState<Article[]>([]);
  const [sortType, setSortType] = useState<'date' | 'title'>('date');

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
      
      // Initial sort by date (newest first)
      const initialSort = [...fetchedArticles].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setSortedArticles(initialSort);
    };

    fetchArticles();
  }, []);

  const handleSort = (type: 'date' | 'title') => {
    setSortType(type);
    const sorted = [...articles].sort((a, b) => {
      if (type === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (type === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
    setSortedArticles(sorted);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 sm:text-center md:text-left">
          Mentions
        </h1>
        <p className="text-xl sm:text-center md:text-left text-gray-500 mb-8">I&apos;m very lucky to have been mentioned by some very kind people in the media.<br/>To all of you, thank you.</p>
        <div className="mb-6 flex justify-end">
          <select
            className="px-4 py-2 border rounded-md text-gray-700 dark:bg-gray-700"
            value={sortType}
            onChange={(e) => handleSort(e.target.value as 'date' | 'title')}
          >
            <option value="date">Sort by Date (Newest First)</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
        {sortedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedArticles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No articles found. Check back later!</p>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;