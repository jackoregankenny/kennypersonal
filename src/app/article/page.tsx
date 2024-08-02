import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const ArticleCard = ({ article }) => (
  <Card className="mb-4">
    <CardHeader>
      <Image 
        src={article.imageUrl} 
        alt={article.imageAlt} 
        width={300} 
        height={200} 
        layout="responsive"
      />
      <h3 className="text-xl font-semibold mt-2">
        <a href={article.link} className="text-blue-600 hover:underline">
          {article.title}
        </a>
      </h3>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 dark:text-gray-300 mb-2">{article.description}</p>
      <div className="flex flex-wrap justify-between items-center">
        <div>
          {article.keywords.map((keyword, index) => (
            <span key={index} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-sm mr-2 mb-2">
              {keyword}
            </span>
          ))}
        </div>
        <time dateTime={article.date} className="text-sm text-gray-500">
          {new Date(article.date).toLocaleDateString()}
        </time>
      </div>
      <p className="text-sm text-gray-500 mt-2">By {article.author}</p>
    </CardContent>
  </Card>
);

const ArticlesSection = ({ articles }) => {
  const pageTitle = "Latest Articles";
  const pageDescription = "Explore our collection of insightful articles on various topics.";
  const canonicalUrl = "https://yourwebsite.com/articles";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
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
          })}
        </script>
      </Head>
      <section className="py-16 bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white sm:text-center md:text-left">
            {pageTitle}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch('https://yourwebsite.com/articles.json')
  const data = await res.json()
  return {
    props: {
      articles: data.articles,
    },
    revalidate: 86400, // Regenerate the page at most once per day
  }
}

export default ArticlesSection;