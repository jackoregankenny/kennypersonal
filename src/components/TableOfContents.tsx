// src/components/TableOfContents.tsx
import React from 'react';

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

export function TableOfContents({ items }: { items: TOCItem[] }) {
  return (
    <nav className="toc">
      <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id} style={{ marginLeft: `${(item.level - 2) * 0.5}rem` }}>
            <a href={`#${item.id}`} className="text-gray-600 hover:text-gray-900">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}