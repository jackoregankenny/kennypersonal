'use client';

import React, { useEffect } from 'react';
import { TableOfContents } from '@/components/TableOfContents';
import { Footnote } from '@/components/Footnote';
import { LinkPreview } from '@/components/LinkPreview';

interface BlogPostContentProps {
  postData: {
    title: string;
    [key: string]: any;
  };
  contentHtml: string;
  headings: any[];
  footnotes: any[];
}

export default function BlogPostContent({ postData, contentHtml, headings, footnotes }: BlogPostContentProps) {
  console.log("BlogPostContent received props:", { postData, contentHtml: contentHtml.substring(0, 100), headings, footnotes });

  useEffect(() => {
    // ... (rest of the useEffect code)
  }, []);

  if (!postData || !postData.title) {
    console.error("PostData is missing or incomplete:", postData);
    return <div>Error: Invalid post data</div>;
  }

  return (
    <div className="blog-layout">
      <article className="prose lg:prose-xl">
        <h1>{postData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} className="blog-content" />
      </article>
      <aside className="sidebar">
        {headings.length > 0 && <TableOfContents items={headings} />}
        <div className="footnotes">
          <h2 className="text-lg font-semibold mb-2">Footnotes</h2>
          {footnotes.map((footnote) => (
            <Footnote key={footnote.id} id={footnote.id} content={footnote.content} />
          ))}
        </div>
      </aside>
    </div>
  );
}