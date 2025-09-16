import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-metro.png";

type LayoutProps = { children: React.ReactNode };

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Tem certeza que deseja sair?");
    if (confirmLogout) {
      window.location.href = "/login";
    }
  };

  return (
    <div>
      <header className="app-header">
        <nav className="nav">
          <div className="brand-section">
            <Link to="/dashboard">
              <img src={logo} alt="Metrô São Paulo" style={{ height: 36 }} />
            </Link>
            <strong className="brand-title">
              Monitoramento de Canteiros de Obras
            </strong>
          </div>
          <button
            className="mobile-toggle"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
          <div className={`actions ${open ? "open" : ""}`}>
            <Link to="/dashboard">Obras</Link>
            <Link to="/historico">Histórico</Link>
            <Link to="/bim">BIM</Link>
            <Link to="/upload-fotos">Fotos</Link>
            <button
              className="logout-btn"
              onClick={handleLogout}
              aria-label="Sair"
            >
              Sair
            </button>
          </div>
        </nav>
      </header>
      <main className="container-full">{children}</main>
    </div>
  );
}
