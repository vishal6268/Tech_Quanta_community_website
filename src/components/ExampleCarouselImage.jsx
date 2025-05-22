// src/components/ExampleCarouselImage.jsx
import React from 'react';

export default function ExampleCarouselImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt || 'Event image'}
      style={{
        width: '100%',
        height: '400px',
        objectFit: 'cover',
        borderRadius: '8px',
      }}
    />
  );
}
