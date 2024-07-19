'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const MAX_VISIBLE_LENGTH = 150;

export function Footnote({ id, content }: { id: string; content: string }) {
  const [top, setTop] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const footnoteRef = document.getElementById(`fnref-${id}`);
    
    const updatePosition = () => {
      if (footnoteRef) {
        const rect = footnoteRef.getBoundingClientRect();
        setTop(rect.top + window.scrollY);
        controls.start({ y: [10, 0], transition: { type: 'spring', stiffness: 300, damping: 20 } });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [id, controls]);

  const shouldTruncate = content.length > MAX_VISIBLE_LENGTH;
  const displayContent = shouldTruncate && !isExpanded
    ? content.slice(0, MAX_VISIBLE_LENGTH) + '...'
    : content;

  return (
    <motion.div 
      id={`fn-${id}`}
      className="footnote"
      style={{
        position: top !== null ? 'absolute' : 'static',
        top: top !== null ? `${top}px` : 'auto',
        width: '100%',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        padding: '0.75rem',
        backgroundColor: '#FFF0EB',
        borderLeft: '2px solid #0000FF',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '1rem',
      }}
      whileHover={{ scale: 1.02, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
      animate={controls}
    >
      <sup>{id}</sup> {displayContent}
      {shouldTruncate && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#0000FF] hover:text-blue-700 text-sm mt-1 block"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </motion.div>
  );
}