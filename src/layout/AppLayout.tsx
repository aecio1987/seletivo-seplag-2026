import { useEffect, useState } from "react"
import { PetFacade } from "../core/pet.facade"
import type { Tutor } from "../core/pet.facade"

interface AppLayoutProps {
  title?: string
  onLogout: () => void
  children: React.ReactNode
}

type View = "pets" | "dados" | "seguranca"

export default function AppLayout({
  title = "SIGPET - Sistema de Gestão de Pets",
  onLogout,
  children,
}: AppLayoutProps) {
  const [view, setView] = useState<View>("pets")
  const [tutor, setTutor] = useState<Tutor | null>(null)
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState<any>({})
  const [erros, setErros] = useState<Record<string, string>>({})

  const [mensagem, setMensagem] = useState<string | null>(null)
  const [tipoMensagem, setTipoMensagem] =
    useState<"erro" | "sucesso" | null>(null)

  useEffect(() => {
    if (view === "dados" || view === "seguranca") {
      const data = PetFacade.getTutorData()
      setTutor(data)
      setForm({})
      setEditando(false)
      setMensagem(null)
      setTipoMensagem(null)
      setErros({})
    }
  }, [view])

  function salvarDados() {
    const novosErros: Record<string, string> = {}

    if (form.cpf && !cpfValido(form.cpf)) {
      novosErros.cpf = "CPF inválido"
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      setMensagem("Corrija os campos destacados.")
      setTipoMensagem("erro")
      return
    }

    PetFacade.updateTutor(form)
    setTutor(PetFacade.getTutorData())
    setEditando(false)
    setErros({})
    setMensagem("Dados atualizados com sucesso.")
    setTipoMensagem("sucesso")
  }

  async function buscarCEP(cep: string) {
    const cepLimpo = cep.replace(/\D/g, "")
    if (cepLimpo.length !== 8) return

    try {
      const res = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      )
      const data = await res.json()

      if (data.erro) {
        setErros(prev => ({ ...prev, cep: "CEP não encontrado" }))
        setMensagem("CEP não encontrado.")
        setTipoMensagem("erro")
        return
      }

      setErros(prev => ({ ...prev, cep: "" }))
      setForm((prev: any) => ({
        ...prev,
        endereco: data.logradouro || prev.endereco,
        cidade: data.localidade || prev.cidade,
        estado: data.uf || prev.estado,
      }))
    } catch {
      setMensagem("Erro ao buscar o CEP.")
      setTipoMensagem("erro")
    }
  }

  function mascaraCPF(valor: string) {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14)
  }

  function cpfValido(cpf: string) {
    cpf = cpf.replace(/\D/g, "")
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false

    let soma = 0
    for (let i = 0; i < 9; i++) soma += +cpf[i] * (10 - i)
    let resto = (soma * 10) % 11
    if (resto === 10) resto = 0
    if (resto !== +cpf[9]) return false

    soma = 0
    for (let i = 0; i < 10; i++) soma += +cpf[i] * (11 - i)
    resto = (soma * 10) % 11
    if (resto === 10) resto = 0
    return resto === +cpf[10]
  }

  function salvarNovaSenha() {
    const { senhaAtual, novaSenha, confirmarSenha } = form
    const novosErros: Record<string, string> = {}

    if (!senhaAtual) novosErros.senhaAtual = "Obrigatório"
    if (!novaSenha) novosErros.novaSenha = "Obrigatório"
    if (!confirmarSenha)
      novosErros.confirmarSenha = "Obrigatório"
    if (
      novaSenha &&
      confirmarSenha &&
      novaSenha !== confirmarSenha
    ) {
      novosErros.confirmarSenha = "Senhas não coincidem"
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      setMensagem("Corrija os campos destacados.")
      setTipoMensagem("erro")
      return
    }

    const ok = PetFacade.updatePassword(
      senhaAtual,
      novaSenha
    )
    if (!ok) {
      setMensagem("Senha atual incorreta.")
      setTipoMensagem("erro")
      return
    }

    setMensagem("Senha alterada com sucesso.")
    setTipoMensagem("sucesso")
    setForm({})
    setErros({})
  }

  const erroStyle = (campo: string) =>
    erros[campo]
      ? {
          border: "1px solid #ef4444",
          background: "#fef2f2",
          color: "#0f172a",
        }
      : {
          color: "#0f172a",
          background: "#ffffff",
        }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <aside
        style={{
          width: 260,
          background: "#0f172a",
          color: "white",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <h2 style={{ margin: 0, color: "#38bdf8" }}>
          SIGPET
        </h2>

        <nav aria-label="Menu principal">
          <button
            onClick={() => setView("pets")}
            style={menuButtonStyle(view === "pets")}
          >
            🐾 Meus Pets
          </button>
          <button
            onClick={() => setView("dados")}
            style={menuButtonStyle(view === "dados")}
          >
            👤 Meus Dados
          </button>
          <button
            onClick={() => setView("seguranca")}
            style={menuButtonStyle(view === "seguranca")}
          >
            🔒 Segurança
          </button>
        </nav>

        <button
          onClick={onLogout}
          style={{
            marginTop: "auto",
            padding: 10,
            background: "#ef4444",
            border: "none",
            borderRadius: 8,
            color: "white",
            fontWeight: "bold",
          }}
        >
          Sair
        </button>
      </aside>

      <main
        style={{
          flex: 1,
          padding: 40,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 1100 }}>
          <h1 style={{ marginBottom: 24, color: "#0f172a" }}>
            {view === "pets" && "Meus Pets"}
            {view === "dados" && "Meus Dados"}
            {view === "seguranca" && "Segurança"}
          </h1>

          {view === "pets" && children}

          {(view === "dados" || view === "seguranca") &&
            mensagem && (
              <div
                style={{
                  marginBottom: 12,
                  padding: 10,
                  borderRadius: 6,
                  background:
                    tipoMensagem === "erro"
                      ? "#fee2e2"
                      : "#dcfce7",
                  color: "#0f172a",
                }}
              >
                {mensagem}
              </div>
            )}

          {view === "dados" && tutor && (
            <div
              style={{
                background: "#ffffff",
                padding: 24,
                borderRadius: 12,
                color: "#0f172a",
              }}
            >
              {[
                ["Nome", "tutor"],
                ["Email", "email"],
                ["Telefone", "telefone"],
                ["CPF", "cpf"],
                ["CEP", "cep"],
                ["Endereço", "endereco"],
                ["Número", "numero"],
                ["Cidade", "cidade"],
                ["Estado", "estado"],
              ].map(([label, key]) => (
                <div key={key} style={{ marginBottom: 10 }}>
                  <label>
                    <strong>{label}:</strong>
                  </label>{" "}
                  {editando ? (
                    <input
                      value={
                        key === "cpf"
                          ? mascaraCPF(
                              form.cpf ?? tutor.cpf ?? ""
                            )
                          : form[key] ??
                            (tutor as any)[key] ??
                            ""
                      }
                      onChange={e =>
                        setForm({
                          ...form,
                          [key]:
                            key === "cpf"
                              ? mascaraCPF(e.target.value)
                              : e.target.value,
                        })
                      }
                      onBlur={() =>
                        key === "cep" &&
                        buscarCEP(form.cep || "")
                      }
                      style={{
                        marginLeft: 6,
                        padding: 4,
                        background: "#ffffff",
                        color: "#0f172a",
                        ...erroStyle(key),
                      }}
                    />
                  ) : (
                    <span style={{ color: "#0f172a" }}>
                      {" "}
                      {(tutor as any)[key] || "—"}
                    </span>
                  )}
                </div>
              ))}

              {!editando ? (
                <button
                  style={botaoPrimario}
                  onClick={() => setEditando(true)}
                >
                  Editar Meus Dados
                </button>
              ) : (
                <>
                  <button
                    style={botaoPrimario}
                    onClick={salvarDados}
                  >
                    Salvar
                  </button>
                  <button
                    style={{
                      ...botaoPrimario,
                      background: "#64748b",
                    }}
                    onClick={() => setEditando(false)}
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          )}

          {view === "seguranca" && (
            <div
              style={{
                background: "#ffffff",
                padding: 24,
                borderRadius: 12,
                maxWidth: 500,
                color: "#0f172a",
              }}
            >
              <input
                type="password"
                placeholder="Senha atual"
                value={form.senhaAtual || ""}
                onChange={e =>
                  setForm({
                    ...form,
                    senhaAtual: e.target.value,
                  })
                }
                style={{
                  ...inputStyle,
                  background: "#ffffff",
                  color: "#0f172a",
                  ...erroStyle("senhaAtual"),
                }}
              />
              <input
                type="password"
                placeholder="Nova senha"
                value={form.novaSenha || ""}
                onChange={e =>
                  setForm({
                    ...form,
                    novaSenha: e.target.value,
                  })
                }
                style={{
                  ...inputStyle,
                  background: "#ffffff",
                  color: "#0f172a",
                  ...erroStyle("novaSenha"),
                }}
              />
              <input
                type="password"
                placeholder="Confirmar nova senha"
                value={form.confirmarSenha || ""}
                onChange={e =>
                  setForm({
                    ...form,
                    confirmarSenha: e.target.value,
                  })
                }
                style={{
                  ...inputStyle,
                  background: "#ffffff",
                  color: "#0f172a",
                  ...erroStyle("confirmarSenha"),
                }}
              />

              <button
                style={botaoPrimario}
                onClick={salvarNovaSenha}
              >
                Salvar nova senha
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

const botaoPrimario = {
  marginTop: 16,
  marginRight: 8,
  padding: "8px 16px",
  borderRadius: 8,
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: 8,
  marginBottom: 6,
  borderRadius: 6,
  border: "1px solid #cbd5f5",
}

function menuButtonStyle(active: boolean): React.CSSProperties {
  return {
    padding: "10px 14px",
    background: active ? "#1e293b" : "transparent",
    color: "white",
    border: "1px solid #334155",
    borderRadius: 8,
    cursor: "pointer",
    textAlign: "left",
    fontWeight: active ? "bold" : "normal",
  }
}
