const DS = window.DesignSystem_2c5b3b;
const { ScreenHeader, Button, Input, ErrorBanner, Icon } = DS;

// Shared screen scaffold: ivory page, scrollable body, optional bottom slot.
function Screen({ header, children, bottom, pad = true }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "var(--bg-page)" }}>
      {header}
      <div style={{ flex: 1, overflowY: "auto", padding: pad ? "4px var(--gutter-screen) var(--space-8)" : 0 }}>{children}</div>
      {bottom}
    </div>
  );
}

function Wordmark({ size = 40 }) {
  return (
    <span style={{ fontFamily: "var(--font-quote)", fontSize: size, fontWeight: 700, color: "var(--brown-700)", letterSpacing: "-0.02em" }}>갈피</span>
  );
}

function LoginScreen({ go, onLogin }) {
  const [email, setEmail] = React.useState("reader@galpi.app");
  const [pw, setPw] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState("");
  const submit = () => {
    if (pw.length < 4) { setErr("이메일 또는 비밀번호가 올바르지 않습니다"); return; }
    setErr(""); setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 900);
  };
  return (
    <Screen>
      <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: "var(--space-6)", padding: "var(--space-10) 0" }}>
        <div style={{ textAlign: "center", marginBottom: "var(--space-4)" }}>
          <img src="../../assets/logo.svg" alt="갈피" width="56" height="56" style={{ marginBottom: "var(--space-4)" }} />
          <div><Wordmark /></div>
          <p style={{ margin: "var(--space-2) 0 0", fontFamily: "var(--font-quote)", fontSize: 16, color: "var(--text-secondary)" }}>좋아하는 구절을 담아두는 곳</p>
        </div>
        {err && <ErrorBanner>{err}</ErrorBanner>}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <Input label="이메일" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
          <div style={{ position: "relative" }}>
            <Input label="비밀번호" type={show ? "text" : "password"} value={pw} placeholder="비밀번호를 입력해주세요"
              onChange={(e) => setPw(e.target.value)} disabled={loading} />
            <button onClick={() => setShow(!show)} aria-label="비밀번호 보기"
              style={{ position: "absolute", right: 8, top: 30, width: 36, height: 36, border: "none", background: "transparent", color: "var(--text-secondary)", cursor: "pointer" }}>
              <Icon name={show ? "eye-off" : "eye"} size={18} />
            </button>
          </div>
        </div>
        <Button size="lg" fullWidth loading={loading} onClick={submit}>로그인</Button>
        <div style={{ textAlign: "center", fontFamily: "var(--font-ui)", fontSize: "var(--text-meta-lg)", color: "var(--text-secondary)" }}>
          계정이 없으신가요? <Button variant="text" onClick={() => go("signup")}>회원가입</Button>
        </div>
      </div>
    </Screen>
  );
}

function SignupScreen({ go, onLogin }) {
  const [f, setF] = React.useState({ email: "", pw: "", nick: "" });
  const [loading, setLoading] = React.useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const emailErr = f.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email) ? "이메일 형식을 확인해주세요" : "";
  const pwErr = f.pw && f.pw.length < 8 ? "8자 이상 입력해주세요" : "";
  const nickErr = f.nick === "갈피" ? "이미 사용 중인 닉네임입니다" : "";
  const valid = f.email && f.pw.length >= 8 && f.nick.length >= 2 && !emailErr && !nickErr;
  return (
    <Screen header={<ScreenHeader title="회원가입" onBack={() => go("login")} />}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", paddingTop: "var(--space-4)" }}>
        <Input label="이메일" value={f.email} onChange={set("email")} placeholder="galpi@example.com" error={emailErr} />
        <Input label="비밀번호" type="password" value={f.pw} onChange={set("pw")} hint="8자 이상" error={pwErr} />
        <Input label="닉네임" value={f.nick} onChange={set("nick")} hint="2~20자" error={nickErr} />
        <Button size="lg" fullWidth disabled={!valid} loading={loading}
          onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); onLogin(); }, 900); }}>가입하기</Button>
        <div style={{ textAlign: "center", fontFamily: "var(--font-ui)", fontSize: "var(--text-meta-lg)", color: "var(--text-secondary)" }}>
          이미 계정이 있으신가요? <Button variant="text" onClick={() => go("login")}>로그인</Button>
        </div>
      </div>
    </Screen>
  );
}

Object.assign(window, { Screen, Wordmark, LoginScreen, SignupScreen });
