const { ScreenHeader, IconButton, Button, Input, Badge, QuoteCard, Card, Segmented, RadioGroup,
  Switch, WeekdayPicker, EmptyState, SkeletonQuoteList, FloatingButton, Icon } = window.DesignSystem_2c5b3b;

function CoverThumb({ book, w = 84 }) {
  return (
    <span style={{ display: "flex", width: w, aspectRatio: "2 / 3", borderRadius: "var(--radius-cover)", border: "1px solid var(--border)", boxShadow: "var(--shadow-2)", background: book.tint || "var(--brown-100)", borderLeft: "5px solid var(--brown-300)", alignItems: "center", padding: "0 8px", fontFamily: "var(--font-quote)", fontSize: w > 60 ? 13 : 10, lineHeight: 1.35, color: "var(--brown-700)" }}>
      {book.title}
    </span>
  );
}

function BookDetailScreen({ book, quotes, state, go, openQuote, removeBook }) {
  return (
    <Screen header={<ScreenHeader title={book.title} onBack={() => go("shelf")} actions={<IconButton icon="ellipsis" label="더보기" onClick={removeBook} />} />}>
      <div style={{ display: "flex", gap: "var(--space-4)", padding: "var(--space-2) 0 var(--space-6)" }}>
        <CoverThumb book={book} w={96} />
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6, paddingTop: 2 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-ui)", fontSize: 20, fontWeight: 700, lineHeight: 1.3 }}>{book.title}</h2>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-meta-lg)", color: "var(--text-secondary)" }}>{book.author}</span>
          <span style={{ marginTop: 4 }}><Badge>대사 {quotes.length}개</Badge></span>
        </div>
      </div>

      <h3 style={{ margin: "0 0 var(--space-3)", fontFamily: "var(--font-ui)", fontSize: "var(--text-section)", fontWeight: 600 }}>이 책의 대사</h3>

      {state === "loading" && <SkeletonQuoteList count={3} />}
      {state === "ready" && quotes.length === 0 && (
        <EmptyState icon="quote" title="아직 이 책에 담은 대사가 없어요" description="마음에 남은 문장을 옮겨두세요"
          action={<Button iconLeft="plus" onClick={() => go("compose")}>대사 추가</Button>} />
      )}
      {state === "ready" && quotes.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          {quotes.map((q) => (
            <QuoteCard key={q.id} character={q.character} text={q.text} hasNote={!!q.note}
              hasAlarm={!!(q.alarms && q.alarms.length)} onClick={() => openQuote(q.id)} />
          ))}
        </div>
      )}
      {state === "ready" && <FloatingButton label="대사 추가" onClick={() => go("compose")} style={{ bottom: "var(--space-6)" }} />}
    </Screen>
  );
}

