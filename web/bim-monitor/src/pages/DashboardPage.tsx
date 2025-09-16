import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function DashboardPage() {
  return (
    <Layout>
      <h2 className="page-title">Últimas análises</h2>
      <div className="grid grid-auto-cards">
        {[1, 2, 3, 4].map((i) => (
          <div className="card" key={i}>
            <div style={{ fontWeight: 600 }}>Obra Linha 1 · {`ANL-00${i}`}</div>
            <div style={{ color: "var(--muted-text)", fontSize: 12 }}>
              Comparação foto x BIM
            </div>
            <div
              style={{
                height: 140,
                background: "var(--surface)",
                borderRadius: 8,
                marginTop: 12,
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <Link to={`/analises/${i}`}>Ver detalhes</Link>
              <span style={{ fontSize: 12, color: "var(--muted-text)" }}>
                95% conformidade
              </span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
