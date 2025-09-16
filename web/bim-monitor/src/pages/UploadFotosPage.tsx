import { useState } from "react";
import Layout from "../components/Layout";

export default function UploadFotosPage() {
  const [fotoData, setFotoData] = useState({
    obra: "",
    descricao: "",
    fotos: null as FileList | null,
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target;

    if (name === "fotos" && files) {
      setFotoData((prev) => ({ ...prev, fotos: files }));
    } else {
      setFotoData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleUpload(e: React.FormEvent) {
    e.preventDefault();

    if (!fotoData.obra || !fotoData.descricao || !fotoData.fotos) {
      alert("Por favor, preencha todos os campos e selecione as fotos.");
      return;
    }

    const id = Date.now().toString();
    const history = JSON.parse(localStorage.getItem("analises") || "[]");
    const entry = {
      id,
      obra: fotoData.obra,
      createdAt: new Date().toISOString(),
      conformidade: 0.95,
    };
    localStorage.setItem("analises", JSON.stringify([entry, ...history]));
    window.location.href = `/analises/${id}`;
  }

  return (
    <Layout>
      <h2 className="page-title">Upload de fotos para comparação</h2>
      <div className="card fotos-card">
        <form onSubmit={handleUpload} style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gap: 12 }}>
            <label>
              <div style={{ marginBottom: 6, fontWeight: 500 }}>
                Nome da Obra
              </div>
              <input
                type="text"
                name="obra"
                value={fotoData.obra}
                onChange={handleInputChange}
                placeholder="Ex: Estação Vila Madalena - Linha 2"
                className="input"
                required
              />
            </label>

            <label>
              <div style={{ marginBottom: 6, fontWeight: 500 }}>
                Descrição da Análise
              </div>
              <input
                type="text"
                name="descricao"
                value={fotoData.descricao}
                onChange={handleInputChange}
                placeholder="Ex: Verificação de conformidade estrutural"
                className="input"
                required
              />
            </label>

            <label>
              <div style={{ marginBottom: 6, fontWeight: 500 }}>Fotos</div>
              <input
                multiple
                type="file"
                name="fotos"
                onChange={handleInputChange}
                className="file-input"
                accept="image/*"
                required
              />
            </label>
          </div>

          <button type="submit">Enviar fotos</button>
        </form>

        <div style={{ marginTop: 16 }}>
          <span style={{ color: "var(--muted-text)", fontSize: 14 }}>
            As fotos serão processadas no backend para comparação com o modelo
            BIM.
          </span>
        </div>
      </div>
    </Layout>
  );
}
