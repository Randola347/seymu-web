"use client";

import { useState } from "react";
import { toast } from "sonner";
import { toggleWoodFeaturedAction } from "./actions";

export default function WoodFeaturedToggle({ id, initialStatus }: { id: number; initialStatus: boolean }) {
  const [isFeatured, setIsFeatured] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const nextStatus = !isFeatured;
    
    const result = await toggleWoodFeaturedAction(id, nextStatus);
    
    if (result.success) {
      setIsFeatured(nextStatus);
      toast.success(`Madera ${nextStatus ? "destacada" : "quitada de destacados"}`);
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
      style={{ marginLeft: '10px' }}
    >
      {loading ? "..." : (isFeatured ? "Quitar Destacado" : "Destacar")}
    </button>
  );
}
