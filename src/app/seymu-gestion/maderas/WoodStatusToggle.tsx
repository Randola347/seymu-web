"use client";

import { useState } from "react";
import { toast } from "sonner";
import { toggleWoodStatusAction } from "./actions";

export default function WoodStatusToggle({ id, initialStatus }: { id: number; initialStatus: boolean }) {
  const [isActive, setIsActive] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const nextStatus = !isActive;
    
    const result = await toggleWoodStatusAction(id, nextStatus);
    
    if (result.success) {
      setIsActive(nextStatus);
      toast.success(`Madera ${nextStatus ? "activada" : "desactivada"}`);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleToggle} 
      className="btn-outline-small"
      disabled={loading}
    >
      {loading ? "..." : (isActive ? "Desactivar" : "Activar")}
    </button>
  );
}
