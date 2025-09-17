import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function DashboardPage() {
  const obras = [
    {
      id: 1,
      nome: "Estação Vila Madalena",
      linha: "Linha 2 - Verde",
      status: "Em andamento",
      ultimaAnalise: "2024-09-15",
      ultimaAnaliseId: 5, // ID mais alto = mais recente
      conformidade: 95,
    },
    {
      id: 2,
      nome: "Estação Fradique Coutinho",
      linha: "Linha 2 - Verde",
      status: "Em andamento",
      ultimaAnalise: "2024-09-14",
      ultimaAnaliseId: 8, // ID mais alto = mais recente
      conformidade: 88,
    },
    {
      id: 3,
      nome: "Estação Sumaré",
      linha: "Linha 2 - Verde",
      status: "Concluída",
      ultimaAnalise: "2024-09-13",
      ultimaAnaliseId: 12, // ID mais alto = mais recente
      conformidade: 92,
    },
    {
      id: 4,
      nome: "Estação Clínicas",
      linha: "Linha 2 - Verde",
      status: "Em andamento",
      ultimaAnalise: "2024-09-12",
      ultimaAnaliseId: 15, // ID mais alto = mais recente
      conformidade: 97,
    },
  ];

  return (
    <Layout>
      <h2 className="page-title">Obras em Monitoramento</h2>
      <div className="grid grid-auto-cards">
        {obras.map((obra) => (
          <div className="card" key={obra.id}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{obra.nome}</div>
            <div
              style={{
                color: "var(--muted-text)",
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              {obra.linha}
            </div>
            <div
              style={{
                height: 140,
                background: "var(--surface)",
                borderRadius: 8,
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--muted-text)",
                fontSize: 14,
              }}
            >
              Modelo BIM da Obra
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 500,
                  backgroundColor:
                    obra.status === "Concluída" ? "#d4edda" : "#fff3cd",
                  color: obra.status === "Concluída" ? "#155724" : "#856404",
                }}
              >
                {obra.status}
              </span>
              <span style={{ fontSize: 11, color: "var(--muted-text)" }}>
                Última análise: {obra.ultimaAnalise}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Link to={`/obras/${obra.id}`}>Ver análises</Link>
              <Link
                to={`/upload-fotos?obra=${encodeURIComponent(
                  obra.nome
                )}&endereco=${encodeURIComponent(obra.linha)}`}
                style={{
                  backgroundColor: "#001489",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                Nova Análise
              </Link>
              <span style={{ fontSize: 12, color: "var(--muted-text)" }}>
                {obra.conformidade}% conformidade
              </span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
