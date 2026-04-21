"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Upload, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { WoodImage } from "@/lib/seymu-data";

interface WoodImageUploaderProps {
  woodId?: number;
  initialImages?: WoodImage[];
}

export default function WoodImageUploader({ woodId, initialImages = [] }: WoodImageUploaderProps) {
  const [images, setImages] = useState<Partial<WoodImage>[]>(initialImages);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleUploadSuccess = (results: any) => {
    if (results.info && typeof results.info !== "string") {
      const newImage = {
        secure_url: results.info.secure_url,
        public_id: results.info.public_id,
      };
      setImages((prev) => [...prev, newImage]);
      toast.success("Imagen subida correctamente");
    }
  };

  const removeImage = (index: number) => {
    // If it's a new image (not in DB yet), just remove from state
    const img = images[index];
    setImages((prev) => prev.filter((_, i) => i !== index));
    
    // Note: Physical deletion from Cloudinary for "newly uploaded but not saved" 
    // images could be handled here if we had a direct delete action.
    // For now, we just remove from the list to be saved.
  };

  return (
    <div className="form-section">
      <div className="form-section-header">
        <ImageIcon size={20} />
        Galería de Imágenes
      </div>

      <div className="wood-uploader-container">
        <div className="admin-gallery-grid">
          {images.map((img, index) => (
            <div key={index} className="gallery-item-wrapper">
              <img 
                src={img.secure_url} 
                alt="Wood" 
                className="admin-gallery-image"
              />
              <button
                type="button"
                className="image-delete-overlay"
                onClick={() => removeImage(index)}
                title="Quitar imagen"
              >
                <Trash2 size={16} />
              </button>
              
              {/* Hidden inputs to send data to the form action */}
              <input 
                type="hidden" 
                name="wood_images" 
                value={JSON.stringify({ secure_url: img.secure_url, public_id: img.public_id })} 
              />
            </div>
          ))}

          <CldUploadWidget 
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            options={{
              multiple: true,
              resourceType: "image",
              clientAllowedFormats: ["jpg", "png", "webp", "jpeg"],
              maxFiles: 10,
              language: "es",
            }}
            onSuccess={handleUploadSuccess}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="upload-placeholder-card"
              >
                <Upload size={24} />
                <span>Agregar Imágenes</span>
              </button>
            )}
          </CldUploadWidget>
        </div>
      </div>

      <style jsx>{`
        .wood-uploader-container {
          background: #f8fafc;
          padding: 24px;
          border-radius: 8px;
          border: 1px dashed #cbd5e0;
        }

        .upload-placeholder-card {
          aspect-ratio: 1/1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 2px dashed #e2e8f0;
          background: #fff;
          border-radius: 8px;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s;
        }

        .upload-placeholder-card:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: var(--primary-ghost);
        }

        .gallery-item-wrapper {
          position: relative;
          aspect-ratio: 1/1;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
          border: 1px solid #e2e8f0;
        }

        .image-delete-overlay {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 32px;
          height: 32px;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          border: none;
          border-radius: 6px;
          display: grid;
          place-items: center;
          cursor: pointer;
          opacity: 0;
          transition: all 0.2s;
          transform: translateY(-5px);
        }

        .gallery-item-wrapper:hover .image-delete-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .image-delete-overlay:hover {
          background: #dc2626;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
