import { useState } from "react";
import Layout from "../components/Layout";

export default function NovaObraPage() {
  const [obraData, setObraData] = useState({
    nome: "",
    endereco: "",
    arquivo: null as File | null,
  });

  const [hasSelectedFile, setHasSelectedFile] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target;

    if (name === "arquivo" && files) {
      setHasSelectedFile(true);
      setObraData((prev) => ({ ...prev, arquivo: files[0] }));
    } else {
      setObraData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function removeFile() {
    setObraData((prev) => ({ ...prev, arquivo: null }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!obraData.nome || !obraData.endereco || !obraData.arquivo) {
      alert("Por favor, preencha todos os campos e selecione um arquivo.");
      return;
    }

    alert(
      `Nova obra cadastrada!\nNome: ${obraData.nome}\nEndereço: ${obraData.endereco}\nArquivo: ${obraData.arquivo.name}\n\nO processamento será feito no backend.`
    );

    // Limpar formulário após envio
    setObraData({
      nome: "",
      endereco: "",
      arquivo: null,
    });
  }

  return (
    <Layout>
      <h2 className="page-title">Cadastrar Nova Obra</h2>
      <div className="card bim-card">
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
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
              <div style={{ marginBottom: 6, fontWeight: 500 }}>Endereço</div>
              <input
                type="text"
                name="endereco"
                value={obraData.endereco}
                onChange={handleInputChange}
                placeholder="Ex: Rua Harmonia, 500 - Vila Madalena, São Paulo - SP"
                className="input"
                required
              />
            </label>

            <div>
              <div style={{ marginBottom: 6, fontWeight: 500 }}>
                Arquivo BIM (DWG)
              </div>

              {!hasSelectedFile || !obraData.arquivo ? (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    document.getElementById("hidden-file-input")?.click();
                  }}
                  style={{
                    border: "2px dashed #cbd5e1",
                    borderRadius: "8px",
                    padding: "40px 20px",
                    textAlign: "center",
                    backgroundColor: "#f8fafc",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#001489";
                    e.currentTarget.style.backgroundColor = "#f1f5f9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.backgroundColor = "#f8fafc";
                  }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "12px" }}>
                    🏗️
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Clique para selecionar arquivo BIM
                  </div>
                  <div style={{ fontSize: "14px", color: "#6b7280" }}>
                    DWG ou ZIP • Arquivo único
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "16px",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div style={{ fontSize: "24px" }}>📄</div>
                    <div>
                      <div style={{ fontWeight: "500", fontSize: "14px" }}>
                        {obraData.arquivo.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>
                        {(obraData.arquivo.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("hidden-file-input")?.click()
                      }
                      style={{
                        padding: "6px 12px",
                        fontSize: "12px",
                        color: "#374151",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        backgroundColor: "white",
                        cursor: "pointer",
                      }}
                    >
                      Trocar
                    </button>
                    <button
                      type="button"
                      onClick={removeFile}
                      style={{
                        padding: "6px 8px",
                        fontSize: "12px",
                        border: "1px solid #ef4444",
                        borderRadius: "4px",
                        backgroundColor: "#fef2f2",
                        color: "#dc2626",
                        cursor: "pointer",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              <input
                id="hidden-file-input"
                type="file"
                name="arquivo"
                onChange={handleInputChange}
                style={{ display: "none" }}
                accept=".dwg,.zip"
                required={!obraData.arquivo}
              />
            </div>
          </div>

          <button type="submit">Cadastrar Obra</button>
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
