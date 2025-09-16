import { useState } from "react";
import Layout from "../components/Layout";

export default function BimPage() {
  const [obraData, setObraData] = useState({
    nome: "",
    localizacao: "",
    arquivo: null as File | null,
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target;

    if (name === "arquivo" && files) {
      setObraData((prev) => ({ ...prev, arquivo: files[0] }));
    } else {
      setObraData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleUpload(e: React.FormEvent) {
    e.preventDefault();

    if (!obraData.nome || !obraData.localizacao || !obraData.arquivo) {
      alert("Por favor, preencha todos os campos e selecione um arquivo.");
      return;
    }

    alert(
      `Modelo enviado!\nObra: ${obraData.nome}\nLocalização: ${obraData.localizacao}\nArquivo: ${obraData.arquivo.name}\n\nO processamento será feito no backend.`
    );
  }

  return (
    <Layout>
      <h2 className="page-title">Upload do modelo BIM (DWG)</h2>
      <div className="card bim-card">
        <form onSubmit={handleUpload} style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gap: 12 }}>
            <label>
              <div style={{ marginBottom: 6, fontWeight: 500 }}>
                Nome da Obra
              </div>
              <input
                type="text"
                name="nome"
                value={obraData.nome}
                onChange={handleInputChange}
                placeholder="Ex: Estação Vila Madalena - Linha 2"
                className="input"
                required
              />
            </label>

            <label>
              <div style={{ marginBottom: 6, fontWeight: 500 }}>
                Localização
              </div>
              <input
                type="text"
                name="localizacao"
                value={obraData.localizacao}
                onChange={handleInputChange}
                placeholder="Ex: Rua Harmonia, 500 - Vila Madalena, São Paulo - SP"
                className="input"
                required
              />
            </label>

            <label>
              <div style={{ marginBottom: 6, fontWeight: 500 }}>
                Arquivo DWG
              </div>
              <input
                type="file"
                name="arquivo"
                onChange={handleInputChange}
                className="file-input"
                accept=".dwg,.zip"
                required
              />
            </label>
          </div>

          <button type="submit">Enviar modelo</button>
        </form>

        <div style={{ marginTop: 24 }}>
          <div
            style={{
              height: 360,
              background: "var(--surface)",
              borderRadius: 8,
            }}
          />
          <span
            style={{
              color: "var(--muted-text)",
              fontSize: 14,
              marginTop: 8,
              display: "block",
            }}
          >
            Visualizador 3D será carregado aqui após o upload.
          </span>
        </div>
      </div>
    </Layout>
  );
}
