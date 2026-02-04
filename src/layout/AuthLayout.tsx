import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div style={styles.page}>
      {/* Área visual / branding */}
      <aside style={styles.brand}>
        <h1 style={styles.title}>SIGPET</h1>
        <p style={styles.subtitle}>Sistema de Gestão de Pets</p>
      </aside>

      {/* Área do formulário */}
      <main style={styles.content}>
        <div style={styles.card}>{children}</div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  brand: {
    flex: 1,
    background: "linear-gradient(135deg, #ff6f00, #ff9800)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px",
  },

  title: {
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "18px",
    opacity: 0.9,
  },

  content: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "32px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
};
