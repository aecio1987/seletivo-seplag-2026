import { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6fb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          height: "64px",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          fontWeight: 700,
          fontSize: "18px",
          color: "#0f172a", // 🔥 
        }}
      >
        <span style={{ color: "#0f172a" }}>SIGPET</span>
        <span
          style={{
            marginLeft: "10px",
            fontWeight: 400,
            color: "#475569", // 🔥 
            fontSize: "14px",
          }}
        >
          Sistema de Gestão de Pets
        </span>
      </header>

      {/* CONTEÚDO CENTRAL */}
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            backgroundColor: "#ffffff",
            padding: "32px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            color: "#0f172a", // 🔥 
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
