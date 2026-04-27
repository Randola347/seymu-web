"use client";

import { useState } from "react";
import { Plus, Trash2, X, Loader2, Edit2, Check } from "lucide-react";
import { createCategoryAction, deleteCategoryAction, updateCategoryAction } from "./actions";
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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

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

  const handleUpdate = async (id: number) => {
    if (!editingName.trim()) return;
    setIsPending(true);
    const res = await updateCategoryAction(id, editingName.trim());
    setIsPending(false);

    if (res.success && res.category) {
      toast.success(res.message);
      onCategoriesChange(categories.map(c => c.id === id ? res.category as WoodCategory : c));
      setEditingId(null);
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

  const startEditing = (cat: WoodCategory) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
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
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Nueva categoría (ej: Maderas Rojas)"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                className="main-category-input"
              />
            </div>
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
                  {editingId === cat.id ? (
                    <input 
                      type="text" 
                      value={editingName} 
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleUpdate(cat.id)}
                      autoFocus
                      className="edit-category-input"
                    />
                  ) : (
                    <span>{cat.name}</span>
                  )}
                  
                  <div className="category-item-actions">
                    {editingId === cat.id ? (
                      <button 
                        onClick={() => handleUpdate(cat.id)} 
                        className="btn-save-small"
                        title="Guardar cambios"
                      >
                        <Check size={14} />
                      </button>
                    ) : (
                      <button 
                        onClick={() => startEditing(cat)} 
                        className="btn-edit-small"
                        title="Editar nombre"
                      >
                        <Edit2 size={14} />
                      </button>
                    )}
                    
                    <button 
                      onClick={() => handleDelete(cat.id)} 
                      className="btn-delete-small"
                      title="Eliminar categoría"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
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
          max-width: 480px;
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
          background: #fcfbf9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
        }
        .modal-header h2 {
          margin: 0;
          font-size: 1.25rem;
          color: #1e293b;
          font-family: inherit;
        }
        .modal-close {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          display: flex;
          transition: background 0.2s;
        }
        .modal-close:hover {
          background: rgba(0,0,0,0.05);
          color: #1e293b;
        }
        .modal-body {
          padding: 24px;
        }
        .category-add-form {
          display: flex;
          gap: 12px;
          margin-bottom: 28px;
        }
        .input-wrapper {
          flex: 1;
        }
        .main-category-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #cbd5e1; /* Borde más visible */
          border-radius: 10px;
          font-size: 0.95rem;
          transition: all 0.2s;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); /* Sombra interna para efecto "caja" */
        }
        .main-category-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(30, 77, 56, 0.1), inset 0 2px 4px rgba(0,0,0,0.05);
          outline: none;
        }
        .category-list {
          max-height: 300px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-right: 4px;
        }
        .category-list::-webkit-scrollbar {
          width: 6px;
        }
        .category-list::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .category-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.2s;
        }
        .category-item:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
        }
        .category-item span {
          font-weight: 500;
          color: #334155;
        }
        .edit-category-input {
          flex: 1;
          padding: 6px 10px;
          border: 1.5px solid var(--primary);
          border-radius: 6px;
          font-size: 0.9rem;
          margin-right: 10px;
        }
        .category-item-actions {
          display: flex;
          gap: 4px;
        }
        .btn-delete-small, .btn-edit-small, .btn-save-small {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          display: flex;
          transition: all 0.2s;
        }
        .btn-edit-small { color: #64748b; }
        .btn-edit-small:hover { background: #f1f5f9; color: #1e293b; }
        
        .btn-delete-small { color: #f87171; }
        .btn-delete-small:hover { background: #fee2e2; color: #ef4444; }
        
        .btn-save-small { color: var(--primary); }
        .btn-save-small:hover { background: var(--primary-ghost); }

        .empty-text {
          text-align: center;
          color: #94a3b8;
          padding: 30px;
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
