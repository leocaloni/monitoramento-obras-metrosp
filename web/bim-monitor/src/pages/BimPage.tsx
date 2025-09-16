import Layout from "../components/Layout";

export default function BimPage() {
  function handleUpload() {
    alert("Modelo enviado! O processamento será feito no backend.");
  }
  return (
    <Layout>
      <h2 className="page-title">Upload do modelo BIM (IFC)</h2>
      <div className="card" style={{ display: "grid", gap: 12 }}>
        <input type="file" className="file-input" accept=".ifc,.zip" />
        <button onClick={handleUpload}>Enviar modelo</button>
        <div
          style={{ height: 360, background: "var(--surface)", borderRadius: 8 }}
        />
        <span style={{ color: "var(--muted-text)" }}>
          Visualizador 3D será carregado aqui.
        </span>
      </div>
    </Layout>
  );
}
