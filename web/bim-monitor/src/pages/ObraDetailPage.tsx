import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function ObraDetailPage() {
  const { id } = useParams();

  const obra = {
    id: parseInt(id || "1"),
    nome: "Estação Vila Madalena",
    linha: "Linha 2 - Verde",
    status: "Em andamento",
    localizacao: "Rua Harmonia, 500 - Vila Madalena, São Paulo - SP",
  };

  const todasAnalises = [
    {
      id: 1,
      data: "2024-08-25",
      tipo: "Comparação foto x BIM",
      conformidade: 85,
      status: "Concluída",
    },
    {
      id: 2,
      data: "2024-08-30",
      tipo: "Comparação foto x BIM",
      conformidade: 90,
      status: "Concluída",
    },
    {
      id: 3,
      data: "2024-09-05",
      tipo: "Comparação foto x BIM",
      conformidade: 88,
      status: "Concluída",
    },
    {
      id: 4,
      data: "2024-09-10",
      tipo: "Comparação foto x BIM",
      conformidade: 92,
      status: "Concluída",
    },
    {
      id: 5,
      data: "2024-09-15",
      tipo: "Comparação foto x BIM",
      conformidade: 95,
      status: "Concluída",
    },
  ];

  // Análise mais recente = maior ID
  const analiseRecente = todasAnalises[todasAnalises.length - 1];

  // Análises antigas = todas exceto a mais recente, em ordem decrescente
  const analisesAntigas = todasAnalises.slice(0, -1).reverse();

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <Link
          to="/dashboard"
          style={{ color: "var(--muted-text)", fontSize: 14 }}
        >
          ← Voltar para Obras
        </Link>
      </div>

      <div style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0, marginBottom: 8 }}>{obra.nome}</h1>
        <div style={{ color: "var(--muted-text)", marginBottom: 4 }}>
          {obra.linha}
        </div>
        <div style={{ color: "var(--muted-text)", fontSize: 14 }}>
          {obra.localizacao}
        </div>
        <span
          style={{
            display: "inline-block",
            marginTop: 8,
            padding: "4px 12px",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 500,
            backgroundColor:
              obra.status === "Concluída" ? "#d4edda" : "#fff3cd",
            color: obra.status === "Concluída" ? "#155724" : "#856404",
          }}
        >
          {obra.status}
        </span>
      </div>

      {/* Análise Mais Recente */}
      <section style={{ marginBottom: 32 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h2 style={{ margin: 0 }}>Análise Mais Recente</h2>
          <Link
            to={`/upload-fotos?obra=${encodeURIComponent(
              obra.nome
            )}&endereco=${encodeURIComponent(obra.linha)}`}
            style={{
              backgroundColor: "#001489",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Nova Análise
          </Link>
        </div>
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 12,
            }}
          >
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>
                Análise #{analiseRecente.id.toString().padStart(3, "0")}
              </div>
              <div style={{ color: "var(--muted-text)", fontSize: 12 }}>
                {analiseRecente.tipo} • {analiseRecente.data}
              </div>
            </div>
            <span
              style={{
                padding: "4px 8px",
                borderRadius: 4,
                fontSize: 11,
                fontWeight: 500,
                backgroundColor: "#d4edda",
                color: "#155724",
              }}
            >
              {analiseRecente.status}
            </span>
          </div>

          <div
            style={{
              height: 200,
              background: "var(--surface)",
              borderRadius: 8,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--muted-text)",
            }}
          >
            Visualização da Análise
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to={`/analises/${analiseRecente.id}`}>
              Ver detalhes completos
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>
                {analiseRecente.conformidade}% conformidade
              </span>
              <div
                style={{
                  width: 60,
                  height: 8,
                  backgroundColor: "#e5e7eb",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${analiseRecente.conformidade}%`,
                    height: "100%",
                    backgroundColor:
                      analiseRecente.conformidade >= 90
                        ? "#10b981"
                        : analiseRecente.conformidade >= 70
                        ? "#f59e0b"
                        : "#ef4444",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Análises Anteriores */}
      <section>
        <h2 style={{ marginBottom: 16 }}>Análises Anteriores</h2>
        <div style={{ display: "grid", gap: 16 }}>
          {analisesAntigas.map((analise) => (
            <div key={analise.id} className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>
                    Análise #{analise.id.toString().padStart(3, "0")}
                  </div>
                  <div style={{ color: "var(--muted-text)", fontSize: 12 }}>
                    {analise.tipo} • {analise.data}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span style={{ fontSize: 14 }}>
                      {analise.conformidade}%
                    </span>
                    <div
                      style={{
                        width: 40,
                        height: 6,
                        backgroundColor: "#e5e7eb",
                        borderRadius: 3,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${analise.conformidade}%`,
                          height: "100%",
                          backgroundColor:
                            analise.conformidade >= 90
                              ? "#10b981"
                              : analise.conformidade >= 70
                              ? "#f59e0b"
                              : "#ef4444",
                        }}
                      />
                    </div>
                  </div>

                  <Link to={`/analises/${analise.id}`} style={{ fontSize: 14 }}>
                    Ver detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
