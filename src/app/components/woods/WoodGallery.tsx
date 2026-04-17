"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";

interface WoodGalleryProps {
  images: { secure_url: string }[];
  woodName: string;
}

export default function WoodGallery({ images, woodName }: WoodGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]?.secure_url || null);

  if (!activeImage) {
    return (
      <div 
        style={{
          width: '100%',
          aspectRatio: '1/1',
          background: 'var(--surface-alt)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <div style={{ color: 'var(--border)', textAlign: 'center' }}>
          <ShieldCheck size={80} style={{ opacity: 0.2, marginBottom: '16px' }} />
          <p style={{ fontWeight: 600 }}>Vista no disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div 
        style={{
          width: '100%',
          aspectRatio: '1/1',
          background: 'var(--surface-alt)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--border)',
        }}
      >
        <img 
          src={activeImage} 
          alt={woodName} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }} 
        />
      </div>

      {images.length > 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          {images.map((img, i) => (
            <div 
              key={i} 
              onClick={() => setActiveImage(img.secure_url)}
              style={{ 
                aspectRatio: '1/1', 
                borderRadius: 'var(--radius-sm)', 
                overflow: 'hidden', 
                border: activeImage === img.secure_url ? '2px solid var(--primary)' : '1px solid var(--border)',
                cursor: 'pointer',
                opacity: activeImage === img.secure_url ? 1 : 0.7,
                transition: 'all 0.2s ease'
              }}
            >
              <img src={img.secure_url} alt={`${woodName} ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
