// src/components/FilterableList.tsx
'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Search, Filter } from 'lucide-react';

type Item = {
  id: string;
  title: string;
  url: string;
  tags: string[];
  description: string;
};

type FilterableListProps = {
  items: Item[];
  introText?: string;
};

export default function FilterableList({ items, introText }: FilterableListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const tags = useMemo(() => {
    const allTags = items.flatMap(item => item.tags).filter(tag => tag.toLowerCase());
    return ['all', ...Array.from(new Set(allTags))];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => 
      (selectedTag === 'all' || item.tags.includes(selectedTag)) &&
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [items, selectedTag, searchTerm]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleTagChange = useCallback((tag: string) => {
    setSelectedTag(tag);
  }, []);

  return (
    <div className="max-w-4xl mx-auto text-left px-4 py-8" style={{ backgroundColor: '#FFF0EB' }}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#0000FF]">Resources</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowFilters(!showFilters)} 
            className="text-[#0000FF] hover:text-blue-700 transition-colors duration-200 flex items-center"
            aria-label="Toggle search and filters"
          >
            <Search size={18} className="mr-1" />
            <span className="text-sm">Search</span>
          </button>
          <button 
            onClick={() => setShowFilters(!showFilters)} 
            className="text-[#0000FF] hover:text-blue-700 transition-colors duration-200 flex items-center"
            aria-label="Toggle filters"
          >
            <Filter size={18} className="mr-1" />
            <span className="text-sm">Filter</span>
          </button>
        </div>
      </div>

      {introText && (
        <p className="text-gray-600 mb-6">{introText}</p>
      )}

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showFilters ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white bg-opacity-50 rounded-md p-4 mb-6">
          <input
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 mb-4 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-200"
          />
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTag === tag 
                    ? 'bg-[#0000FF] text-white' 
                    : 'bg-white text-[#0000FF] hover:bg-blue-100'
                } transition-colors duration-200`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {filteredItems.map(item => (
          <div key={item.id} className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={item.url} className="text-[#0000FF] hover:underline">
                {item.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-3 leading-relaxed">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.tags.filter(tag => tag.toLowerCase() ).map(tag => (
                <span key={tag} className="inline-block bg-blue-100 text-[#0000FF] text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}