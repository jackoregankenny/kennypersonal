'use client'
import React, { useState, useEffect } from 'react';
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
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1000);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const contentWithFootnotes = React.useMemo(() => {
    let content = contentHtml;
    footnotes.forEach((footnote) => {
      const footnoteRef = `<sup><a href="#fn-${footnote.id}" id="fnref-${footnote.id}" class="footnote-ref">${footnote.id}</a></sup>`;
      content = content.replace(`[^${footnote.id}]`, footnoteRef);
    });
    return content;
  }, [contentHtml, footnotes]);

  return (
    <div className="container mb-28">
      <div className="blog-post-layout">
        <aside className="table-of-contents-column">
          <TableOfContents items={headings} />
        </aside>
        
        <main className="blog-post-content">
          <article className="prose">
            <h1 className="blog-title">{postData.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: contentWithFootnotes }} className="blog-content" />
          </article>
        </main>
        
        <aside className="footnotes-column">
          {footnotes.map((footnote) => (
            <Footnote key={footnote.id} id={footnote.id} content={footnote.content} />
          ))}
        </aside>
      </div>

      {isMobile && (
        <>
          <button 
            className="toc-button" 
            onClick={() => setIsTocOpen(!isTocOpen)} 
            aria-label="Toggle Table of Contents"
          >
            ToC
          </button>

          {isTocOpen && (
            <div className="toc-modal" onClick={() => setIsTocOpen(false)}>
              <div className="toc-modal-content" onClick={e => e.stopPropagation()}>
                <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
                <TableOfContents items={headings} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}