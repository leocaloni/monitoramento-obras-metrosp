import bg from "../assets/fundo-login.png";

export default function LoginPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.location.href = "/dashboard";
  }
  // ensure body styling for full-bleed login
  document.body.classList.add("login-page");

  // cleanup on unmount
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).cleanupLogin = () =>
    document.body.classList.remove("login-page");
  return (
    <div
      className="login-layout"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.72), rgba(255,255,255,0.72)), url(${bg})`,
      }}
    >
      <div className="login-card card">
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <h1
            style={{ margin: 0, marginBottom: 12, color: "var(--brand-blue)" }}
          >
            Login
          </h1>
          <div style={{ color: "var(--muted-text)", fontSize: 14 }}>
            Monitoramento de Canteiros
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gap: 16 }}>
            <label>
              <div>Funcional</div>
              <input
                name="funcional"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Ex: 123456"
                className="input"
              />
            </label>
            <label>
              <div>Senha</div>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Digite sua senha"
              />
            </label>
            <label
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginTop: 4,
              }}
            >
              <input type="checkbox" />
              <span style={{ color: "var(--muted-text)", fontSize: 14 }}>
                Lembrar acesso neste dispositivo
              </span>
            </label>
            <button type="submit" style={{ marginTop: 8 }}>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
