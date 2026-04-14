"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deleteWoodAction } from "./actions";

export default function WoodDeleteButton({ id, name }: { id: number; name: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`¿Estás seguro de que deseas eliminar permanentemente la madera "${name}"? Esta acción no se puede deshacer.`)) {
      return;
    }

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
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="btn-danger-small"
      title="Eliminar madera"
    >
      {isDeleting ? "..." : "Eliminar"}
    </button>
  );
}
