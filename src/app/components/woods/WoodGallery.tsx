"use client";

import { useMemo, useState } from "react";
import { ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import "./woods.css";

interface WoodGalleryProps {
  images: { secure_url: string }[];
  woodName: string;
}

export default function WoodGallery({ images, woodName }: WoodGalleryProps) {
  const validImages = useMemo(
    () => images.filter((img) => Boolean(img?.secure_url)),
    [images]
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const activeImage = validImages[currentIndex]?.secure_url || null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  if (!activeImage) {
    return (
      <div className="wood-gallery-empty">
        <div className="wood-gallery-empty-content">
          <ShieldCheck size={80} className="wood-gallery-empty-icon" />
          <p>Vista no disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wood-gallery">
      <div className="wood-gallery-main">
        <img
          src={activeImage}
          alt={woodName}
          className="wood-gallery-main-image"
        />

        {validImages.length > 1 && (
          <>
            <button
              type="button"
              className="gallery-arrow prev"
              onClick={prevImage}
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={28} style={{ pointerEvents: 'none' }} />
            </button>
            <button
              type="button"
              className="gallery-arrow next"
              onClick={nextImage}
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={28} style={{ pointerEvents: 'none' }} />
            </button>
          </>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="wood-gallery-thumbs">
          {validImages.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`wood-gallery-thumb ${currentIndex === i ? "active" : ""
                }`}
              aria-label={`Ver imagen ${i + 1} de ${woodName}`}
            >
              <img
                src={img.secure_url}
                alt={`${woodName} ${i + 1}`}
                className="wood-gallery-thumb-image"
                style={{ pointerEvents: "none" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}