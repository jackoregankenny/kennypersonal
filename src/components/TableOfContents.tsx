import React, { useState, useEffect } from 'react';

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

export function TableOfContents({ items }: { items: TOCItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.slice(1);
    const targetElement = document.getElementById(targetId || '');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      if (isMobile) setIsOpen(false);
    }
  };

  const TOCContent = () => (
    <ul>
      {items.map((item) => (
        <li key={item.id} style={{ marginLeft: `${(item.level - 2) * 0.5}rem` }}>
          <a href={`#${item.id}`} onClick={handleItemClick}>
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {!isMobile && (
        <nav className="table-of-contents">
          <h2>Table of Contents</h2>
          <TOCContent />
        </nav>
      )}
      {isMobile && (
        <>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="toc-button"
            aria-label="Toggle Table of Contents"
          >
            ToC
          </button>
          {isOpen && (
            <div 
              className="sticky inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setIsOpen(false)}
            >
              <div 
                className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-lg max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
                <TOCContent />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}