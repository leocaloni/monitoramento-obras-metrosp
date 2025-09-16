import { Link } from "react-router-dom";
import Layout from "../components/Layout";

type HistoryItem = {
  id: string;
  obra: string;
  createdAt: string;
  conformidade: number;
};

export default function HistoryPage() {
  // Dados de exemplo para o histórico (ordenados por data decrescente)
  const exampleHistory: HistoryItem[] = [
    {
      id: "5", // Vila Madalena - análise mais recente
      obra: "Estação Vila Madalena - Linha 2",
      createdAt: "2024-09-15T14:30:00.000Z",
      conformidade: 0.95,
    },
    {
      id: "8", // Fradique Coutinho - análise mais recente
      obra: "Estação Fradique Coutinho - Linha 2",
      createdAt: "2024-09-14T10:15:00.000Z",
      conformidade: 0.88,
    },
    {
      id: "12", // Sumaré - análise mais recente
      obra: "Estação Sumaré - Linha 2",
      createdAt: "2024-09-13T16:45:00.000Z",
      conformidade: 0.92,
    },
    {
      id: "15", // Clínicas - análise mais recente
      obra: "Estação Clínicas - Linha 2",
      createdAt: "2024-09-12T09:20:00.000Z",
      conformidade: 0.97,
    },
    {
      id: "4", // Vila Madalena - análise anterior
      obra: "Estação Vila Madalena - Linha 2",
      createdAt: "2024-09-10T11:30:00.000Z",
      conformidade: 0.92,
    },
    {
      id: "11", // Sumaré - análise anterior
      obra: "Estação Sumaré - Linha 2",
      createdAt: "2024-09-08T15:45:00.000Z",
      conformidade: 0.89,
    },
    {
      id: "7", // Fradique Coutinho - análise anterior
      obra: "Estação Fradique Coutinho - Linha 2",
      createdAt: "2024-09-05T13:20:00.000Z",
      conformidade: 0.85,
    },
    {
      id: "3", // Vila Madalena - análise mais antiga
      obra: "Estação Vila Madalena - Linha 2",
      createdAt: "2024-09-02T10:15:00.000Z",
      conformidade: 0.88,
    },
  ];

  const storedHistory: HistoryItem[] = JSON.parse(
    localStorage.getItem("analises") || "[]"
  );

  // Combina dados do localStorage com exemplos, removendo duplicatas por ID
  const allHistory = [...storedHistory];
  exampleHistory.forEach((example) => {
    if (!allHistory.find((item) => item.id === example.id)) {
      allHistory.push(example);
    }
  });

  // Ordena por data mais recente primeiro
  const history = allHistory.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
    <Layout>
      <h2 className="page-title">Histórico de análises</h2>
      <div className="card history-card">
        <div className="history-table">
          <div className="history-header">
            <div className="history-cell obra">Obra</div>
            <div className="history-cell data">Data</div>
            <div className="history-cell conformidade">Conformidade</div>
          </div>

          {history.map((h) => (
            <div key={h.id} className="history-row">
              <div className="history-cell obra">
                <Link
                  to={`/analises/${h.id}?from=history`}
                  className="obra-link"
                >
                  {h.obra}
                </Link>
              </div>
              <div className="history-cell data">
                {new Date(h.createdAt).toLocaleString()}
              </div>
              <div className="history-cell conformidade">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, minWidth: "35px" }}>
                    {Math.round(h.conformidade * 100)}%
                  </span>
                  <div
                    style={{
                      width: 50,
                      height: 6,
                      backgroundColor: "#e5e7eb",
                      borderRadius: 3,
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.round(h.conformidade * 100)}%`,
                        height: "100%",
                        backgroundColor:
                          h.conformidade >= 0.9
                            ? "#10b981"
                            : h.conformidade >= 0.7
                            ? "#f59e0b"
                            : "#ef4444",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
