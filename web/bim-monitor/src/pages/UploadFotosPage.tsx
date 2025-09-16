import Layout from "../components/Layout";

export default function UploadFotosPage() {
  function handleUpload() {
    const id = Date.now().toString();
    const history = JSON.parse(localStorage.getItem("analises") || "[]");
    const entry = {
      id,
      obra: "Linha 1",
      createdAt: new Date().toISOString(),
      conformidade: 0.95,
    };
    localStorage.setItem("analises", JSON.stringify([entry, ...history]));
    window.location.href = `/analises/${id}`;
  }
  return (
    <Layout>
      <h2 className="page-title">Upload de fotos para comparação</h2>
      <div className="card" style={{ display: "grid", gap: 12 }}>
        <input multiple type="file" className="file-input" accept="image/*" />
        <button onClick={handleUpload}>Enviar fotos</button>
        <span style={{ color: "var(--muted-text)" }}>
          As fotos serão processadas no backend.
        </span>
      </div>
    </Layout>
  );
}
