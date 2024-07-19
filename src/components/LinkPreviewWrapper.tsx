'use client';

import React from 'react';
import { LinkPreview } from '@/components/LinkPreview';

export function LinkPreviewWrapper() {
  const wrappers = document.querySelectorAll('.link-preview-wrapper');
  
  wrappers.forEach((wrapper) => {
    const url = wrapper.getAttribute('data-url');
    const text = wrapper.getAttribute('data-text');
    if (url && text) {
      const root = ReactDOM.createRoot(wrapper);
      root.render(<LinkPreview url={url}>{text}</LinkPreview>);
    }
  });

  return null;
}