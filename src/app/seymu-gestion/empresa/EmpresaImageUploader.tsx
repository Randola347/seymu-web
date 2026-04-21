"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState, useEffect } from "react";
import { Upload, Image as ImageIcon, X, RefreshCw } from "lucide-react";

interface EmpresaImageUploaderProps {
  label: string;
  name: string;
  currentUrl?: string | null;
  onChange?: (url: string) => void;
}

export default function EmpresaImageUploader({ label, name, currentUrl, onChange }: EmpresaImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState(currentUrl || "");

  // Notify parent of initial value if any
  useEffect(() => {
    if (currentUrl && onChange) {
      onChange(currentUrl);
    }
  }, [currentUrl, onChange]);

  const handleRemove = () => {
    setPreviewUrl("");
    if (onChange) onChange("");
  };

  return (
    <div className="form-field">
      <label>{label}</label>
      
      <div className="empresa-image-container" style={{ 
        border: '2px dashed var(--border)', 
        borderRadius: '12px', 
        padding: '20px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '15px',
        background: previewUrl ? 'rgba(var(--primary-rgb), 0.02)' : 'transparent'
      }}>
        {previewUrl ? (
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <img 
              src={previewUrl} 
              alt={label} 
              className="empresa-preview-img" 
              style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}
            />
            <button
              type="button"
              onClick={handleRemove}
              className="btn-danger"
              style={{ 
                position: 'absolute', 
                top: '-10px', 
                right: '-10px', 
                padding: '6px', 
                borderRadius: '50%',
                boxShadow: 'var(--shadow-md)' 
              }}
              title="Quitar imagen"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--foreground-muted)' }}>
            <ImageIcon size={48} strokeWidth={1.5} />
            <p style={{ fontSize: '0.85rem', marginTop: '10px' }}>Sin imagen seleccionada</p>
          </div>
        )}

        <input type="hidden" name={name} value={previewUrl} />

        <CldUploadWidget 
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{
            multiple: false,
            maxFiles: 1,
            resourceType: "image",
            clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
            language: "es",
          }}
          onSuccess={(results: any) => {
            if (results.info && typeof results.info !== "string") {
              const url = results.info.secure_url;
              setPreviewUrl(url);
              if (onChange) onChange(url);
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className={previewUrl ? "btn-secondary" : "btn-primary"}
              style={{ gap: '8px' }}
            >
              {previewUrl ? <RefreshCw size={16} /> : <Upload size={16} />}
              {previewUrl ? "Cambiar Imagen" : "Subir Imagen Ej: .png .jpg"}
            </button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
}
