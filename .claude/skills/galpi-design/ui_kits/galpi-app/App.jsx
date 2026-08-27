const { TabBar } = window.DesignSystem_2c5b3b;

function App() {
  const [auth, setAuth] = React.useState(false);
  const [route, setRoute] = React.useState("login"); // login|signup|shelf|addBook|book|compose|quote|feed|profile
  const [tab, setTab] = React.useState("shelf");
  const [books, setBooks] = React.useState(window.GalpiData.books);
  const [quotes, setQuotes] = React.useState(window.GalpiData.quotes);
  const [bookId, setBookId] = React.useState(null);
  const [quoteId, setQuoteId] = React.useState(null);
  const [addedIds, setAddedIds] = React.useState([]);
  const [shelfState, setShelfState] = React.useState("ready"); // ready|loading|error|emptyShelf
  const [feedState, setFeedState] = React.useState("ready");

  const login = () => { setAuth(true); setTab("shelf"); setRoute("shelf"); };
  const logout = () => { setAuth(false); setRoute("login"); };
  const book = books.find((b) => b.id === bookId) || books[0];
  const bookQuotes = quotes[book?.id] || [];
  const quote = bookQuotes.find((q) => q.id === quoteId) || bookQuotes[0];

  const onTab = (t) => { setTab(t); setRoute(t === "shelf" ? "shelf" : t); };

  const addBook = (r) => {
    setAddedIds([...addedIds, r.id]);
    if (!books.some((b) => b.title === r.title)) {
      setBooks([{ id: r.id, title: r.title, author: r.author, manual: !!r.manual, tint: r.tint || "var(--paper-200)", quoteCount: 0 }, ...books]);
    }
    setRoute("shelf");
  };

  const saveQuote = (q) => {
    const id = "n" + Date.now();
    setQuotes({ ...quotes, [book.id]: [{ id, ...q }, ...bookQuotes] });
    setBooks(books.map((b) => (b.id === book.id ? { ...b, quoteCount: b.quoteCount + 1 } : b)));
    setRoute("book");
  };

  let screen = null;
  if (!auth) {
    screen = route === "signup"
      ? <SignupScreen go={setRoute} onLogin={login} />
      : <LoginScreen go={setRoute} onLogin={login} />;
  } else if (route === "addBook") {
    screen = <AddBookScreen go={setRoute} onAdd={addBook} addedIds={addedIds} />;
  } else if (route === "book") {
    screen = <BookDetailScreen book={book} quotes={bookQuotes} state={shelfState === "loading" ? "loading" : "ready"}
      go={setRoute} openQuote={(id) => { setQuoteId(id); setRoute("quote"); }} removeBook={() => setRoute("shelf")} />;
  } else if (route === "compose") {
    screen = <ComposeScreen book={book} go={setRoute} onSave={saveQuote} />;
  } else if (route === "quote") {
    screen = <QuoteDetailScreen book={book} quote={quote} go={setRoute} />;
  } else if (route === "feed") {
    screen = <FeedScreen state={feedState} retry={() => setFeedState("ready")} />;
  } else if (route === "profile") {
    screen = <ProfileScreen books={books} onLogout={logout} />;
  } else {
    screen = <ShelfScreen books={shelfState === "emptyShelf" ? [] : books}
      state={shelfState === "emptyShelf" ? "ready" : shelfState}
      go={setRoute} openBook={(id) => { setBookId(id); setRoute("book"); }}
      retry={() => setShelfState("ready")} />;
  }

  const showTabs = auth && ["shelf", "feed", "profile"].includes(route);

  return (
    <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
      <Phone>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
          <StatusBar />
          <div style={{ position: "relative", flex: 1 }}>{screen}</div>
          {showTabs && <TabBar active={tab} onChange={onTab} />}
          <div style={{ height: 22, background: showTabs ? "var(--surface-card)" : "var(--bg-page)" }} />
        </div>
      </Phone>
      <StateRail {...{ auth, route, setRoute, shelfState, setShelfState, feedState, setFeedState, logout }} />
    </div>
  );
}

function Phone({ children }) {
  return (
    <div style={{ width: 390, height: 844, position: "relative", borderRadius: 44, background: "var(--bg-page)", boxShadow: "0 24px 60px rgba(46,42,38,.18), 0 0 0 10px #2E2A26", overflow: "hidden", flex: "0 0 auto" }}>
      {children}
    </div>
  );
}

function StatusBar() {
  return (
    <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", background: "var(--bg-page)", fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
      <span>9:41</span>
      <span style={{ display: "flex", gap: 6, opacity: .75 }}>
        <Glyph name="signal" /><Glyph name="wifi" /><Glyph name="battery-full" />
      </span>
    </div>
  );
}

function Glyph({ name, size = 15 }) {
  const url = `https://cdn.jsdelivr.net/npm/lucide-static@0.469.0/icons/${name}.svg`;
  return <span style={{ width: size, height: size, background: "currentColor", WebkitMask: `url(${url}) center/contain no-repeat`, mask: `url(${url}) center/contain no-repeat` }} />;
}

// Small preview rail — not part of the product UI, just a way to jump to states.
function StateRail({ auth, route, setRoute, shelfState, setShelfState, feedState, setFeedState, logout }) {
  const group = (label, items) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text-muted)" }}>{label}</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>{items}</div>
    </div>
  );
  const item = (label, on, fn) => (
    <button key={label} onClick={fn} style={{ textAlign: "left", padding: "7px 10px", borderRadius: 9, cursor: "pointer", fontFamily: "var(--font-ui)", fontSize: 12.5, border: `1px solid ${on ? "var(--primary)" : "var(--border)"}`, background: on ? "var(--primary-soft)" : "var(--surface-card)", color: on ? "var(--brown-700)" : "var(--text-secondary)" }}>{label}</button>
  );
  return (
    <div style={{ width: 190, display: "flex", flexDirection: "column", gap: 18, paddingTop: 8 }}>
      {group("Screens", [
        item("S-01 로그인", !auth && route === "login", logout),
        item("S-03 내 책장", auth && route === "shelf", () => setRoute("shelf")),
        item("S-05 책 상세", route === "book", () => setRoute("book")),
        item("S-07 대사 상세", route === "quote", () => setRoute("quote")),
        item("S-08 피드", route === "feed", () => setRoute("feed")),
        item("S-09 프로필", route === "profile", () => setRoute("profile")),
      ])}
      {group("책장 상태", [
        item("기본", shelfState === "ready", () => { setShelfState("ready"); setRoute("shelf"); }),
        item("빈 화면", shelfState === "emptyShelf", () => { setShelfState("emptyShelf"); setRoute("shelf"); }),
        item("로딩 (스켈레톤)", shelfState === "loading", () => { setShelfState("loading"); setRoute("shelf"); }),
        item("에러", shelfState === "error", () => { setShelfState("error"); setRoute("shelf"); }),
      ])}
      {group("피드 상태", [
        item("기본", feedState === "ready", () => { setFeedState("ready"); setRoute("feed"); }),
        item("빈 화면", feedState === "empty", () => { setFeedState("empty"); setRoute("feed"); }),
        item("로딩", feedState === "loading", () => { setFeedState("loading"); setRoute("feed"); }),
      ])}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
