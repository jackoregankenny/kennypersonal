'use client';

import React, { useEffect, useState } from 'react';

export function Footnote({ id, content }: { id: string; content: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const footnoteRef = document.querySelector(`[data-footnote-id="${id}"]`);
    if (footnoteRef) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible(entry.isIntersecting);
            if (entry.isIntersecting) {
              const rect = entry.boundingClientRect;
              setPosition(rect.top + window.scrollY);
            }
          });
        },
        { threshold: 1.0 }
      );
      observer.observe(footnoteRef);
      return () => observer.disconnect();
    }
  }, [id]);

  if (!isVisible) return null;

  return (
    <div className="footnote" style={{ top: `${position}px` }}>
      <sup>{id}</sup> {content}
    </div>
  );
}