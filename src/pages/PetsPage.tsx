import { useEffect, useState } from "react"
import AppLayout from "../layout/AppLayout"
import PetForm from "../components/PetForm"
import { PetFacade } from "../core/pet.facade"
import type { Pet } from "../core/pet.facade"

interface Props {
  onLogout: () => void
}

export default function PetsPage({ onLogout }: Props) {
  const [pets, setPets] = useState<Pet[]>([])
  const [mostrarForm, setMostrarForm] = useState(false)
  const [petEditando, setPetEditando] = useState<Pet | null>(null)

  useEffect(() => {
    PetFacade.init()
    const sub = PetFacade.pets$.subscribe(setPets)
    return () => sub.unsubscribe()
  }, [])

  function handleNovoPet() {
    setPetEditando(null)
    setMostrarForm(true)
  }

  function handleEditarPet(pet: Pet) {
    setPetEditando(pet)
    setMostrarForm(true)
  }

  function handleFecharForm() {
    setPetEditando(null)
    setMostrarForm(false)
  }

  function handleExcluirPet(pet: Pet) {
    const ok = confirm(`Excluir o pet "${pet.nome}"?`)
    if (!ok || !pet.id) return

    PetFacade.deletePet(pet.id)
  }

  return (
    <AppLayout title="Meus Pets" onLogout={onLogout}>
      <button
        onClick={handleNovoPet}
        style={{ marginBottom: 16 }}
      >
        Adicionar pet
      </button>

      {mostrarForm && (
        <PetForm
          petEditando={petEditando}
          onFinishEdit={handleFecharForm}
        />
      )}

      <div>
        {pets.map(pet => (
          <div
            key={pet.id}
            style={{
              padding: "12px",
              marginBottom: "8px",
              borderRadius: "8px",
              background: "#f8fafc",
              color: "#0f172a",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* ⬇️ BLOCO VISUAL DO PET */}
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {pet.foto && (
                <img
                  src={pet.foto}
                  alt={`Foto do pet ${pet.nome}`}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />
              )}

              <div>
                <strong>
                  {pet.emoji} {pet.nome}
                </strong>
                <div>
                  {pet.especie} • {pet.raca}
                </div>

                {(pet.idadeAnos !== undefined ||
                  pet.idadeMeses !== undefined) && (
                  <div style={{ fontSize: 14, color: "#475569" }}>
                    {pet.idadeAnos ?? 0} ano(s)
                    {pet.idadeMeses !== undefined &&
                      ` e ${pet.idadeMeses} mês(es)`}
                  </div>
                )}
              </div>
            </div>

            {/* ⬇️ AÇÕES */}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => handleEditarPet(pet)}>
                Editar
              </button>

              <button
                onClick={() => handleExcluirPet(pet)}
                style={{ color: "#dc2626" }}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
