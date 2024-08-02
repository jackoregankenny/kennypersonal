'use client'
import React, { useState, useEffect } from 'react';
import { TableOfContents } from '@/components/TableOfContents';
import { Footnote } from '@/components/Footnote';
import { Table, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
          {!isMobile && <TableOfContents items={headings} />}
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
          <motion.button 
            onClick={() => setIsTocOpen(!isTocOpen)}
            className="fixed bottom-4 right-4 p-2 bg-[#0000FF] text-white rounded-full shadow-lg z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isTocOpen ? "Close table of contents" : "Open table of contents"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isTocOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: isTocOpen ? -180 : 180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: isTocOpen ? 180 : -180 }}
                transition={{ duration: 0.2 }}
              >
                {isTocOpen ? <X size={24} /> : <Table size={24} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <AnimatePresence>
            {isTocOpen && (
              <TableOfContents items={headings} isOpen={isTocOpen} onClose={() => setIsTocOpen(false)} />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}