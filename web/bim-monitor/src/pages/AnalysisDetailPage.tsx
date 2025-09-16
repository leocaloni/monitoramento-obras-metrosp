import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function AnalysisDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const analiseId = parseInt(id || "1");

  // Verifica de onde o usuário veio
  const from = searchParams.get("from");
  const isFromHistory = from === "history";

  // Simulação de mapeamento análise -> obra
  // No backend real, isso seria obtido da API da análise
  const getObraFromAnalise = (analiseId: number) => {
    if (analiseId <= 5) return 1; // Vila Madalena
    if (analiseId <= 8) return 2; // Fradique Coutinho
    if (analiseId <= 12) return 3; // Sumaré
    return 4; // Clínicas
  };

  const obraId = getObraFromAnalise(analiseId);

  // Função para voltar
  const handleGoBack = () => {
    if (isFromHistory) {
      navigate("/historico");
    } else {
      navigate(`/obras/${obraId}`);
    }
  };

  const backButtonText = isFromHistory
    ? "← Voltar para histórico"
    : "← Voltar para todas as análises da obra";

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={handleGoBack}
          style={{
            background: "none",
            border: "none",
            color: "var(--muted-text)",
            fontSize: 14,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            padding: 0,
            fontFamily: "inherit",
          }}
        >
          {backButtonText}
        </button>
      </div>

      <h2 className="page-title">
        Análise #{analiseId.toString().padStart(3, "0")}
      </h2>
      <div className="grid grid-two">
        <div className="card">
          <div style={{ marginBottom: 8, fontWeight: 600 }}>Foto</div>
          <div
            style={{
              height: 360,
              background:
                "linear-gradient(135deg, #e5e7eb 25%, #fff 25%, #fff 50%, #e5e7eb 50%, #e5e7eb 75%, #fff 75%, #fff 100%)",
              backgroundSize: "24px 24px",
              borderRadius: 8,
            }}
          />
        </div>
        <div className="card">
          <div style={{ marginBottom: 8, fontWeight: 600 }}>Modelo BIM</div>
          <div
            style={{
              height: 360,
              background: "var(--surface)",
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
            }}
          >
            <span style={{ color: "var(--muted-text)" }}>Canvas 3D</span>
          </div>
        </div>
        <div className="card" style={{ gridColumn: "1 / -1" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong>Resultado da IA</strong>
            <span style={{ color: "var(--muted-text)" }}>
              Conformidade estimada: 95%
            </span>
          </div>
          <div style={{ marginTop: 12, color: "var(--muted-text)" }}>
            Regiões destacadas representam divergências entre a foto e o modelo
            BIM.
          </div>
        </div>
      </div>
    </Layout>
  );
}
