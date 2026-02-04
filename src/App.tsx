import { useState } from "react"
import PetsPage from "./pages/PetsPage"
import MeusDadosPage from "./pages/MeusDadosPage"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"

type View = "home" | "login" | "register" | "pets" | "dados"

export default function App() {
  const [view, setView] = useState<View>("home")

  console.log("APP VIEW =>", view)

  return (
    <>
      {view === "home" && (
        <div style={{ textAlign: "center", marginTop: "120px" }}>
          <button onClick={() => setView("login")}>
            ACESSAR SISTEMA
          </button>
        </div>
      )}

      {view === "login" && (
        <LoginForm
          onSuccess={() => {
            console.log("LOGIN OK → PETS")
            setView("pets")
          }}
          onRegisterClick={() => {
            console.log("IR PARA REGISTER")
            setView("register")
          }}
        />
      )}

      {view === "register" && (
        <RegisterForm
          onRegisterSuccess={() => {
            console.log("CADASTRO OK → LOGIN")
            setView("login")
          }}
        />
      )}

      {view === "pets" && (
        <PetsPage
          onLogout={() => {
            console.log("LOGOUT → HOME")
            setView("home")
          }}
          onNavigate={(next: "pets" | "dados") => {
            console.log("NAVIGATE →", next)
            setView(next)
          }}
        />
      )}

      {view === "dados" && (
        <MeusDadosPage
          onLogout={() => {
            console.log("LOGOUT → HOME")
            setView("home")
          }}
          onNavigate={(next: "pets") => {
            console.log("NAVIGATE →", next)
            setView(next)
          }}
        />
      )}
    </>
  )
}
