import { useState } from "react"
import { PetFacade } from "../core/pet.facade"

interface LoginFormProps {
  onSuccess: () => void
  onRegisterClick: () => void
}

export default function LoginForm({
  onSuccess,
  onRegisterClick,
}: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const ok = PetFacade.login(email, senha)

    if (!ok) {
      alert("Credenciais inválidas")
      return
    }

    onSuccess()
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "white",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        {/* LOGO / TÍTULO */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h2 style={{ margin: 0, color: "#0f172a" }}>SIGPET</h2>
          <span style={{ color: "#64748b", fontSize: 14 }}>
            Sistema de Gestão de Pets
          </span>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <input
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button type="submit" style={primaryButtonStyle}>
            Entrar
          </button>
        </form>

        {/* CADASTRO */}
        <p
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: 14,
            color: "#2563eb",
            cursor: "pointer",
          }}
          onClick={onRegisterClick}
        >
          Não tem conta? <strong>Cadastre-se</strong>
        </p>
      </div>
    </div>
  )
}

/* ===================== */
/* STYLES */
/* ===================== */

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: 14,
  outline: "none",
}

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  background: "#0f172a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
}