function ComposeScreen({ book, go, onSave }) {
  const [character, setCharacter] = React.useState("");
  const [text, setText] = React.useState("");
  const [note, setNote] = React.useState("");
  const [scope, setScope] = React.useState("private");
  return (
    <Screen header={
      <ScreenHeader title="대사 기록"
        leading={<Button variant="text" onClick={() => go("book")} style={{ color: "var(--text-secondary)" }}>취소</Button>}
        actions={<Button variant="text" disabled={!text.trim()} onClick={() => onSave({ character, text, note, scope })}>저장</Button>} />}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", paddingTop: "var(--space-2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", padding: "var(--space-3)", background: "var(--surface-sunken)", borderRadius: "var(--radius-control)" }}>
          <CoverThumb book={book} w={34} />
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-meta-lg)", color: "var(--text-primary)" }}>{book.title}<span style={{ color: "var(--text-secondary)" }}> · {book.author}</span></span>
        </div>
        <Input label="등장인물" placeholder="선택" value={character} onChange={(e) => setCharacter(e.target.value)} />
        <div>
          <span style={{ display: "block", fontFamily: "var(--font-ui)", fontSize: "var(--text-meta-lg)", fontWeight: 500, marginBottom: "var(--space-2)" }}>대사</span>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={7} placeholder="마음에 남은 문장을 옮겨 적어보세요"
            style={{ width: "100%", boxSizing: "border-box", background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-control)", padding: "14px", fontFamily: "var(--font-quote)", fontSize: "var(--text-quote)", lineHeight: "var(--leading-quote)", color: "var(--text-primary)", outline: "none", resize: "vertical" }} />
        </div>
        <Input as="textarea" label="메모" rows={3} placeholder="이 대사가 왜 좋았나요?" value={note} onChange={(e) => setNote(e.target.value)} />
        <RadioGroup label="공개 범위" value={scope} onChange={setScope}
          options={[{ id: "private", label: "나만 보기", description: "기본값이에요" }, { id: "followers", label: "팔로워에게 공개" }]} />
      </div>
    </Screen>
  );
}

function QuoteDetailScreen({ book, quote, go, onSaveAlarm }) {
  const [alarms, setAlarms] = React.useState(quote.alarms || []);
  const [on, setOn] = React.useState(true);
  const [repeat, setRepeat] = React.useState("daily");
  const [days, setDays] = React.useState(["월", "수", "금"]);
  const [h, setH] = React.useState("07");
  const [m, setM] = React.useState("30");
  const save = () => {
    const a = { time: `${h}:${m}`, repeat: repeat === "daily" ? "매일" : repeat === "weekly" ? days.join("·") : "한 번" };
    setAlarms([...alarms, a]);
    onSaveAlarm && onSaveAlarm(a);
  };
  return (
    <Screen header={<ScreenHeader title="대사" onBack={() => go("book")} actions={<IconButton icon="ellipsis" label="수정·삭제" />} />}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", paddingTop: "var(--space-2)" }}>
        <div>
          {quote.character && <div style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-meta-lg)", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "var(--space-3)" }}>{quote.character}</div>}
          <p style={{ margin: 0, fontFamily: "var(--font-quote)", fontSize: 24, lineHeight: 1.65, textWrap: "pretty" }}>
            <span style={{ color: "var(--brown-300)" }}>“</span>{quote.text}
          </p>
          <div style={{ marginTop: "var(--space-4)", fontFamily: "var(--font-ui)", fontSize: "var(--text-meta)", color: "var(--text-secondary)" }}>{book.title} · {book.author}</div>
        </div>

        {quote.note && (
          <Card style={{ background: "var(--surface-sunken)", boxShadow: "none" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--text-secondary)", fontFamily: "var(--font-ui)", fontSize: "var(--text-meta)", marginBottom: 6 }}>
              <Icon name="sticky-note" size={14} /> 메모
            </div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-body-sm)", lineHeight: 1.6 }}>{quote.note}</div>
          </Card>
        )}

        <div>
          <h3 style={{ margin: "0 0 var(--space-2)", fontFamily: "var(--font-quote)", fontSize: 18 }}>이 대사를 언제 만날까요?</h3>
          {alarms.length === 0 && (
            <p style={{ margin: "0 0 var(--space-3)", fontFamily: "var(--font-ui)", fontSize: "var(--text-meta-lg)", color: "var(--text-secondary)" }}>알림을 설정하면 이 대사를 다시 만날 수 있어요</p>
          )}
          <Card style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-2)", padding: "var(--space-2) 0" }}>
              <TimeField value={h} onChange={setH} max={23} />
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 26, color: "var(--text-muted)" }}>:</span>
              <TimeField value={m} onChange={setM} max={59} step={5} />
            </div>
            <Segmented value={repeat} onChange={setRepeat}
              options={[{ id: "daily", label: "매일" }, { id: "weekly", label: "특정 요일" }, { id: "once", label: "한 번" }]} />
            {repeat === "weekly" && <WeekdayPicker value={days} onChange={setDays} />}
            <Switch label="알림 켜기" checked={on} onChange={setOn} />
            <Button fullWidth onClick={save}>알림 저장</Button>
          </Card>
          {alarms.length > 0 && (
            <div style={{ marginTop: "var(--space-3)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              {alarms.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", padding: "12px 14px", background: "var(--surface-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-control)" }}>
                  <Icon name="bell" size={16} color="var(--accent-strong)" />
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-body-sm)", fontWeight: 500 }}>{a.time}</span>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--text-meta)", color: "var(--text-secondary)" }}>{a.repeat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Screen>
  );
}

function TimeField({ value, onChange, max, step = 1 }) {
  const bump = (d) => {
    const n = (parseInt(value, 10) + d * step + max + 1) % (max + 1);
    onChange(String(n).padStart(2, "0"));
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <button onClick={() => bump(1)} style={{ border: "none", background: "transparent", color: "var(--text-muted)", cursor: "pointer", padding: 2 }}><Icon name="chevron-up" size={16} /></button>
      <span style={{ fontFamily: "var(--font-ui)", fontSize: 34, fontWeight: 600, fontVariantNumeric: "tabular-nums", minWidth: 56, textAlign: "center" }}>{value}</span>
      <button onClick={() => bump(-1)} style={{ border: "none", background: "transparent", color: "var(--text-muted)", cursor: "pointer", padding: 2 }}><Icon name="chevron-down" size={16} /></button>
    </div>
  );
}

Object.assign(window, { BookDetailScreen, ComposeScreen, QuoteDetailScreen, CoverThumb });
