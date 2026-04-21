"use client";

import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
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

  const [activeImage, setActiveImage] = useState<string | null>(
    validImages[0]?.secure_url || null
  );

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
      </div>

      {validImages.length > 1 && (
        <div className="wood-gallery-thumbs">
          {validImages.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveImage(img.secure_url)}
              className={`wood-gallery-thumb ${activeImage === img.secure_url ? "active" : ""
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