import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const MAX_VISIBLE_LENGTH = 150;

export function Footnote({ id, content }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const controls = useAnimation();
  const footnoteRef = useRef(null);

  useEffect(() => {
    const checkScreenWidth = () => setIsWideScreen(window.innerWidth >= 1000);
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

  useEffect(() => {
    if (isWideScreen) {
      const footnoteRefElement = document.getElementById(`fnref-${id}`);
      const footnoteColumn = document.querySelector('.footnotes-column');

      if (footnoteRefElement && footnoteColumn && footnoteRef.current) {
        const refRect = footnoteRefElement.getBoundingClientRect();
        const columnRect = footnoteColumn.getBoundingClientRect();

        const topPosition = Math.min(
          Math.max(refRect.top + window.scrollY, columnRect.top),
          columnRect.bottom - footnoteRef.current.offsetHeight - 10 // Add some buffer to avoid cutoff
        );

        controls.start({
          top: topPosition,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        });
      }
    } else {
      controls.start({ top: 'auto' });
    }
  }, [id, controls, isWideScreen]);

  const shouldTruncate = content.length > MAX_VISIBLE_LENGTH;
  const displayContent = shouldTruncate && !isExpanded
    ? content.slice(0, MAX_VISIBLE_LENGTH) + '...'
    : content;

  return (
    <motion.div 
      ref={footnoteRef}
      id={`fn-${id}`}
      className={`footnote ${isWideScreen ? 'footnote-wide' : 'footnote-narrow'}`}
      animate={controls}
      style={{ position: isWideScreen ? 'absolute' : 'static' }}
    >
      <sup>{id}</sup> <span dangerouslySetInnerHTML={{ __html: displayContent }} />
      {shouldTruncate && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-700 text-sm mt-1 block"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </motion.div>
  );
}
