import { useState } from "react"
import { PetFacade } from "../core/pet.facade"

interface RegisterFormProps {
  onRegisterSuccess: () => void
}

export default function RegisterForm({
  onRegisterSuccess,
}: RegisterFormProps) {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem")
      return
    }

    const ok = PetFacade.register({
      tutor: nome,
      email,
      cpf: "",
      telefone: "",
      cep: "",
      endereco: "",
      numero: "",
      estado: "",
      cidade: "",
      senha,
    })

    if (!ok) {
      alert("E-mail já cadastrado")
      return
    }

    // ✅ MENSAGEM EXIGIDA
    alert("CADASTRO REALIZADO COM SUCESSO! 🚀")

    onRegisterSuccess()
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
          maxWidth: 480,
          background: "white",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        {/* TÍTULO */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h2 style={{ margin: 0, color: "#0f172a" }}>
            Criar conta
          </h2>
          <span style={{ color: "#64748b", fontSize: 14 }}>
            Cadastro de tutor
          </span>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            style={{ ...inputStyle, marginBottom: 20 }}
          />

          <button type="submit" style={primaryButtonStyle}>
            Cadastrar
          </button>
        </form>

        {/* RETORNAR */}
        <button
          onClick={onRegisterSuccess}
          style={secondaryButtonStyle}
        >
          Retornar
        </button>
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
  marginBottom: 12,
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

const secondaryButtonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 12,
  padding: "10px",
  background: "transparent",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  cursor: "pointer",
}
