import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function AnalysisDetailPage() {
  const { id } = useParams();
  return (
    <Layout>
      <h2 className="page-title">Análise {id}</h2>
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
