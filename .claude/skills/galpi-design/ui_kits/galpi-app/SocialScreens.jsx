const { ScreenHeader, IconButton, Button, Input, Card, QuoteCard, EmptyState, SkeletonQuoteList, Icon, Switch } = window.DesignSystem_2c5b3b;

function FeedScreen({ state, retry }) {
  const [items, setItems] = React.useState(window.GalpiData.feed);
  const like = (id) => setItems(items.map((f) => (f.id === id ? { ...f, liked: !f.liked, likes: f.likes + (f.liked ? -1 : 1) } : f)));
  return (
    <Screen header={<ScreenHeader large title="피드" actions={<IconButton icon="search" label="사용자 검색" />} />}>
      {state === "loading" && <SkeletonQuoteList count={3} />}
      {state === "empty" && (
        <EmptyState icon="users" title="팔로우한 사람이 없어요" description="다른 독자를 찾아보세요"
          action={<Button variant="secondary" iconLeft="search">사용자 검색</Button>} />
      )}
      {state === "ready" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", paddingTop: "var(--space-2)" }}>
          {items.map((f) => (
            <QuoteCard key={f.id} by={f.by} text={f.text} source={f.source} author={f.author}
              likes={f.likes} liked={f.liked} clamp={0} onClick={() => like(f.id)} />
          ))}
        </div>
      )}
    </Screen>
  );
}

function ProfileScreen({ onLogout, books }) {
  const [pushOn, setPushOn] = React.useState(true);
  const quoteTotal = books.reduce((a, b) => a + b.quoteCount, 0);
  return (
    <Screen header={<ScreenHeader large title="프로필" actions={<IconButton icon="settings" label="설정" />} />}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", paddingTop: "var(--space-2)" }}>
        <Card style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
            <span style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--primary-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brown-700)", fontFamily: "var(--font-quote)", fontSize: 22 }}>서</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 18, fontWeight: 600 }}>서린</div>
              <div style={{ fontFamily: "var(--font-quote)", fontSize: 14, color: "var(--text-secondary)", marginTop: 2 }}>접어둔 문장을 다시 펼쳐보는 사람</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid var(--border)", paddingTop: "var(--space-3)" }}>
            {[["책", books.length], ["대사", quoteTotal], ["팔로워", 18]].map(([k, v]) => (
              <div key={k} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: 18, fontWeight: 600 }}>{v}</div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-meta)", color: "var(--text-secondary)", marginTop: 2 }}>{k}</div>
              </div>
            ))}
          </div>
          <Button variant="secondary" fullWidth iconLeft="search">사용자 검색</Button>
        </Card>

        <div>
          <h3 style={{ margin: "0 0 var(--space-3)", fontFamily: "var(--font-ui)", fontSize: "var(--text-section)", fontWeight: 600 }}>설정</h3>
          <Card padded={false} style={{ boxShadow: "var(--shadow-1)" }}>
            <div style={{ padding: "var(--space-4)", borderBottom: "1px solid var(--border)" }}>
              <Switch label="알림 받기" description="기본 알림 시간 · 오전 7:30" checked={pushOn} onChange={setPushOn} />
            </div>
            {["앱 정보", "이용약관", "개인정보처리방침"].map((r) => (
              <button key={r} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--space-4)", background: "transparent", border: "none", borderBottom: "1px solid var(--border)", cursor: "pointer", fontFamily: "var(--font-ui)", fontSize: "var(--text-body)", color: "var(--text-primary)" }}>
                {r}<Icon name="chevron-right" size={16} color="var(--text-muted)" />
              </button>
            ))}
            <button onClick={onLogout} style={{ width: "100%", textAlign: "left", padding: "var(--space-4)", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-ui)", fontSize: "var(--text-body)", color: "var(--error)" }}>로그아웃</button>
          </Card>
        </div>
      </div>
    </Screen>
  );
}

Object.assign(window, { FeedScreen, ProfileScreen });
