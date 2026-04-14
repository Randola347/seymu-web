"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Image as ImageIcon, Upload } from "lucide-react";

interface EmpresaImageUploaderProps {
  label: string;
  name: string; // The form field name
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
          <div className="empresa-preview-placeholder">
            <ImageIcon size={40} />
            <span>Sin {label.toLowerCase()}</span>
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
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            maxFileSize: 5000000,
            sources: ["local", "camera", "url"],
            folder: "seymu/identity",
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
              className="btn-outline-small"
              style={{ marginTop: "0.5rem" }}
            >
              <Upload size={16} />
              Cambiar {label}
            </button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
}
