import React from 'react';
import { motion } from 'framer-motion';

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

interface TableOfContentsProps {
  items: TOCItem[];
  isOpen?: boolean;
  onClose?: () => void;
}

export function TableOfContents({ items, isOpen, onClose }: TableOfContentsProps) {
  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.slice(1);
    const targetElement = document.getElementById(targetId || '');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      onClose?.();
    }
  };

  const TOCContent = () => (
    <ul className="list-disc pl-4">
      {items.map((item) => (
        <li key={item.id} style={{ marginLeft: `${(item.level - 2) * 0.5}rem` }}>
          <a href={`#${item.id}`} onClick={handleItemClick} className="text-[#2e2e2e] hover:underline">
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (isOpen === undefined) {
    // Desktop version
    return (
      <nav className="table-of-contents">
        <h2 className="text-[#0000FF]">Table of Contents</h2>
        <TOCContent />
      </nav>
    );
  }

  // Mobile version
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-lg max-h-[80vh] overflow-y-auto"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "linear", damping: 25, stiffness: 500 }}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-2 text-[#0000FF]">Table of Contents</h2>
        <TOCContent />
      </motion.div>
    </motion.div>
  );
}