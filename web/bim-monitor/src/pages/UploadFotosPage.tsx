import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function UploadFotosPage() {
  const [searchParams] = useSearchParams();
  const obraFromUrl = searchParams.get("obra") || "";
  const enderecoFromUrl = searchParams.get("endereco") || "";

  const [fotoData, setFotoData] = useState({
    obra: obraFromUrl,
    endereco: enderecoFromUrl,
    descricao: "",
    fotos: [] as File[], // Mudança para array de File ao invés de FileList
  });

  // Tipo para armazenar fotos com IDs únicos
  type PhotoPreview = {
    id: string;
    file: File;
    url: string;
  };

  const [photoList, setPhotoList] = useState<PhotoPreview[]>([]);
  const [hasSelectedPhotos, setHasSelectedPhotos] = useState(false);

  useEffect(() => {
    setFotoData((prev) => ({
      ...prev,
      obra: obraFromUrl,
      endereco: enderecoFromUrl,
    }));
  }, [obraFromUrl, enderecoFromUrl]);

  // Limpar URLs dos objetos quando o componente for desmontado
  useEffect(() => {
    return () => {
      photoList.forEach((photo) => URL.revokeObjectURL(photo.url));
    };
  }, [photoList]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target;

    if (name === "fotos" && files) {
      // Marcar que fotos foram selecionadas
      setHasSelectedPhotos(true);

      // Criar objetos PhotoPreview para os novos arquivos
      const newPhotos: PhotoPreview[] = Array.from(files).map((file: File) => ({
        id: Date.now().toString() + Math.random().toString(36),
        file: file,
        url: URL.createObjectURL(file),
      }));

      // Adicionar às listas
      setPhotoList((prev) => [...prev, ...newPhotos]);
      setFotoData((prev) => ({
        ...prev,
        fotos: [...prev.fotos, ...newPhotos.map((p) => p.file)],
      }));

      // Limpar o input para permitir selecionar a mesma foto novamente
      e.target.value = "";
    } else if (name === "descricao") {
      setFotoData((prev) => ({ ...prev, [name]: value }));
    }
    // Não permitir alteração nos campos obra e endereco quando vierem da URL
  }

  // Função para remover uma foto específica por ID
  function removePhoto(photoId: string) {
    // Encontrar a foto pelo ID
    const photoToRemove = photoList.find((p) => p.id === photoId);
    if (!photoToRemove) return;

    // Liberar a URL específica
    URL.revokeObjectURL(photoToRemove.url);

    // Remover das listas
    setPhotoList((prev) => prev.filter((p) => p.id !== photoId));
    setFotoData((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((file) => file !== photoToRemove.file),
    }));
  }

  function handleUpload(e: React.FormEvent) {
    e.preventDefault();

    if (
      !fotoData.obra ||
      !fotoData.descricao ||
      !fotoData.fotos ||
      fotoData.fotos.length === 0
    ) {
      alert(
        "Por favor, preencha todos os campos e selecione pelo menos uma foto."
      );
      return;
    }

    const id = Date.now().toString();
    const history = JSON.parse(localStorage.getItem("analises") || "[]");
    const entry = {
      id,
      obra: fotoData.obra,
      endereco: fotoData.endereco,
      createdAt: new Date().toISOString(),
      conformidade: 0.95,
    };
    localStorage.setItem("analises", JSON.stringify([entry, ...history]));
    window.location.href = `/analises/${id}`;
  }

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <Link
          to="/dashboard"
          style={{ color: "var(--muted-text)", fontSize: 14 }}
        >
          ← Voltar para Dashboard
        </Link>
      </div>

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
                readOnly={!!obraFromUrl}
                style={{
                  backgroundColor: obraFromUrl ? "#f5f5f5" : "white",
                  cursor: obraFromUrl ? "not-allowed" : "text",
                }}
                required
              />
            </label>

            <label>
              <div style={{ marginBottom: 6, fontWeight: 500 }}>
                Endereço/Linha
              </div>
              <input
                type="text"
                name="endereco"
                value={fotoData.endereco}
                onChange={handleInputChange}
                placeholder="Ex: Linha 2 - Verde"
                className="input"
                readOnly={!!enderecoFromUrl}
                style={{
                  backgroundColor: enderecoFromUrl ? "#f5f5f5" : "white",
                  cursor: enderecoFromUrl ? "not-allowed" : "text",
                }}
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

            <div>
              <div style={{ marginBottom: 6, fontWeight: 500 }}>Fotos</div>

              {!hasSelectedPhotos ? (
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
                    📸
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Clique para selecionar fotos
                  </div>
                  <div style={{ fontSize: "14px", color: "#6b7280" }}>
                    PNG, JPG ou JPEG • Múltiplas fotos permitidas
                  </div>
                </div>
              ) : null}

              <input
                id="hidden-file-input"
                multiple
                type="file"
                name="fotos"
                onChange={handleInputChange}
                style={{ display: "none" }}
                accept="image/*"
                required={!hasSelectedPhotos}
              />

              {/* Preview das imagens selecionadas */}
              {hasSelectedPhotos && (
                <div style={{ marginTop: 16 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      marginBottom: 12,
                      color: "var(--neutral-text)",
                    }}
                  >
                    {photoList.length === 0
                      ? "Nenhuma foto selecionada"
                      : `${photoList.length} foto${
                          photoList.length > 1 ? "s" : ""
                        } selecionada${photoList.length > 1 ? "s" : ""}:`}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(120px, 1fr))",
                      gap: 12,
                      maxHeight: "300px",
                      overflowY: "auto",
                      padding: "8px",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      backgroundColor: "#fafafa",
                      minHeight: photoList.length === 0 ? "100px" : "auto",
                    }}
                  >
                    {photoList.length === 0 ? (
                      <div
                        style={{
                          gridColumn: "1 / -1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--neutral-text)",
                          fontSize: "14px",
                          textAlign: "center",
                        }}
                      >
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            document
                              .getElementById("hidden-file-input")
                              ?.click();
                          }}
                          style={{
                            border: "2px dashed #ccc",
                            borderRadius: "6px",
                            padding: "20px",
                            cursor: "pointer",
                            backgroundColor: "white",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#001489";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#ccc";
                          }}
                        >
                          Clique para adicionar fotos
                        </div>
                      </div>
                    ) : (
                      <>
                        {photoList.map((photo) => (
                          <div
                            key={photo.id}
                            style={{
                              position: "relative",
                              aspectRatio: "1",
                              borderRadius: "6px",
                              overflow: "hidden",
                              border: "2px solid #e5e7eb",
                              backgroundColor: "white",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={photo.url}
                              alt={`Preview ${photo.file.name}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />

                            {/* Máscara e X grande no hover */}
                            <div
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removePhoto(photo.id);
                              }}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: 0,
                                transition: "opacity 0.3s ease",
                                cursor: "pointer",
                                fontSize: "48px",
                                color: "white",
                                fontWeight: "bold",
                                userSelect: "none",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = "1";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = "0";
                              }}
                            >
                              ✕
                            </div>

                            <div
                              style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                                color: "white",
                                fontSize: "10px",
                                padding: "2px 4px",
                                textAlign: "center",
                              }}
                            >
                              {photo.file.name}
                            </div>
                          </div>
                        ))}

                        {/* Botão + para adicionar mais fotos */}
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            document
                              .getElementById("hidden-file-input")
                              ?.click();
                          }}
                          style={{
                            aspectRatio: "1",
                            borderRadius: "6px",
                            border: "2px dashed #cbd5e1",
                            backgroundColor: "white",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "32px",
                            color: "#9ca3af",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#001489";
                            e.currentTarget.style.color = "#001489";
                            e.currentTarget.style.backgroundColor = "#f8fafc";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#cbd5e1";
                            e.currentTarget.style.color = "#9ca3af";
                            e.currentTarget.style.backgroundColor = "white";
                          }}
                        >
                          +
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button type="submit">Enviar fotos</button>
        </form>
      </div>
    </Layout>
  );
}
