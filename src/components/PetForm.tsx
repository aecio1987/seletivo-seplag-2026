import { useEffect, useState } from "react"
import type { Pet } from "../core/pet.facade"
import { PetFacade } from "../core/pet.facade"

interface Props {
  petEditando?: Pet | null
  onFinishEdit?: () => void
}

export default function PetForm({ petEditando, onFinishEdit }: Props) {
  const [nome, setNome] = useState("")
  const [especie, setEspecie] = useState("")
  const [raca, setRaca] = useState("")
  const [emoji, setEmoji] = useState("🐶")
  const [mensagem, setMensagem] = useState("")

  useEffect(() => {
    if (petEditando) {
      setNome(petEditando.nome)
      setEspecie(petEditando.especie)
      setRaca(petEditando.raca)
      setEmoji(petEditando.emoji || "🐶")
    }
  }, [petEditando])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nome || !especie) return

    if (petEditando?.id) {
      PetFacade.updatePet(petEditando.id, {
        nome,
        especie,
        raca,
        emoji,
      })
      setMensagem("Pet atualizado com sucesso ✅")
      onFinishEdit?.()
    } else {
      PetFacade.addPet({
        nome,
        especie,
        raca,
        emoji,
      })
      setMensagem("Pet cadastrado com sucesso ✅")
    }

    setNome("")
    setEspecie("")
    setRaca("")
    setEmoji("🐶")

    setTimeout(() => setMensagem(""), 3000)
  }

  const formularioInvalido = !nome || !especie

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "16px 20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
        }}
      >
        <h3 style={{ marginBottom: 12 }}>
          {petEditando ? "Editar pet" : "Adicionar novo pet"}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 22 }}>{emoji}</span>

          <input
            placeholder="Nome do pet"
            value={nome}
            onChange={e => setNome(e.target.value)}
            style={{ flex: 1, minWidth: 160 }}
          />

          <select
            value={especie}
            onChange={e => setEspecie(e.target.value)}
          >
            <option value="">Espécie</option>
            <option value="Cão">Cão</option>
            <option value="Gato">Gato</option>
            <option value="Outro">Outro</option>
          </select>

          <input
            placeholder="Raça"
            value={raca}
            onChange={e => setRaca(e.target.value)}
            style={{ minWidth: 140 }}
          />

          <select
            value={emoji}
            onChange={e => setEmoji(e.target.value)}
          >
            <option value="🐶">🐶</option>
            <option value="🐱">🐱</option>
            <option value="🐾">🐾</option>
          </select>

          <button
            type="submit"
            disabled={formularioInvalido}
            style={{
              opacity: formularioInvalido ? 0.5 : 1,
              cursor: formularioInvalido ? "not-allowed" : "pointer",
            }}
          >
            {petEditando ? "Salvar" : "Adicionar"}
          </button>

          {onFinishEdit && (
            <button
              type="button"
              onClick={onFinishEdit}
              style={{
                background: "transparent",
                border: "1px solid #cbd5e1",
              }}
            >
              Cancelar
            </button>
          )}
        </div>

        {mensagem && (
          <div
            style={{
              marginTop: 12,
              color: "#16a34a",
              fontSize: 14,
            }}
          >
            {mensagem}
          </div>
        )}
      </div>
    </form>
  )
}
