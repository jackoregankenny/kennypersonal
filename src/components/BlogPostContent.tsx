'use client';

import React from 'react';
import { TableOfContents } from '@/components/TableOfContents';
import { Footnote } from '@/components/Footnote';

interface BlogPostContentProps {
  postData: {
    title: string;
    [key: string]: any;
  };
  contentHtml: string;
  headings: Array<{ id: string; text: string; level: number }>;
  footnotes: Array<{ id: string; content: string }>;
}

export default function BlogPostContent({ postData, contentHtml, headings, footnotes }: BlogPostContentProps) {
  return (
    <div className="blog-post-layout">
      <main className="blog-post-content">
        <article className="prose lg:prose-xl">
        <h1 className="blog-title">{postData.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} className="blog-content" />
        </article>
        <div className="footnotes-container">
          {footnotes.map((footnote) => (
            <Footnote key={footnote.id} id={footnote.id} content={footnote.content} />
          ))}
        </div>
      </main>
      <aside className="blog-post-sidebar">
        {headings.length > 0 && (
          <div className="table-of-contents mb-8 sticky top-4">
            <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
            <TableOfContents items={headings} />
          </div>
        )}
      </aside>
    </div>
  );
}