import { useEffect, useState } from "react"
import AppLayout from "../layout/AppLayout"
import { PetFacade } from "../core/pet.facade"
import type { Tutor } from "../core/pet.facade"

interface Props {
  onLogout: () => void
}

export default function MeusDadosPage({ onLogout }: Props) {
  const [tutor, setTutor] = useState<Tutor | null>(null)

  useEffect(() => {
    const data = PetFacade.getTutorData()
    setTutor(data)
  }, [])

  if (!tutor) {
    return (
      <AppLayout title="Meus dados" onLogout={onLogout}>
        <p>Nenhum dado encontrado.</p>
      </AppLayout>
    )
  }

  return (
    <AppLayout title="Meus dados" onLogout={onLogout}>
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
          maxWidth: 520,
        }}
      >
        <Campo label="Nome" valor={tutor.tutor} />
        <Campo label="E-mail" valor={tutor.email} />
        <Campo label="CPF" valor={tutor.cpf} />
        <Campo label="Telefone" valor={tutor.telefone} />
        <Campo label="CEP" valor={tutor.cep} />
        <Campo label="Endereço" valor={`${tutor.endereco}, ${tutor.numero}`} />
        <Campo label="Cidade" valor={`${tutor.cidade} / ${tutor.estado}`} />
      </div>
    </AppLayout>
  )
}

function Campo({ label, valor }: { label: string; valor: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <strong style={{ display: "block", fontSize: 13, color: "#64748b" }}>
        {label}
      </strong>
      <div style={{ fontSize: 15, color: "#0f172a" }}>{valor}</div>
    </div>
  )
}
