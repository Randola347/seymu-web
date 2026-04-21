"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

type WoodImageUploaderProps = {
  woodId: number;
  woodName: string;
};

type CloudinaryUploadResult = {
  info?: {
    public_id?: string;
    secure_url?: string;
    original_filename?: string;
  };
  event?: string;
};

export default function WoodImageUploader({
  woodId,
  woodName,
}: WoodImageUploaderProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUploadSuccess(result: CloudinaryUploadResult) {
    const info = result?.info;

    if (!info?.secure_url) {
      setMessage("La imagen subió, pero no llegó la URL.");
      return;
    }

    try {
      setIsSaving(true);
      setMessage("Guardando imagen en la base de datos...");

      const response = await fetch("/api/wood-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          woodId,
          publicId: info.public_id ?? null,
          secureUrl: info.secure_url,
          altText: `${woodName} - imagen`,
        }),
      });

      const rawText = await response.text();

      let data: any = null;

      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch {
        throw new Error(
          `La API devolvió HTML o texto no válido. Status: ${response.status}. Respuesta: ${rawText.slice(0, 200)}`
        );
      }

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "No se pudo guardar la imagen.");
      }

      setMessage("Imagen subida y guardada correctamente.");
      router.refresh();
    } catch (error) {
      console.error("Error en uploader:", error);

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("La imagen subió, pero falló al guardarse en Neon.");
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="wood-uploader-card">

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          multiple: false,
          maxFiles: 1,
          resourceType: "image",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
          maxFileSize: 5000000,
          sources: ["local", "camera", "url"],
          folder: "seymu/woods",
          language: "es",
        }}
        onSuccess={(result) =>
          handleUploadSuccess(result as CloudinaryUploadResult)
        }
      >
        {({ open }) => {
          return (
            <button
              type="button"
              className="btn-primary"
              onClick={() => open()}
              disabled={isSaving}
            >
              {isSaving ? "Guardando..." : "Subir imagen"}
            </button>
          );
        }}
      </CldUploadWidget>

      {message ? (
        <div className={`admin-alert ${message.toLowerCase().includes("error") || message.toLowerCase().includes("falló") ? "error" : "info"}`}>
          {message.toLowerCase().includes("error") || message.toLowerCase().includes("falló") ? (
            <AlertCircle size={18} />
          ) : (
             message.includes("correctamente") ? <CheckCircle2 size={18} /> : <Info size={18} />
          )}
          <span>{message}</span>
        </div>
      ) : null}
    </div>
  );
}