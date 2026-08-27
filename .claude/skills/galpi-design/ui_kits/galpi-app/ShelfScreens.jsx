const { ScreenHeader, IconButton, Button, Input, Badge, BookCard, BookRow, Segmented, RadioGroup,
  Bookshelf, EmptyState, ErrorState, SkeletonBookGrid, FloatingButton, Icon } = window.DesignSystem_2c5b3b;

function ShelfScreen({ books, state, go, openBook, retry }) {
  return (
    <Screen
      header={<ScreenHeader large title="내 책장" actions={<><IconButton icon="search" label="검색" /><IconButton icon="plus" label="책 추가" onClick={() => go("addBook")} /></>} />}
      bottom={null}
    >
      {state === "loading" && <SkeletonBookGrid columns={3} count={6} />}
      {state === "error" && <ErrorState title="책장을 불러오지 못했습니다" description="네트워크를 확인하고 다시 시도해주세요" onRetry={retry} />}
      {state === "ready" && books.length === 0 && (
        <EmptyState icon="library" title="첫 책을 책장에 꽂아보세요"
          description="좋아하는 구절을 담아둘 책을 골라주세요"
          action={<Button iconLeft="plus" onClick={() => go("addBook")}>책 추가</Button>} />
      )}
      {state === "ready" && books.length > 0 && (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--space-2) 0 var(--space-4)" }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-meta-lg)", color: "var(--text-secondary)" }}>{books.length}권 · 대사 {books.reduce((a, b) => a + b.quoteCount, 0)}개</span>
            <Badge tone="neutral">최근 담은 순</Badge>
          </div>
          <Bookshelf books={books} perRow={3} onSelect={openBook} />
        </>
      )}
      {state === "ready" && <FloatingButton label="책 추가" onClick={() => go("addBook")} />}
    </Screen>
  );
}

function AddBookScreen({ go, onAdd, addedIds }) {
  const [tab, setTab] = React.useState("search");
  const [q, setQ] = React.useState("");
  const [phase, setPhase] = React.useState("idle"); // idle | loading | results | empty
  const [results, setResults] = React.useState([]);
  const [form, setForm] = React.useState({ title: "", author: "", type: "novel" });

  const search = (v) => {
    setQ(v);
    if (!v) { setPhase("idle"); return; }
    setPhase("loading");
    window.KakaoBooks.search(v).then(({ books }) => {
      const hit = v.includes("웹") ? [] : books;
      setResults(hit);
      setPhase(hit.length ? "results" : "empty");
    });
  };

  return (
    <Screen header={<ScreenHeader title="책 추가" onBack={() => go("shelf")} />}>
      <div style={{ paddingTop: "var(--space-2)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <Segmented value={tab} onChange={setTab}
          options={[{ id: "search", label: "검색으로 추가" }, { id: "manual", label: "직접 등록" }]} />

        {tab === "search" && (
          <>
            <Input iconLeft="search" autoFocus placeholder="책 제목이나 작가를 검색해보세요" value={q} onChange={(e) => search(e.target.value)} />
            {phase === "idle" && <EmptyState icon="search" title="책 제목을 검색해보세요" description="찾는 책이 없다면 직접 등록할 수 있어요" />}
            {phase === "loading" && (
              <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-10) 0" }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", border: "2px solid var(--brown-300)", borderTopColor: "transparent", animation: "galpi-spin 700ms linear infinite" }} />
              </div>
            )}
            {phase === "empty" && (
              <EmptyState icon="book-open" title="검색 결과가 없어요" description="웹소설이라면 직접 등록해보세요"
                action={<Button variant="secondary" onClick={() => setTab("manual")}>직접 등록하기</Button>} />
            )}
            {phase === "results" && (
              <div>
                {results.map((r) => (
                  <BookRow key={r.id} title={r.title} author={[r.author, r.publisher, r.year].filter(Boolean).join(" · ")}
                    cover={r.cover} added={addedIds.includes(r.id)} onAdd={() => onAdd(r)} />
                ))}
              </div>
            )}
          </>
        )}

        {tab === "manual" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <Input label="제목" placeholder="필수" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input label="작가" placeholder="선택" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            <RadioGroup label="유형" value={form.type} onChange={(t) => setForm({ ...form, type: t })}
              options={[{ id: "novel", label: "소설" }, { id: "web", label: "웹소설" }]} />
            <div>
              <span style={{ display: "block", fontFamily: "var(--font-ui)", fontSize: "var(--text-meta-lg)", fontWeight: 500, marginBottom: "var(--space-2)" }}>표지 이미지</span>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", padding: "var(--space-4)", background: "var(--surface-card)", border: "1px dashed var(--border-strong)", borderRadius: "var(--radius-control)", color: "var(--text-secondary)", fontFamily: "var(--font-ui)", fontSize: "var(--text-meta-lg)" }}>
                <Icon name="image-plus" size={20} />
                선택 · 없으면 제목으로 기본 표지를 만들어요
              </div>
            </div>
            <Button size="lg" fullWidth disabled={!form.title} onClick={() => onAdd({ id: "m" + Date.now(), title: form.title, author: form.author, manual: true, tint: "var(--paper-200)" })}>등록</Button>
          </div>
        )}
      </div>
    </Screen>
  );
}

Object.assign(window, { ShelfScreen, AddBookScreen });
