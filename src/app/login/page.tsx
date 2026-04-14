"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciales incorrectas. Inténtalo de nuevo.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-section" style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}>
      <div className="container" style={{ maxWidth: "450px" }}>
        <div className="admin-form-card" style={{ padding: "2.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 className="page-title">Bienvenido, Admin</h1>
            <p className="page-text">Inicia sesión para gestionar Seymu</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="ejemplo@seymu.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div style={{ 
                background: "var(--error-bg)", 
                color: "var(--error-text)", 
                padding: "0.8rem", 
                borderRadius: "10px", 
                fontSize: "0.9rem",
                marginBottom: "1.5rem",
                textAlign: "center",
                fontWeight: "600"
              }}>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: "100%", marginTop: "1rem" }}
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Entrar al panel"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
