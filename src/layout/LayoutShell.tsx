import { ReactNode } from "react";

interface LayoutShellProps {
  children: ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f6f8" }}>
      
      {/* HEADER */}
      <header
        style={{
          height: "64px",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          fontWeight: 600,
          fontSize: "18px",
        }}
      >
        SIGPET
        <span style={{ marginLeft: "8px", fontWeight: 400, color: "#6b7280" }}>
          Sistema de Gestão de Pets
        </span>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <div
        style={{
          display: "flex",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px",
          gap: "24px",
        }}
      >
        {/* SIDEBAR */}
        <aside
          style={{
            width: "240px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            height: "fit-content",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <MenuItem label="Meus dados" />
            <MenuItem label="Meus pets" />
            <MenuItem label="Segurança" />
            <MenuItem label="Sair da conta" danger />
          </nav>
        </aside>

        {/* ÁREA CENTRAL */}
        <main
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

interface MenuItemProps {
  label: string;
  danger?: boolean;
}

function MenuItem({ label, danger }: MenuItemProps) {
  return (
    <button
      style={{
        textAlign: "left",
        background: "none",
        border: "none",
        padding: "10px 12px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
        color: danger ? "#dc2626" : "#111827",
        fontWeight: 500,
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor = "#f3f4f6")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      {label}
    </button>
  );
}
