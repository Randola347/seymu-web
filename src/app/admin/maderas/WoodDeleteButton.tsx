"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deleteWoodAction } from "./actions";
import ConfirmModal from "@/app/components/ui/ConfirmModal";

export default function WoodDeleteButton({ id, name }: { id: number; name: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteWoodAction(id);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Eliminar Madera"
        message={`¿Estás seguro de que deseas eliminar permanentemente la madera "${name}"? Esta acción también borrará todas sus imágenes asociadas de Cloudinary.`}
        confirmText="Eliminar permanentemente"
        isDanger={true}
      />
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={isDeleting}
        className="btn-danger-small"
        title="Eliminar madera"
      >
        {isDeleting ? "Eliminando..." : "Eliminar"}
      </button>
    </>
  );
}
