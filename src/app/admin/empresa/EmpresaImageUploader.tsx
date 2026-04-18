"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

interface EmpresaImageUploaderProps {
  label: string;
  name: string;
  currentUrl?: string | null;
}

export default function EmpresaImageUploader({ label, name, currentUrl }: EmpresaImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState(currentUrl || "");

  return (
    <div className="form-field">
      <label>{label}</label>
      
      <div className="empresa-image-container">
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt={label} 
            className="empresa-preview-img" 
          />
        ) : (
          <div style={{ padding: '20px', textAlign: 'center', color: '#cbd5e0' }}>
            <ImageIcon size={32} />
            <p style={{ fontSize: '0.8rem' }}>Sin imagen</p>
          </div>
        )}

        {/* Hidden input to be picked up by the form action */}
        <input type="hidden" name={name} value={previewUrl} />

        <CldUploadWidget 
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{
            multiple: false,
            maxFiles: 1,
            resourceType: "image",
            language: "es",
          }}
          onSuccess={(results: any) => {
            if (results.info && typeof results.info !== "string") {
              setPreviewUrl(results.info.secure_url);
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.85rem', alignSelf: 'flex-start' }}
            >
              <Upload size={14} style={{ marginRight: '6px' }} />
              Subir Imagen
            </button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
}
