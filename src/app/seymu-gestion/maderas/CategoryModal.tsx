"use client";

import { useState } from "react";
import { Plus, Trash2, X, Loader2 } from "lucide-react";
import { createCategoryAction, deleteCategoryAction } from "./actions";
import { toast } from "sonner";
import type { WoodCategory } from "@/lib/seymu-data";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: WoodCategory[];
  onCategoriesChange: (newCategories: WoodCategory[]) => void;
}

export default function CategoryModal({ isOpen, onClose, categories, onCategoriesChange }: CategoryModalProps) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isPending, setIsPending] = useState(false);

  if (!isOpen) return null;

  const handleAdd = async () => {
    if (!newCategoryName.trim()) return;
    setIsPending(true);
    const res = await createCategoryAction(newCategoryName.trim());
    setIsPending(false);

    if (res.success && res.category) {
      toast.success(res.message);
      onCategoriesChange([...categories, res.category as WoodCategory]);
      setNewCategoryName("");
    } else {
      toast.error(res.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar esta categoría? Esto no afectará a las maderas ya creadas, pero no aparecerá más en la lista.")) return;
    
    setIsPending(true);
    const res = await deleteCategoryAction(id);
    setIsPending(false);

    if (res.success) {
      toast.success(res.message);
      onCategoriesChange(categories.filter(c => c.id !== id));
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Gestionar Categorías</h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="category-add-form">
            <input
              type="text"
              placeholder="Nueva categoría (ej: Maderas Rojas)"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <button 
              onClick={handleAdd} 
              className="btn-primary" 
              disabled={isPending || !newCategoryName.trim()}
            >
              {isPending ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
              Añadir
            </button>
          </div>

          <div className="category-list">
            {categories.length === 0 ? (
              <p className="empty-text">No hay categorías creadas.</p>
            ) : (
              categories.map((cat) => (
                <div key={cat.id} className="category-item">
                  <span>{cat.name}</span>
                  <button 
                    onClick={() => handleDelete(cat.id)} 
                    className="btn-delete-small"
                    title="Eliminar categoría"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .modal-content {
          background: white;
          width: 90%;
          max-width: 450px;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          animation: modalAppear 0.3s ease-out;
        }
        @keyframes modalAppear {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .modal-header {
          padding: 20px;
          background: var(--background-alt);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        .modal-header h2 {
          margin: 0;
          font-size: 1.25rem;
          color: var(--text-main);
        }
        .modal-close {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          display: flex;
          transition: background 0.2s;
        }
        .modal-close:hover {
          background: rgba(0,0,0,0.05);
          color: var(--text-main);
        }
        .modal-body {
          padding: 20px;
        }
        .category-add-form {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
        }
        .category-add-form input {
          flex: 1;
          padding: 10px 14px;
          border: 1.5px solid var(--border-color);
          border-radius: 8px;
          font-size: 0.95rem;
          transition: border-color 0.2s;
        }
        .category-add-form input:focus {
          border-color: var(--primary);
          outline: none;
        }
        .category-list {
          max-height: 250px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .category-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          transition: transform 0.1s;
        }
        .category-item:hover {
          border-color: #cbd5e1;
        }
        .category-item span {
          font-weight: 500;
          color: var(--text-main);
        }
        .btn-delete-small {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
          display: flex;
          transition: background 0.2s;
        }
        .btn-delete-small:hover {
          background: #fee2e2;
        }
        .empty-text {
          text-align: center;
          color: var(--text-muted);
          padding: 20px;
          font-style: italic;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
