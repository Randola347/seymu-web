"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Leaf, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        // Handle specific errors like 429 via the result message if passed
        if (result.error.includes("429") || result.error.includes("intentos")) {
          setError("Demasiados intentos. Por favor, espera 15 minutos.");
        } else {
          setError("Credenciales incorrectas. Inténtalo de nuevo.");
        }
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      if (err?.message?.includes("429")) {
        setError("Demasiados intentos. Por favor, espera 15 minutos.");
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } finally {

      setLoading(false);
    }
  };

  return (
    <section className="admin-login-shell">
      <div className="container">
        <div className="admin-login-wrap">
          <div className="admin-login-card">

            {/* ── PANEL IZQUIERDO ── */}
            <div className="admin-login-brand">
              <div className="admin-login-brand-top">
                <div className="admin-login-brand-badge">
                  <ShieldCheck size={13} />
                  Acceso privado
                </div>

                <h1 className="admin-login-brand-title">
                  Panel <em>Seymu</em>
                </h1>

                <p className="admin-login-brand-text">
                  Gestiona el catálogo, contenido e información comercial
                  desde un entorno seguro y centralizado.
                </p>
              </div>

              <div className="admin-login-brand-bottom">
                <div className="admin-login-point">
                  <Leaf size={15} />
                  <span>Administración centralizada del catálogo</span>
                </div>
                <div className="admin-login-point">
                  <ShieldCheck size={15} />
                  <span>Acceso protegido para administradores</span>
                </div>
              </div>
            </div>

            {/* ── PANEL DERECHO ── */}
            <div className="admin-form-card admin-login-form-card">
              <div className="admin-login-form-head">
                <span className="admin-login-overline">Bienvenido</span>
                <h2 className="admin-login-title">Inicia sesión</h2>
                <p className="page-text">
                  Accede al panel para gestionar Maderas Seymu.
                </p>
              </div>

              <div className="admin-login-divider" />

              <form onSubmit={handleSubmit} className="admin-login-form" style={{ marginTop: '24px' }}>
                <div className="form-field">
                  <label htmlFor="email">Correo electrónico</label>
                  <div className="admin-input-wrap">
                    <Mail size={16} className="admin-input-icon" />
                    <input
                      id="email"
                      type="email"
                      placeholder="ejemplo@seymu.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="password">Contraseña</label>
                  <div className="admin-input-wrap">
                    <Lock size={16} className="admin-input-icon" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="admin-password-toggle"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="admin-login-error" role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="admin-login-submit"
                  disabled={loading}
                >
                  <span>{loading ? "Iniciando sesión..." : "Entrar al panel"}</span>
                  {!loading && <ArrowRight size={16} />}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}