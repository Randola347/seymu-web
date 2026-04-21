"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import ConfirmModal from "@/app/components/ui/ConfirmModal";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

type WoodImage = {
  id: number;
  wood_id: number;
  public_id: string | null;
  secure_url: string;
  alt_text: string | null;
  sort_order: number;
};

type AdminWoodImagesManagerProps = {
  woodId: number;
  woodName: string;
  images: WoodImage[];
};

type CloudinaryUploadResult = {
  info?: {
    public_id?: string;
    secure_url?: string;
    original_filename?: string;
  };
  event?: string;
};

export default function AdminWoodImagesManager({
  woodId,
  woodName,
  images,
}: AdminWoodImagesManagerProps) {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [busyKey, setBusyKey] = useState<string | null>(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  async function parseJsonResponse(response: Response) {
    const rawText = await response.text();

    try {
      return rawText ? JSON.parse(rawText) : null;
    } catch {
      throw new Error(
        `La API devolvió una respuesta no válida. Status: ${response.status}`
      );
    }
  }

  async function handleAddSuccess(result: CloudinaryUploadResult) {
    const info = result?.info;

    if (!info?.secure_url) {
      setMessage("La imagen subió, pero no llegó la URL.");
      return;
    }

    try {
      setBusyKey("add");
      setMessage("Agregando imagen...");

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

      const data = await parseJsonResponse(response);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "No se pudo agregar la imagen.");
      }

      setMessage("Imagen agregada correctamente.");
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage(
        error instanceof Error
          ? error.message
          : "No se pudo agregar la imagen."
      );
    } finally {
      setBusyKey(null);
    }
  }

  async function handleReplaceSuccess(
    imageId: number,
    result: CloudinaryUploadResult
  ) {
    const info = result?.info;

    if (!info?.secure_url) {
      setMessage("La nueva imagen subió, pero no llegó la URL.");
      return;
    }

    try {
      setBusyKey(`replace-${imageId}`);
      setMessage("Reemplazando imagen...");

      const response = await fetch(`/api/wood-images/${imageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicId: info.public_id ?? null,
          secureUrl: info.secure_url,
          altText: `${woodName} - imagen actualizada`,
        }),
      });

      const data = await parseJsonResponse(response);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "No se pudo reemplazar la imagen.");
      }

      setMessage("Imagen reemplazada correctamente.");
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage(
        error instanceof Error
          ? error.message
          : "No se pudo reemplazar la imagen."
      );
    } finally {
      setBusyKey(null);
    }
  }

  function requestDelete(imageId: number) {
    setPendingDeleteId(imageId);
    setIsModalOpen(true);
  }

  async function handleDelete() {
    if (pendingDeleteId === null) return;
    const imageId = pendingDeleteId;

    try {
      setBusyKey(`delete-${imageId}`);
      setMessage("Eliminando imagen...");

      const response = await fetch(`/api/wood-images/${imageId}`, {
        method: "DELETE",
      });

      const data = await parseJsonResponse(response);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "No se pudo eliminar la imagen.");
      }

      setMessage("Imagen eliminada correctamente.");
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar la imagen."
      );
    } finally {
      setBusyKey(null);
    }
  }

  return (
    <div className="admin-images-manager">
      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Eliminar Imagen"
        message="¿Seguro que querés eliminar esta imagen? Esta acción también la borrará de Cloudinary de forma permanente."
        confirmText="Eliminar"
        isDanger={true}
      />
      <div className="admin-images-toolbar">
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
            handleAddSuccess(result as CloudinaryUploadResult)
          }
        >
          {({ open }) => (
            <button
              type="button"
              className="btn-primary"
              onClick={() => open()}
              disabled={busyKey === "add"}
            >
              {busyKey === "add" ? "Agregando..." : "Agregar imagen"}
            </button>
          )}
        </CldUploadWidget>
      </div>

      {images.length > 0 ? (
        <div className="admin-gallery-grid">
          {images.map((image, index) => (
            <div key={image.id} className="admin-gallery-card">
              <img
                src={image.secure_url}
                alt={image.alt_text || `${woodName} ${index + 1}`}
                className="admin-gallery-image"
              />

              <span className="admin-gallery-label">
                Imagen {index + 1}
              </span>

              <div className="admin-gallery-actions">
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
                    handleReplaceSuccess(image.id, result as CloudinaryUploadResult)
                  }
                >
                  {({ open }) => (
                    <button
                      type="button"
                      className="btn-outline-small"
                      onClick={() => open()}
                      disabled={busyKey === `replace-${image.id}`}
                    >
                      {busyKey === `replace-${image.id}`
                        ? "Reemplazando..."
                        : "Reemplazar"}
                    </button>
                  )}
                </CldUploadWidget>

                <button
                  type="button"
                  className="btn-danger-small"
                  onClick={() => requestDelete(image.id)}
                  disabled={busyKey === `delete-${image.id}`}
                >
                  {busyKey === `delete-${image.id}`
                    ? "Eliminando..."
                    : "Eliminar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-image-empty compact">
          Esta madera todavía no tiene imágenes subidas.
        </div>
      )}

      {message ? (
        <div className={`admin-alert ${message.toLowerCase().includes("error") || message.toLowerCase().includes("falló") ? "error" : "success"}`}>
          {message.toLowerCase().includes("error") || message.toLowerCase().includes("falló") ? (
            <AlertCircle size={18} />
          ) : (
            <CheckCircle2 size={18} />
          )}
          <span>{message}</span>
        </div>
      ) : null}
    </div>
  );
}