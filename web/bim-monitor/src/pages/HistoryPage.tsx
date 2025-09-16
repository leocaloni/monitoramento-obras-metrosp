import { Link } from "react-router-dom";
import Layout from "../components/Layout";

type HistoryItem = {
  id: string;
  obra: string;
  createdAt: string;
  conformidade: number;
};

export default function HistoryPage() {
  const history: HistoryItem[] = JSON.parse(
    localStorage.getItem("analises") || "[]"
  );
  return (
    <Layout>
      <h2 className="page-title">Histórico de análises</h2>
      <div className="card">
        <div
          className="grid"
          style={{ gridTemplateColumns: "1fr 240px 160px 120px" }}
        >
          <div style={{ fontWeight: 600 }}>Obra</div>
          <div style={{ fontWeight: 600 }}>Data</div>
          <div style={{ fontWeight: 600 }}>Conformidade</div>
          <div />
          {history.map((h) => (
            <>
              <div>{h.obra}</div>
              <div>{new Date(h.createdAt).toLocaleString()}</div>
              <div>{Math.round(h.conformidade * 100)}%</div>
              <div>
                <Link to={`/analises/${h.id}`}>Abrir</Link>
              </div>
            </>
          ))}
          {history.length === 0 && (
            <div style={{ gridColumn: "1 / -1", color: "var(--muted-text)" }}>
              Sem análises ainda.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
