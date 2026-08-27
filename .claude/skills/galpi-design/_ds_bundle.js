/* @ds-bundle: {"format":4,"namespace":"DesignSystem_2c5b3b","components":[{"name":"BookCard","sourcePath":"components/content/BookCard.jsx"},{"name":"BookRow","sourcePath":"components/content/BookRow.jsx"},{"name":"Bookshelf","sourcePath":"components/content/Bookshelf.jsx"},{"name":"QuoteCard","sourcePath":"components/content/QuoteCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"FloatingButton","sourcePath":"components/core/FloatingButton.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"ErrorState","sourcePath":"components/feedback/ErrorState.jsx"},{"name":"ErrorBanner","sourcePath":"components/feedback/ErrorState.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"SkeletonBookGrid","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"SkeletonQuoteList","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"WeekdayPicker","sourcePath":"components/forms/WeekdayPicker.jsx"},{"name":"ScreenHeader","sourcePath":"components/navigation/ScreenHeader.jsx"},{"name":"Segmented","sourcePath":"components/navigation/Segmented.jsx"},{"name":"TabBar","sourcePath":"components/navigation/TabBar.jsx"}],"sourceHashes":{"components/content/BookCard.jsx":"37093fbcad16","components/content/BookRow.jsx":"b90cea215942","components/content/Bookshelf.jsx":"e91ffc819fe0","components/content/QuoteCard.jsx":"ef52ad2abb08","components/core/Badge.jsx":"96c8d3cfdc77","components/core/Button.jsx":"63364cd6a51e","components/core/Card.jsx":"bec3515fa8d5","components/core/FloatingButton.jsx":"95027e97f0b3","components/core/Icon.jsx":"2297e6d0dfd6","components/core/IconButton.jsx":"a68b7a3440f2","components/feedback/EmptyState.jsx":"0f7ce39c26a5","components/feedback/ErrorState.jsx":"606bfe2a5d0d","components/feedback/Skeleton.jsx":"52e5d475c1f7","components/forms/Input.jsx":"6841027cea7f","components/forms/RadioGroup.jsx":"6d0fbaa84a92","components/forms/Switch.jsx":"bca00f50480b","components/forms/WeekdayPicker.jsx":"558e18abaa74","components/navigation/ScreenHeader.jsx":"f7cce4f5d390","components/navigation/Segmented.jsx":"c4d82d9cfa7e","components/navigation/TabBar.jsx":"69979f25c50f","ui_kits/galpi-app/App.jsx":"2c3841b9292f","ui_kits/galpi-app/AuthScreens.jsx":"92cbc65b4c25","ui_kits/galpi-app/QuoteScreens.jsx":"850428af550f","ui_kits/galpi-app/ShelfScreens.jsx":"f009da6a0d78","ui_kits/galpi-app/SocialScreens.jsx":"fb00d31c4d1c","ui_kits/galpi-app/data.js":"09ba4ee5a5a6","ui_kits/galpi-app/kakaoBooks.js":"c6ae36f95762"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_2c5b3b = window.DesignSystem_2c5b3b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  accent: {
    background: "var(--accent-soft)",
    color: "var(--accent-strong)"
  },
  neutral: {
    background: "var(--surface-sunken)",
    color: "var(--text-secondary)"
  },
  primary: {
    background: "var(--primary-soft)",
    color: "var(--primary-hover)"
  },
  success: {
    background: "var(--success-soft)",
    color: "var(--success)"
  },
  error: {
    background: "var(--error-soft)",
    color: "var(--error)"
  }
};
function Badge({
  tone = "accent",
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta)",
      fontWeight: "var(--weight-semibold)",
      lineHeight: 1,
      padding: "5px 9px",
      borderRadius: "var(--radius-badge)",
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/content/BookCard.jsx
try { (() => {
/* Book cover in the shelf grid. MANUAL books with no cover art get a paper-toned
   fallback with the title set like a spine. */
function BookCard({
  title,
  author,
  cover,
  tint,
  quoteCount = 0,
  manual = false,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      padding: 0,
      border: "none",
      background: "transparent",
      textAlign: "left",
      cursor: "pointer",
      width: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "block",
      width: "100%",
      aspectRatio: "2 / 3",
      borderRadius: "var(--radius-cover)",
      overflow: "hidden",
      background: cover ? `center/cover no-repeat url(${cover})` : tint || "var(--brown-100)",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-2)"
    }
  }, !cover && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "var(--space-3)",
      borderLeft: "5px solid var(--brown-300)",
      fontFamily: "var(--font-quote)",
      fontSize: 15,
      lineHeight: 1.4,
      color: "var(--brown-700)"
    }
  }, title, author && /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 6,
      fontSize: 11,
      fontFamily: "var(--font-ui)",
      color: "var(--ink-400)"
    }
  }, author)), manual && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 6,
      left: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "neutral",
    style: {
      fontSize: 10,
      padding: "3px 7px"
    }
  }, "\uC9C1\uC811 \uB4F1\uB85D"))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-body-sm)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-primary)",
      lineHeight: 1.35,
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    }
  }, title), /*#__PURE__*/React.createElement(__ds_scope.Badge, null, "\uB300\uC0AC ", quoteCount, "\uAC1C"));
}
Object.assign(__ds_scope, { BookCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/BookCard.jsx", error: String((e && e.message) || e) }); }

// components/content/Bookshelf.jsx
try { (() => {
/* Books standing on a shelf plank, covers facing out — the 내 책장 display.
   Covers keep the 2:3 ratio and sit on a wooden ledge with a contact shadow. */
function Bookshelf({
  books = [],
  perRow = 3,
  onSelect,
  style
}) {
  const rows = [];
  for (let i = 0; i < books.length; i += perRow) rows.push(books.slice(i, i + perRow));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-6)",
      ...style
    }
  }, rows.map((row, ri) => /*#__PURE__*/React.createElement("div", {
    key: ri
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${perRow},1fr)`,
      gap: "var(--space-4)",
      alignItems: "end",
      padding: "0 4px"
    }
  }, row.map(b => /*#__PURE__*/React.createElement(ShelfBook, {
    key: b.id,
    book: b,
    onClick: () => onSelect && onSelect(b.id)
  }))), /*#__PURE__*/React.createElement(Plank, null))));
}
function ShelfBook({
  book,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: 6,
      padding: 0,
      border: "none",
      background: "transparent",
      cursor: "pointer",
      textAlign: "left",
      transform: hover ? "translateY(-4px)" : "none",
      transition: "transform var(--duration-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "block",
      width: "100%",
      aspectRatio: "2 / 3",
      borderRadius: "var(--radius-cover)",
      overflow: "hidden",
      background: book.cover ? `center/cover no-repeat url(${book.cover})` : book.tint || "var(--brown-100)",
      borderTop: "1px solid rgba(255,255,255,.6)",
      borderRight: "1px solid var(--border)",
      borderBottom: "1px solid var(--border-strong)",
      borderLeft: "5px solid var(--brown-300)",
      boxShadow: hover ? "var(--shadow-3)" : "var(--shadow-2)"
    }
  }, !book.cover && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "10px",
      fontFamily: "var(--font-quote)",
      fontSize: 14,
      lineHeight: 1.4,
      color: "var(--brown-700)"
    }
  }, book.title, book.author && /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 6,
      fontFamily: "var(--font-ui)",
      fontSize: 10,
      color: "var(--ink-400)"
    }
  }, book.author)), book.quoteCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 5,
      bottom: 5
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    style: {
      fontSize: 10,
      padding: "3px 7px"
    }
  }, book.quoteCount))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: 12,
      fontWeight: "var(--weight-medium)",
      color: "var(--text-primary)",
      lineHeight: 1.35,
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    }
  }, book.title));
}
function Plank() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: "2px 2px 4px 4px",
      background: "var(--brown-300)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      margin: "0 6px",
      borderRadius: "0 0 6px 6px",
      background: "var(--brown-100)"
    }
  }));
}
Object.assign(__ds_scope, { Bookshelf });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Bookshelf.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  padded = true,
  elevated = true,
  as = "div",
  children,
  style,
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      boxShadow: elevated ? "var(--shadow-2)" : "none",
      padding: padded ? "var(--pad-card)" : 0,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LUCIDE = "https://cdn.jsdelivr.net/npm/lucide-static@0.469.0/icons/";

/* Thin-line outline glyphs from Lucide, loaded as CSS masks so they inherit currentColor. */
function Icon({
  name,
  size = 20,
  strokeWidth,
  color,
  style,
  ...rest
}) {
  const url = `${LUCIDE}${name}.svg`;
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    "data-icon": name,
    style: {
      display: "inline-block",
      width: size,
      height: size,
      flex: "0 0 auto",
      backgroundColor: color || "currentColor",
      WebkitMaskImage: `url(${url})`,
      maskImage: `url(${url})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/content/QuoteCard.jsx
try { (() => {
/* The quote is the protagonist: serif, large, generous leading, quote-mark furniture. */
function QuoteCard({
  character,
  text,
  source,
  author,
  hasNote = false,
  hasAlarm = false,
  likes,
  liked = false,
  by,
  clamp = 3,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      position: "relative",
      background: "var(--surface-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-2)",
      padding: "var(--pad-card)",
      paddingLeft: 20,
      cursor: onClick ? "pointer" : "default",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: 16,
      bottom: 16,
      width: 3,
      borderRadius: 3,
      background: "var(--brown-300)"
    }
  }), by && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "var(--primary-soft)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--brown-700)",
      fontFamily: "var(--font-ui)",
      fontSize: 12,
      fontWeight: "var(--weight-semibold)"
    }
  }, by.slice(0, 1)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-primary)"
    }
  }, by)), character && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-secondary)",
      marginBottom: "var(--space-2)"
    }
  }, character), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-quote)",
      fontSize: "var(--text-quote)",
      lineHeight: "var(--leading-quote)",
      color: "var(--text-primary)",
      textWrap: "pretty",
      display: clamp ? "-webkit-box" : "block",
      WebkitLineClamp: clamp || undefined,
      WebkitBoxOrient: "vertical",
      overflow: clamp ? "hidden" : undefined
    }
  }, text), (source || author) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-3)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta)",
      color: "var(--text-secondary)"
    }
  }, source, author ? ` · ${author}` : ""), (hasNote || hasAlarm || likes != null) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      marginTop: "var(--space-3)",
      paddingTop: "var(--space-3)",
      borderTop: "1px solid var(--border)",
      color: "var(--text-secondary)"
    }
  }, hasAlarm && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "bell",
    size: 16,
    color: "var(--accent-strong)"
  }), hasNote && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "sticky-note",
    size: 16
  }), likes != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      marginLeft: "auto",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta)",
      color: liked ? "var(--error)" : "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "heart",
    size: 16
  }), likes)));
}
Object.assign(__ds_scope, { QuoteCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/QuoteCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  fontFamily: "var(--font-ui)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-semibold)",
  lineHeight: 1,
  borderRadius: "var(--radius-control)",
  border: "1px solid transparent",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--space-2)",
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: "var(--transition-control)"
};
const sizes = {
  sm: {
    height: 36,
    padding: "0 14px",
    fontSize: "var(--text-body-sm)"
  },
  md: {
    height: 44,
    padding: "0 18px"
  },
  lg: {
    height: "var(--control-height)",
    padding: "0 22px"
  }
};
const variants = {
  primary: {
    background: "var(--primary)",
    color: "var(--text-on-primary)"
  },
  secondary: {
    background: "transparent",
    color: "var(--primary)",
    borderColor: "var(--primary)"
  },
  text: {
    background: "transparent",
    color: "var(--text-link)",
    padding: "0 4px",
    height: "auto"
  }
};
function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  children,
  style,
  ...rest
}) {
  const dim = variant === "text" ? {
    padding: "0 4px"
  } : sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled || loading,
    "data-variant": variant,
    style: {
      ...base,
      ...dim,
      ...variants[variant],
      width: fullWidth ? "100%" : undefined,
      opacity: disabled ? 0.45 : 1,
      ...(disabled && variant === "primary" ? {
        background: "var(--disabled-bg)",
        color: "var(--disabled-text)"
      } : null),
      ...(disabled ? {
        cursor: "not-allowed"
      } : null),
      ...style
    }
  }, rest), loading ? /*#__PURE__*/React.createElement(Spinner, null) : iconLeft ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: 18
  }) : null, children, iconRight && !loading ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: 18
  }) : null);
}
function Spinner() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: "50%",
      border: "2px solid currentColor",
      borderTopColor: "transparent",
      opacity: 0.8,
      animation: "galpi-spin 700ms linear infinite"
    }
  });
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/content/BookRow.jsx
try { (() => {
/* Search-result row in 책 추가. */
function BookRow({
  title,
  author,
  cover,
  added = false,
  onAdd,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      padding: "var(--space-3) 0",
      borderBottom: "1px solid var(--border)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 66,
      flex: "0 0 auto",
      borderRadius: "var(--radius-cover)",
      border: "1px solid var(--border)",
      background: cover ? `center/cover no-repeat url(${cover})` : "var(--brown-100)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-body-sm)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-primary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 3,
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta)",
      color: "var(--text-secondary)"
    }
  }, author)), added ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta)",
      color: "var(--text-muted)",
      padding: "0 6px"
    }
  }, "\uCC45\uC7A5\uC5D0 \uC788\uC74C") : /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    size: "sm",
    onClick: onAdd
  }, "\uCD94\uAC00"));
}
Object.assign(__ds_scope, { BookRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/BookRow.jsx", error: String((e && e.message) || e) }); }

// components/core/FloatingButton.jsx
try { (() => {
function FloatingButton({
  icon = "plus",
  label,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": label,
    onClick: onClick,
    style: {
      position: "absolute",
      right: "var(--gutter-screen)",
      bottom: "calc(var(--tabbar-height) + var(--space-4))",
      width: 56,
      height: 56,
      borderRadius: "50%",
      border: "none",
      background: "var(--primary)",
      color: "var(--text-on-primary)",
      boxShadow: "var(--shadow-3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "var(--transition-control)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 24
  }));
}
Object.assign(__ds_scope, { FloatingButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/FloatingButton.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  icon,
  size = 40,
  label,
  active = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    style: {
      width: size,
      height: size,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
      border: "none",
      borderRadius: "var(--radius-control)",
      color: active ? "var(--primary)" : "var(--text-secondary)",
      cursor: "pointer",
      transition: "var(--transition-control)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.5)
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
/* Empty state — warm and inviting, never a dead end. */
function EmptyState({
  icon = "bookmark",
  title,
  description,
  action,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "var(--space-10) var(--space-6)",
      animation: "galpi-fade-up var(--duration-slow) var(--ease-out) both",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 72,
      height: 72,
      borderRadius: "50%",
      background: "var(--primary-soft)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--brown-600)",
      marginBottom: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 30
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-quote)",
      fontSize: 18,
      lineHeight: "var(--leading-quote)",
      color: "var(--text-primary)"
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-2) 0 0",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)",
      color: "var(--text-secondary)",
      lineHeight: "var(--leading-normal)"
    }
  }, description), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-6)"
    }
  }, action));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ErrorState.jsx
try { (() => {
function ErrorState({
  title = "잠시 문제가 생겼어요",
  description,
  onRetry,
  retryLabel = "다시 시도",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "var(--space-10) var(--space-6)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: "var(--error-soft)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--error)",
      marginBottom: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "cloud-off",
    size: 24
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-body)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-primary)"
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)",
      color: "var(--text-secondary)"
    }
  }, description), onRetry && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    size: "sm",
    iconLeft: "rotate-cw",
    onClick: onRetry
  }, retryLabel)));
}

/** Inline banner form, for errors above a form. */
function ErrorBanner({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      background: "var(--error-soft)",
      border: "1px solid rgba(192,73,47,.18)",
      borderRadius: "var(--radius-control)",
      padding: "12px 14px",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)",
      color: "var(--error)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "circle-alert",
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { ErrorState, ErrorBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ErrorState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Skeleton.jsx
try { (() => {
/* Skeleton is the default loading treatment; spinners only inside buttons. */
function Skeleton({
  width = "100%",
  height = 16,
  radius = "var(--radius-control)",
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "block",
      width,
      height,
      borderRadius: radius,
      background: "var(--surface-skeleton)",
      animation: "galpi-shimmer 1.4s ease-in-out infinite",
      ...style
    }
  });
}
function SkeletonBookGrid({
  count = 6,
  columns = 3
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${columns},1fr)`,
      gap: "var(--space-4)"
    }
  }, Array.from({
    length: count
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    height: undefined,
    radius: "var(--radius-cover)",
    style: {
      aspectRatio: "2 / 3"
    }
  }), /*#__PURE__*/React.createElement(Skeleton, {
    height: 12,
    width: "80%"
  }), /*#__PURE__*/React.createElement(Skeleton, {
    height: 18,
    width: 64,
    radius: "var(--radius-badge)"
  }))));
}
function SkeletonQuoteList({
  count = 3
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, Array.from({
    length: count
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      padding: "var(--pad-card)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    height: 11,
    width: 56
  }), /*#__PURE__*/React.createElement(Skeleton, {
    height: 15
  }), /*#__PURE__*/React.createElement(Skeleton, {
    height: 15,
    width: "88%"
  }), /*#__PURE__*/React.createElement(Skeleton, {
    height: 15,
    width: "62%"
  }))));
}
Object.assign(__ds_scope, { Skeleton, SkeletonBookGrid, SkeletonQuoteList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  iconLeft,
  as = "input",
  style,
  containerStyle,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const Tag = as;
  const borderColor = error ? "var(--error)" : focused ? "var(--border-focus)" : "var(--border)";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-primary)",
      marginBottom: "var(--space-2)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: as === "textarea" ? "flex-start" : "center",
      gap: "var(--space-2)",
      background: "var(--surface-card)",
      border: `1px solid ${borderColor}`,
      boxShadow: focused && !error ? "var(--shadow-focus)" : "none",
      borderRadius: "var(--radius-control)",
      padding: as === "textarea" ? "12px 14px" : "0 14px",
      minHeight: "var(--control-height)",
      transition: "var(--transition-control)"
    }
  }, iconLeft && /*#__PURE__*/React.createElement(IconSlot, {
    name: iconLeft
  }), /*#__PURE__*/React.createElement(Tag, _extends({
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-body)",
      color: "var(--text-primary)",
      lineHeight: "var(--leading-normal)",
      padding: as === "textarea" ? 0 : "13px 0",
      resize: as === "textarea" ? "vertical" : undefined,
      ...style
    }
  }, rest))), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 6,
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta)",
      color: error ? "var(--error)" : "var(--text-secondary)"
    }
  }, error || hint));
}
function IconSlot({
  name
}) {
  const url = `https://cdn.jsdelivr.net/npm/lucide-static@0.469.0/icons/${name}.svg`;
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 18,
      height: 18,
      flex: "0 0 auto",
      backgroundColor: "var(--text-secondary)",
      WebkitMaskImage: `url(${url})`,
      maskImage: `url(${url})`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  });
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioGroup.jsx
try { (() => {
/* Stacked choice rows — 유형 선택(소설/웹소설), 공개 범위. */
function RadioGroup({
  label,
  options = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-primary)",
      marginBottom: "var(--space-2)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, options.map(o => {
    const id = o.id ?? o;
    const on = id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => onChange && onChange(id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        minHeight: "var(--control-height)",
        padding: "0 14px",
        textAlign: "left",
        background: "var(--surface-card)",
        border: `1px solid ${on ? "var(--primary)" : "var(--border)"}`,
        borderRadius: "var(--radius-control)",
        cursor: "pointer",
        transition: "var(--transition-control)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        borderRadius: "50%",
        border: `1.5px solid ${on ? "var(--primary)" : "var(--border-strong)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "0 0 auto"
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: "50%",
        background: "var(--primary)"
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-body-sm)",
        fontWeight: on ? "var(--weight-medium)" : "var(--weight-regular)",
        color: "var(--text-primary)"
      }
    }, o.label ?? o), o.description && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        marginTop: 2,
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-meta)",
        color: "var(--text-secondary)"
      }
    }, o.description)));
  })));
}
Object.assign(__ds_scope, { RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked = false,
  onChange,
  label,
  description,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      cursor: "pointer",
      ...style
    }
  }, (label || description) && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-body)",
      color: "var(--text-primary)"
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 2,
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta)",
      color: "var(--text-secondary)"
    }
  }, description)), /*#__PURE__*/React.createElement("span", {
    onClick: () => onChange && onChange(!checked),
    style: {
      position: "relative",
      width: 46,
      height: 28,
      flex: "0 0 auto",
      borderRadius: 999,
      background: checked ? "var(--primary)" : "var(--border-strong)",
      transition: "background-color var(--duration-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: checked ? 21 : 3,
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "var(--shadow-1)",
      transition: "left var(--duration-base) var(--ease-standard)"
    }
  })));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/WeekdayPicker.jsx
try { (() => {
const DAYS = ["월", "화", "수", "목", "금", "토", "일"];
function WeekdayPicker({
  value = [],
  onChange,
  style
}) {
  const toggle = d => onChange && onChange(value.includes(d) ? value.filter(x => x !== d) : [...value, d]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      ...style
    }
  }, DAYS.map(d => {
    const on = value.includes(d);
    return /*#__PURE__*/React.createElement("button", {
      key: d,
      onClick: () => toggle(d),
      style: {
        flex: 1,
        height: 40,
        borderRadius: "var(--radius-badge)",
        cursor: "pointer",
        background: on ? "var(--primary)" : "var(--surface-card)",
        border: `1px solid ${on ? "var(--primary)" : "var(--border)"}`,
        color: on ? "var(--text-on-primary)" : "var(--text-secondary)",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-body-sm)",
        fontWeight: on ? "var(--weight-semibold)" : "var(--weight-regular)",
        transition: "var(--transition-control)"
      }
    }, d);
  }));
}
Object.assign(__ds_scope, { WeekdayPicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/WeekdayPicker.jsx", error: String((e && e.message) || e) }); }

// components/navigation/ScreenHeader.jsx
try { (() => {
/* Screen header. Large-title mode for tab roots, compact centered mode for pushed screens. */
function ScreenHeader({
  title,
  onBack,
  large = false,
  actions,
  leading,
  trailing,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      minHeight: 52,
      padding: `${large ? "8px" : "6px"} var(--gutter-screen)`,
      background: "var(--bg-page)",
      ...style
    }
  }, onBack && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "chevron-left",
    label: "\uB4A4\uB85C",
    onClick: onBack,
    style: {
      marginLeft: -10
    }
  }), leading, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      flex: 1,
      fontFamily: "var(--font-ui)",
      fontSize: large ? "var(--text-title)" : "17px",
      fontWeight: large ? "var(--weight-bold)" : "var(--weight-semibold)",
      letterSpacing: "var(--tracking-title)",
      textAlign: large || onBack === undefined ? "left" : "center",
      color: "var(--text-primary)"
    }
  }, title), actions ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 2
    }
  }, actions) : trailing);
}
Object.assign(__ds_scope, { ScreenHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/ScreenHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Segmented.jsx
try { (() => {
/* Segmented control — 검색으로 추가 / 직접 등록, 반복 주기 등. */
function Segmented({
  options = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${options.length},1fr)`,
      gap: 2,
      padding: 3,
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-control)",
      ...style
    }
  }, options.map(o => {
    const id = o.id ?? o;
    const label = o.label ?? o;
    const on = id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => onChange && onChange(id),
      style: {
        height: 38,
        border: "none",
        borderRadius: 10,
        cursor: "pointer",
        background: on ? "var(--surface-card)" : "transparent",
        boxShadow: on ? "var(--shadow-1)" : "none",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-body-sm)",
        fontWeight: on ? "var(--weight-semibold)" : "var(--weight-regular)",
        color: on ? "var(--text-primary)" : "var(--text-secondary)",
        transition: "var(--transition-control)"
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { Segmented });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Segmented.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TabBar.jsx
try { (() => {
const TABS = [{
  id: "shelf",
  label: "내 책장",
  icon: "library"
}, {
  id: "feed",
  label: "피드",
  icon: "users"
}, {
  id: "profile",
  label: "프로필",
  icon: "user"
}];
function TabBar({
  active = "shelf",
  tabs = TABS,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${tabs.length},1fr)`,
      height: "var(--tabbar-height)",
      background: "var(--surface-card)",
      borderTop: "1px solid var(--border)",
      ...style
    }
  }, tabs.map(t => {
    const on = t.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => onChange && onChange(t.id),
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        color: on ? "var(--primary)" : "var(--text-secondary)",
        fontFamily: "var(--font-ui)",
        fontSize: 11,
        fontWeight: on ? "var(--weight-semibold)" : "var(--weight-regular)",
        transition: "var(--transition-control)"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: t.icon,
      size: 22
    }), t.label);
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TabBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/galpi-app/App.jsx
try { (() => {
const {
  TabBar
} = window.DesignSystem_2c5b3b;
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
  const login = () => {
    setAuth(true);
    setTab("shelf");
    setRoute("shelf");
  };
  const logout = () => {
    setAuth(false);
    setRoute("login");
  };
  const book = books.find(b => b.id === bookId) || books[0];
  const bookQuotes = quotes[book?.id] || [];
  const quote = bookQuotes.find(q => q.id === quoteId) || bookQuotes[0];
  const onTab = t => {
    setTab(t);
    setRoute(t === "shelf" ? "shelf" : t);
  };
  const addBook = r => {
    setAddedIds([...addedIds, r.id]);
    if (!books.some(b => b.title === r.title)) {
      setBooks([{
        id: r.id,
        title: r.title,
        author: r.author,
        manual: !!r.manual,
        tint: r.tint || "var(--paper-200)",
        quoteCount: 0
      }, ...books]);
    }
    setRoute("shelf");
  };
  const saveQuote = q => {
    const id = "n" + Date.now();
    setQuotes({
      ...quotes,
      [book.id]: [{
        id,
        ...q
      }, ...bookQuotes]
    });
    setBooks(books.map(b => b.id === book.id ? {
      ...b,
      quoteCount: b.quoteCount + 1
    } : b));
    setRoute("book");
  };
  let screen = null;
  if (!auth) {
    screen = route === "signup" ? /*#__PURE__*/React.createElement(SignupScreen, {
      go: setRoute,
      onLogin: login
    }) : /*#__PURE__*/React.createElement(LoginScreen, {
      go: setRoute,
      onLogin: login
    });
  } else if (route === "addBook") {
    screen = /*#__PURE__*/React.createElement(AddBookScreen, {
      go: setRoute,
      onAdd: addBook,
      addedIds: addedIds
    });
  } else if (route === "book") {
    screen = /*#__PURE__*/React.createElement(BookDetailScreen, {
      book: book,
      quotes: bookQuotes,
      state: shelfState === "loading" ? "loading" : "ready",
      go: setRoute,
      openQuote: id => {
        setQuoteId(id);
        setRoute("quote");
      },
      removeBook: () => setRoute("shelf")
    });
  } else if (route === "compose") {
    screen = /*#__PURE__*/React.createElement(ComposeScreen, {
      book: book,
      go: setRoute,
      onSave: saveQuote
    });
  } else if (route === "quote") {
    screen = /*#__PURE__*/React.createElement(QuoteDetailScreen, {
      book: book,
      quote: quote,
      go: setRoute
    });
  } else if (route === "feed") {
    screen = /*#__PURE__*/React.createElement(FeedScreen, {
      state: feedState,
      retry: () => setFeedState("ready")
    });
  } else if (route === "profile") {
    screen = /*#__PURE__*/React.createElement(ProfileScreen, {
      books: books,
      onLogout: logout
    });
  } else {
    screen = /*#__PURE__*/React.createElement(ShelfScreen, {
      books: shelfState === "emptyShelf" ? [] : books,
      state: shelfState === "emptyShelf" ? "ready" : shelfState,
      go: setRoute,
      openBook: id => {
        setBookId(id);
        setRoute("book");
      },
      retry: () => setShelfState("ready")
    });
  }
  const showTabs = auth && ["shelf", "feed", "profile"].includes(route);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 28,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1
    }
  }, screen), showTabs && /*#__PURE__*/React.createElement(TabBar, {
    active: tab,
    onChange: onTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 22,
      background: showTabs ? "var(--surface-card)" : "var(--bg-page)"
    }
  }))), /*#__PURE__*/React.createElement(StateRail, {
    auth,
    route,
    setRoute,
    shelfState,
    setShelfState,
    feedState,
    setFeedState,
    logout
  }));
}
function Phone({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 844,
      position: "relative",
      borderRadius: 44,
      background: "var(--bg-page)",
      boxShadow: "0 24px 60px rgba(46,42,38,.18), 0 0 0 10px #2E2A26",
      overflow: "hidden",
      flex: "0 0 auto"
    }
  }, children);
}
function StatusBar() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      background: "var(--bg-page)",
      fontFamily: "var(--font-ui)",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6,
      opacity: .75
    }
  }, /*#__PURE__*/React.createElement(Glyph, {
    name: "signal"
  }), /*#__PURE__*/React.createElement(Glyph, {
    name: "wifi"
  }), /*#__PURE__*/React.createElement(Glyph, {
    name: "battery-full"
  })));
}
function Glyph({
  name,
  size = 15
}) {
  const url = `https://cdn.jsdelivr.net/npm/lucide-static@0.469.0/icons/${name}.svg`;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      background: "currentColor",
      WebkitMask: `url(${url}) center/contain no-repeat`,
      mask: `url(${url}) center/contain no-repeat`
    }
  });
}

// Small preview rail — not part of the product UI, just a way to jump to states.
function StateRail({
  auth,
  route,
  setRoute,
  shelfState,
  setShelfState,
  feedState,
  setFeedState,
  logout
}) {
  const group = (label, items) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, items));
  const item = (label, on, fn) => /*#__PURE__*/React.createElement("button", {
    key: label,
    onClick: fn,
    style: {
      textAlign: "left",
      padding: "7px 10px",
      borderRadius: 9,
      cursor: "pointer",
      fontFamily: "var(--font-ui)",
      fontSize: 12.5,
      border: `1px solid ${on ? "var(--primary)" : "var(--border)"}`,
      background: on ? "var(--primary-soft)" : "var(--surface-card)",
      color: on ? "var(--brown-700)" : "var(--text-secondary)"
    }
  }, label);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 190,
      display: "flex",
      flexDirection: "column",
      gap: 18,
      paddingTop: 8
    }
  }, group("Screens", [item("S-01 로그인", !auth && route === "login", logout), item("S-03 내 책장", auth && route === "shelf", () => setRoute("shelf")), item("S-05 책 상세", route === "book", () => setRoute("book")), item("S-07 대사 상세", route === "quote", () => setRoute("quote")), item("S-08 피드", route === "feed", () => setRoute("feed")), item("S-09 프로필", route === "profile", () => setRoute("profile"))]), group("책장 상태", [item("기본", shelfState === "ready", () => {
    setShelfState("ready");
    setRoute("shelf");
  }), item("빈 화면", shelfState === "emptyShelf", () => {
    setShelfState("emptyShelf");
    setRoute("shelf");
  }), item("로딩 (스켈레톤)", shelfState === "loading", () => {
    setShelfState("loading");
    setRoute("shelf");
  }), item("에러", shelfState === "error", () => {
    setShelfState("error");
    setRoute("shelf");
  })]), group("피드 상태", [item("기본", feedState === "ready", () => {
    setFeedState("ready");
    setRoute("feed");
  }), item("빈 화면", feedState === "empty", () => {
    setFeedState("empty");
    setRoute("feed");
  }), item("로딩", feedState === "loading", () => {
    setFeedState("loading");
    setRoute("feed");
  })]));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/galpi-app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/galpi-app/AuthScreens.jsx
try { (() => {
const DS = window.DesignSystem_2c5b3b;
const {
  ScreenHeader,
  Button,
  Input,
  ErrorBanner,
  Icon
} = DS;

// Shared screen scaffold: ivory page, scrollable body, optional bottom slot.
function Screen({
  header,
  children,
  bottom,
  pad = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      background: "var(--bg-page)"
    }
  }, header, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: pad ? "4px var(--gutter-screen) var(--space-8)" : 0
    }
  }, children), bottom);
}
function Wordmark({
  size = 40
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-quote)",
      fontSize: size,
      fontWeight: 700,
      color: "var(--brown-700)",
      letterSpacing: "-0.02em"
    }
  }, "\uAC08\uD53C");
}
function LoginScreen({
  go,
  onLogin
}) {
  const [email, setEmail] = React.useState("reader@galpi.app");
  const [pw, setPw] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState("");
  const submit = () => {
    if (pw.length < 4) {
      setErr("이메일 또는 비밀번호가 올바르지 않습니다");
      return;
    }
    setErr("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 900);
  };
  return /*#__PURE__*/React.createElement(Screen, null, /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "var(--space-6)",
      padding: "var(--space-10) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.svg",
    alt: "\uAC08\uD53C",
    width: "56",
    height: "56",
    style: {
      marginBottom: "var(--space-4)"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Wordmark, null)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-2) 0 0",
      fontFamily: "var(--font-quote)",
      fontSize: 16,
      color: "var(--text-secondary)"
    }
  }, "\uC88B\uC544\uD558\uB294 \uAD6C\uC808\uC744 \uB2F4\uC544\uB450\uB294 \uACF3")), err && /*#__PURE__*/React.createElement(ErrorBanner, null, err), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\uC774\uBA54\uC77C",
    value: email,
    onChange: e => setEmail(e.target.value),
    disabled: loading
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\uBE44\uBC00\uBC88\uD638",
    type: show ? "text" : "password",
    value: pw,
    placeholder: "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694",
    onChange: e => setPw(e.target.value),
    disabled: loading
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShow(!show),
    "aria-label": "\uBE44\uBC00\uBC88\uD638 \uBCF4\uAE30",
    style: {
      position: "absolute",
      right: 8,
      top: 30,
      width: 36,
      height: 36,
      border: "none",
      background: "transparent",
      color: "var(--text-secondary)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: show ? "eye-off" : "eye",
    size: 18
  })))), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    loading: loading,
    onClick: submit
  }, "\uB85C\uADF8\uC778"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)",
      color: "var(--text-secondary)"
    }
  }, "\uACC4\uC815\uC774 \uC5C6\uC73C\uC2E0\uAC00\uC694? ", /*#__PURE__*/React.createElement(Button, {
    variant: "text",
    onClick: () => go("signup")
  }, "\uD68C\uC6D0\uAC00\uC785"))));
}
function SignupScreen({
  go,
  onLogin
}) {
  const [f, setF] = React.useState({
    email: "",
    pw: "",
    nick: ""
  });
  const [loading, setLoading] = React.useState(false);
  const set = k => e => setF({
    ...f,
    [k]: e.target.value
  });
  const emailErr = f.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email) ? "이메일 형식을 확인해주세요" : "";
  const pwErr = f.pw && f.pw.length < 8 ? "8자 이상 입력해주세요" : "";
  const nickErr = f.nick === "갈피" ? "이미 사용 중인 닉네임입니다" : "";
  const valid = f.email && f.pw.length >= 8 && f.nick.length >= 2 && !emailErr && !nickErr;
  return /*#__PURE__*/React.createElement(Screen, {
    header: /*#__PURE__*/React.createElement(ScreenHeader, {
      title: "\uD68C\uC6D0\uAC00\uC785",
      onBack: () => go("login")
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      paddingTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\uC774\uBA54\uC77C",
    value: f.email,
    onChange: set("email"),
    placeholder: "galpi@example.com",
    error: emailErr
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\uBE44\uBC00\uBC88\uD638",
    type: "password",
    value: f.pw,
    onChange: set("pw"),
    hint: "8\uC790 \uC774\uC0C1",
    error: pwErr
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\uB2C9\uB124\uC784",
    value: f.nick,
    onChange: set("nick"),
    hint: "2~20\uC790",
    error: nickErr
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    disabled: !valid,
    loading: loading,
    onClick: () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onLogin();
      }, 900);
    }
  }, "\uAC00\uC785\uD558\uAE30"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)",
      color: "var(--text-secondary)"
    }
  }, "\uC774\uBBF8 \uACC4\uC815\uC774 \uC788\uC73C\uC2E0\uAC00\uC694? ", /*#__PURE__*/React.createElement(Button, {
    variant: "text",
    onClick: () => go("login")
  }, "\uB85C\uADF8\uC778"))));
}
Object.assign(window, {
  Screen,
  Wordmark,
  LoginScreen,
  SignupScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/galpi-app/AuthScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/galpi-app/QuoteScreens.jsx
try { (() => {
const {
  ScreenHeader,
  IconButton,
  Button,
  Input,
  Badge,
  QuoteCard,
  Card,
  Segmented,
  RadioGroup,
  Switch,
  WeekdayPicker,
  EmptyState,
  SkeletonQuoteList,
  FloatingButton,
  Icon
} = window.DesignSystem_2c5b3b;
function CoverThumb({
  book,
  w = 84
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      width: w,
      aspectRatio: "2 / 3",
      borderRadius: "var(--radius-cover)",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-2)",
      background: book.tint || "var(--brown-100)",
      borderLeft: "5px solid var(--brown-300)",
      alignItems: "center",
      padding: "0 8px",
      fontFamily: "var(--font-quote)",
      fontSize: w > 60 ? 13 : 10,
      lineHeight: 1.35,
      color: "var(--brown-700)"
    }
  }, book.title);
}
function BookDetailScreen({
  book,
  quotes,
  state,
  go,
  openQuote,
  removeBook
}) {
  return /*#__PURE__*/React.createElement(Screen, {
    header: /*#__PURE__*/React.createElement(ScreenHeader, {
      title: book.title,
      onBack: () => go("shelf"),
      actions: /*#__PURE__*/React.createElement(IconButton, {
        icon: "ellipsis",
        label: "\uB354\uBCF4\uAE30",
        onClick: removeBook
      })
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      padding: "var(--space-2) 0 var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(CoverThumb, {
    book: book,
    w: 96
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 6,
      paddingTop: 2
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-ui)",
      fontSize: 20,
      fontWeight: 700,
      lineHeight: 1.3
    }
  }, book.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)",
      color: "var(--text-secondary)"
    }
  }, book.author), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Badge, null, "\uB300\uC0AC ", quotes.length, "\uAC1C")))), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 var(--space-3)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-section)",
      fontWeight: 600
    }
  }, "\uC774 \uCC45\uC758 \uB300\uC0AC"), state === "loading" && /*#__PURE__*/React.createElement(SkeletonQuoteList, {
    count: 3
  }), state === "ready" && quotes.length === 0 && /*#__PURE__*/React.createElement(EmptyState, {
    icon: "quote",
    title: "\uC544\uC9C1 \uC774 \uCC45\uC5D0 \uB2F4\uC740 \uB300\uC0AC\uAC00 \uC5C6\uC5B4\uC694",
    description: "\uB9C8\uC74C\uC5D0 \uB0A8\uC740 \uBB38\uC7A5\uC744 \uC62E\uACA8\uB450\uC138\uC694",
    action: /*#__PURE__*/React.createElement(Button, {
      iconLeft: "plus",
      onClick: () => go("compose")
    }, "\uB300\uC0AC \uCD94\uAC00")
  }), state === "ready" && quotes.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, quotes.map(q => /*#__PURE__*/React.createElement(QuoteCard, {
    key: q.id,
    character: q.character,
    text: q.text,
    hasNote: !!q.note,
    hasAlarm: !!(q.alarms && q.alarms.length),
    onClick: () => openQuote(q.id)
  }))), state === "ready" && /*#__PURE__*/React.createElement(FloatingButton, {
    label: "\uB300\uC0AC \uCD94\uAC00",
    onClick: () => go("compose"),
    style: {
      bottom: "var(--space-6)"
    }
  }));
}
function ComposeScreen({
  book,
  go,
  onSave
}) {
  const [character, setCharacter] = React.useState("");
  const [text, setText] = React.useState("");
  const [note, setNote] = React.useState("");
  const [scope, setScope] = React.useState("private");
  return /*#__PURE__*/React.createElement(Screen, {
    header: /*#__PURE__*/React.createElement(ScreenHeader, {
      title: "\uB300\uC0AC \uAE30\uB85D",
      leading: /*#__PURE__*/React.createElement(Button, {
        variant: "text",
        onClick: () => go("book"),
        style: {
          color: "var(--text-secondary)"
        }
      }, "\uCDE8\uC18C"),
      actions: /*#__PURE__*/React.createElement(Button, {
        variant: "text",
        disabled: !text.trim(),
        onClick: () => onSave({
          character,
          text,
          note,
          scope
        })
      }, "\uC800\uC7A5")
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)",
      paddingTop: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      padding: "var(--space-3)",
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-control)"
    }
  }, /*#__PURE__*/React.createElement(CoverThumb, {
    book: book,
    w: 34
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)",
      color: "var(--text-primary)"
    }
  }, book.title, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, " \xB7 ", book.author))), /*#__PURE__*/React.createElement(Input, {
    label: "\uB4F1\uC7A5\uC778\uBB3C",
    placeholder: "\uC120\uD0DD",
    value: character,
    onChange: e => setCharacter(e.target.value)
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)",
      fontWeight: 500,
      marginBottom: "var(--space-2)"
    }
  }, "\uB300\uC0AC"), /*#__PURE__*/React.createElement("textarea", {
    value: text,
    onChange: e => setText(e.target.value),
    rows: 7,
    placeholder: "\uB9C8\uC74C\uC5D0 \uB0A8\uC740 \uBB38\uC7A5\uC744 \uC62E\uACA8 \uC801\uC5B4\uBCF4\uC138\uC694",
    style: {
      width: "100%",
      boxSizing: "border-box",
      background: "var(--surface-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-control)",
      padding: "14px",
      fontFamily: "var(--font-quote)",
      fontSize: "var(--text-quote)",
      lineHeight: "var(--leading-quote)",
      color: "var(--text-primary)",
      outline: "none",
      resize: "vertical"
    }
  })), /*#__PURE__*/React.createElement(Input, {
    as: "textarea",
    label: "\uBA54\uBAA8",
    rows: 3,
    placeholder: "\uC774 \uB300\uC0AC\uAC00 \uC65C \uC88B\uC558\uB098\uC694?",
    value: note,
    onChange: e => setNote(e.target.value)
  }), /*#__PURE__*/React.createElement(RadioGroup, {
    label: "\uACF5\uAC1C \uBC94\uC704",
    value: scope,
    onChange: setScope,
    options: [{
      id: "private",
      label: "나만 보기",
      description: "기본값이에요"
    }, {
      id: "followers",
      label: "팔로워에게 공개"
    }]
  })));
}
function QuoteDetailScreen({
  book,
  quote,
  go,
  onSaveAlarm
}) {
  const [alarms, setAlarms] = React.useState(quote.alarms || []);
  const [on, setOn] = React.useState(true);
  const [repeat, setRepeat] = React.useState("daily");
  const [days, setDays] = React.useState(["월", "수", "금"]);
  const [h, setH] = React.useState("07");
  const [m, setM] = React.useState("30");
  const save = () => {
    const a = {
      time: `${h}:${m}`,
      repeat: repeat === "daily" ? "매일" : repeat === "weekly" ? days.join("·") : "한 번"
    };
    setAlarms([...alarms, a]);
    onSaveAlarm && onSaveAlarm(a);
  };
  return /*#__PURE__*/React.createElement(Screen, {
    header: /*#__PURE__*/React.createElement(ScreenHeader, {
      title: "\uB300\uC0AC",
      onBack: () => go("book"),
      actions: /*#__PURE__*/React.createElement(IconButton, {
        icon: "ellipsis",
        label: "\uC218\uC815\xB7\uC0AD\uC81C"
      })
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-6)",
      paddingTop: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("div", null, quote.character && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)",
      fontWeight: 600,
      color: "var(--text-secondary)",
      marginBottom: "var(--space-3)"
    }
  }, quote.character), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-quote)",
      fontSize: 24,
      lineHeight: 1.65,
      textWrap: "pretty"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--brown-300)"
    }
  }, "\u201C"), quote.text), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-4)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta)",
      color: "var(--text-secondary)"
    }
  }, book.title, " \xB7 ", book.author)), quote.note && /*#__PURE__*/React.createElement(Card, {
    style: {
      background: "var(--surface-sunken)",
      boxShadow: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      color: "var(--text-secondary)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta)",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sticky-note",
    size: 14
  }), " \uBA54\uBAA8"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-body-sm)",
      lineHeight: 1.6
    }
  }, quote.note)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 var(--space-2)",
      fontFamily: "var(--font-quote)",
      fontSize: 18
    }
  }, "\uC774 \uB300\uC0AC\uB97C \uC5B8\uC81C \uB9CC\uB0A0\uAE4C\uC694?"), alarms.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 var(--space-3)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)",
      color: "var(--text-secondary)"
    }
  }, "\uC54C\uB9BC\uC744 \uC124\uC815\uD558\uBA74 \uC774 \uB300\uC0AC\uB97C \uB2E4\uC2DC \uB9CC\uB0A0 \uC218 \uC788\uC5B4\uC694"), /*#__PURE__*/React.createElement(Card, {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-2)",
      padding: "var(--space-2) 0"
    }
  }, /*#__PURE__*/React.createElement(TimeField, {
    value: h,
    onChange: setH,
    max: 23
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: 26,
      color: "var(--text-muted)"
    }
  }, ":"), /*#__PURE__*/React.createElement(TimeField, {
    value: m,
    onChange: setM,
    max: 59,
    step: 5
  })), /*#__PURE__*/React.createElement(Segmented, {
    value: repeat,
    onChange: setRepeat,
    options: [{
      id: "daily",
      label: "매일"
    }, {
      id: "weekly",
      label: "특정 요일"
    }, {
      id: "once",
      label: "한 번"
    }]
  }), repeat === "weekly" && /*#__PURE__*/React.createElement(WeekdayPicker, {
    value: days,
    onChange: setDays
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "\uC54C\uB9BC \uCF1C\uAE30",
    checked: on,
    onChange: setOn
  }), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    onClick: save
  }, "\uC54C\uB9BC \uC800\uC7A5")), alarms.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-3)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, alarms.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      padding: "12px 14px",
      background: "var(--surface-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-control)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 16,
    color: "var(--accent-strong)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-body-sm)",
      fontWeight: 500
    }
  }, a.time), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta)",
      color: "var(--text-secondary)"
    }
  }, a.repeat)))))));
}
function TimeField({
  value,
  onChange,
  max,
  step = 1
}) {
  const bump = d => {
    const n = (parseInt(value, 10) + d * step + max + 1) % (max + 1);
    onChange(String(n).padStart(2, "0"));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => bump(1),
    style: {
      border: "none",
      background: "transparent",
      color: "var(--text-muted)",
      cursor: "pointer",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-up",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: 34,
      fontWeight: 600,
      fontVariantNumeric: "tabular-nums",
      minWidth: 56,
      textAlign: "center"
    }
  }, value), /*#__PURE__*/React.createElement("button", {
    onClick: () => bump(-1),
    style: {
      border: "none",
      background: "transparent",
      color: "var(--text-muted)",
      cursor: "pointer",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 16
  })));
}
Object.assign(window, {
  BookDetailScreen,
  ComposeScreen,
  QuoteDetailScreen,
  CoverThumb
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/galpi-app/QuoteScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/galpi-app/ShelfScreens.jsx
try { (() => {
const {
  ScreenHeader,
  IconButton,
  Button,
  Input,
  Badge,
  BookCard,
  BookRow,
  Segmented,
  RadioGroup,
  Bookshelf,
  EmptyState,
  ErrorState,
  SkeletonBookGrid,
  FloatingButton,
  Icon
} = window.DesignSystem_2c5b3b;
function ShelfScreen({
  books,
  state,
  go,
  openBook,
  retry
}) {
  return /*#__PURE__*/React.createElement(Screen, {
    header: /*#__PURE__*/React.createElement(ScreenHeader, {
      large: true,
      title: "\uB0B4 \uCC45\uC7A5",
      actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
        icon: "search",
        label: "\uAC80\uC0C9"
      }), /*#__PURE__*/React.createElement(IconButton, {
        icon: "plus",
        label: "\uCC45 \uCD94\uAC00",
        onClick: () => go("addBook")
      }))
    }),
    bottom: null
  }, state === "loading" && /*#__PURE__*/React.createElement(SkeletonBookGrid, {
    columns: 3,
    count: 6
  }), state === "error" && /*#__PURE__*/React.createElement(ErrorState, {
    title: "\uCC45\uC7A5\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",
    description: "\uB124\uD2B8\uC6CC\uD06C\uB97C \uD655\uC778\uD558\uACE0 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694",
    onRetry: retry
  }), state === "ready" && books.length === 0 && /*#__PURE__*/React.createElement(EmptyState, {
    icon: "library",
    title: "\uCCAB \uCC45\uC744 \uCC45\uC7A5\uC5D0 \uAF42\uC544\uBCF4\uC138\uC694",
    description: "\uC88B\uC544\uD558\uB294 \uAD6C\uC808\uC744 \uB2F4\uC544\uB458 \uCC45\uC744 \uACE8\uB77C\uC8FC\uC138\uC694",
    action: /*#__PURE__*/React.createElement(Button, {
      iconLeft: "plus",
      onClick: () => go("addBook")
    }, "\uCC45 \uCD94\uAC00")
  }), state === "ready" && books.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--space-2) 0 var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)",
      color: "var(--text-secondary)"
    }
  }, books.length, "\uAD8C \xB7 \uB300\uC0AC ", books.reduce((a, b) => a + b.quoteCount, 0), "\uAC1C"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "\uCD5C\uADFC \uB2F4\uC740 \uC21C")), /*#__PURE__*/React.createElement(Bookshelf, {
    books: books,
    perRow: 3,
    onSelect: openBook
  })), state === "ready" && /*#__PURE__*/React.createElement(FloatingButton, {
    label: "\uCC45 \uCD94\uAC00",
    onClick: () => go("addBook")
  }));
}
function AddBookScreen({
  go,
  onAdd,
  addedIds
}) {
  const [tab, setTab] = React.useState("search");
  const [q, setQ] = React.useState("");
  const [phase, setPhase] = React.useState("idle"); // idle | loading | results | empty
  const [results, setResults] = React.useState([]);
  const [form, setForm] = React.useState({
    title: "",
    author: "",
    type: "novel"
  });
  const search = v => {
    setQ(v);
    if (!v) {
      setPhase("idle");
      return;
    }
    setPhase("loading");
    window.KakaoBooks.search(v).then(({
      books
    }) => {
      const hit = v.includes("웹") ? [] : books;
      setResults(hit);
      setPhase(hit.length ? "results" : "empty");
    });
  };
  return /*#__PURE__*/React.createElement(Screen, {
    header: /*#__PURE__*/React.createElement(ScreenHeader, {
      title: "\uCC45 \uCD94\uAC00",
      onBack: () => go("shelf")
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: "var(--space-2)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Segmented, {
    value: tab,
    onChange: setTab,
    options: [{
      id: "search",
      label: "검색으로 추가"
    }, {
      id: "manual",
      label: "직접 등록"
    }]
  }), tab === "search" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, {
    iconLeft: "search",
    autoFocus: true,
    placeholder: "\uCC45 \uC81C\uBAA9\uC774\uB098 \uC791\uAC00\uB97C \uAC80\uC0C9\uD574\uBCF4\uC138\uC694",
    value: q,
    onChange: e => search(e.target.value)
  }), phase === "idle" && /*#__PURE__*/React.createElement(EmptyState, {
    icon: "search",
    title: "\uCC45 \uC81C\uBAA9\uC744 \uAC80\uC0C9\uD574\uBCF4\uC138\uC694",
    description: "\uCC3E\uB294 \uCC45\uC774 \uC5C6\uB2E4\uBA74 \uC9C1\uC811 \uB4F1\uB85D\uD560 \uC218 \uC788\uC5B4\uC694"
  }), phase === "loading" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "var(--space-10) 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      border: "2px solid var(--brown-300)",
      borderTopColor: "transparent",
      animation: "galpi-spin 700ms linear infinite"
    }
  })), phase === "empty" && /*#__PURE__*/React.createElement(EmptyState, {
    icon: "book-open",
    title: "\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC5B4\uC694",
    description: "\uC6F9\uC18C\uC124\uC774\uB77C\uBA74 \uC9C1\uC811 \uB4F1\uB85D\uD574\uBCF4\uC138\uC694",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setTab("manual")
    }, "\uC9C1\uC811 \uB4F1\uB85D\uD558\uAE30")
  }), phase === "results" && /*#__PURE__*/React.createElement("div", null, results.map(r => /*#__PURE__*/React.createElement(BookRow, {
    key: r.id,
    title: r.title,
    author: [r.author, r.publisher, r.year].filter(Boolean).join(" · "),
    cover: r.cover,
    added: addedIds.includes(r.id),
    onAdd: () => onAdd(r)
  })))), tab === "manual" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "\uC81C\uBAA9",
    placeholder: "\uD544\uC218",
    value: form.title,
    onChange: e => setForm({
      ...form,
      title: e.target.value
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "\uC791\uAC00",
    placeholder: "\uC120\uD0DD",
    value: form.author,
    onChange: e => setForm({
      ...form,
      author: e.target.value
    })
  }), /*#__PURE__*/React.createElement(RadioGroup, {
    label: "\uC720\uD615",
    value: form.type,
    onChange: t => setForm({
      ...form,
      type: t
    }),
    options: [{
      id: "novel",
      label: "소설"
    }, {
      id: "web",
      label: "웹소설"
    }]
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)",
      fontWeight: 500,
      marginBottom: "var(--space-2)"
    }
  }, "\uD45C\uC9C0 \uC774\uBBF8\uC9C0"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      padding: "var(--space-4)",
      background: "var(--surface-card)",
      border: "1px dashed var(--border-strong)",
      borderRadius: "var(--radius-control)",
      color: "var(--text-secondary)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta-lg)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "image-plus",
    size: 20
  }), "\uC120\uD0DD \xB7 \uC5C6\uC73C\uBA74 \uC81C\uBAA9\uC73C\uB85C \uAE30\uBCF8 \uD45C\uC9C0\uB97C \uB9CC\uB4E4\uC5B4\uC694")), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    disabled: !form.title,
    onClick: () => onAdd({
      id: "m" + Date.now(),
      title: form.title,
      author: form.author,
      manual: true,
      tint: "var(--paper-200)"
    })
  }, "\uB4F1\uB85D"))));
}
Object.assign(window, {
  ShelfScreen,
  AddBookScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/galpi-app/ShelfScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/galpi-app/SocialScreens.jsx
try { (() => {
const {
  ScreenHeader,
  IconButton,
  Button,
  Input,
  Card,
  QuoteCard,
  EmptyState,
  SkeletonQuoteList,
  Icon,
  Switch
} = window.DesignSystem_2c5b3b;
function FeedScreen({
  state,
  retry
}) {
  const [items, setItems] = React.useState(window.GalpiData.feed);
  const like = id => setItems(items.map(f => f.id === id ? {
    ...f,
    liked: !f.liked,
    likes: f.likes + (f.liked ? -1 : 1)
  } : f));
  return /*#__PURE__*/React.createElement(Screen, {
    header: /*#__PURE__*/React.createElement(ScreenHeader, {
      large: true,
      title: "\uD53C\uB4DC",
      actions: /*#__PURE__*/React.createElement(IconButton, {
        icon: "search",
        label: "\uC0AC\uC6A9\uC790 \uAC80\uC0C9"
      })
    })
  }, state === "loading" && /*#__PURE__*/React.createElement(SkeletonQuoteList, {
    count: 3
  }), state === "empty" && /*#__PURE__*/React.createElement(EmptyState, {
    icon: "users",
    title: "\uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C\uC774 \uC5C6\uC5B4\uC694",
    description: "\uB2E4\uB978 \uB3C5\uC790\uB97C \uCC3E\uC544\uBCF4\uC138\uC694",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      iconLeft: "search"
    }, "\uC0AC\uC6A9\uC790 \uAC80\uC0C9")
  }), state === "ready" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      paddingTop: "var(--space-2)"
    }
  }, items.map(f => /*#__PURE__*/React.createElement(QuoteCard, {
    key: f.id,
    by: f.by,
    text: f.text,
    source: f.source,
    author: f.author,
    likes: f.likes,
    liked: f.liked,
    clamp: 0,
    onClick: () => like(f.id)
  }))));
}
function ProfileScreen({
  onLogout,
  books
}) {
  const [pushOn, setPushOn] = React.useState(true);
  const quoteTotal = books.reduce((a, b) => a + b.quoteCount, 0);
  return /*#__PURE__*/React.createElement(Screen, {
    header: /*#__PURE__*/React.createElement(ScreenHeader, {
      large: true,
      title: "\uD504\uB85C\uD544",
      actions: /*#__PURE__*/React.createElement(IconButton, {
        icon: "settings",
        label: "\uC124\uC815"
      })
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-6)",
      paddingTop: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: "var(--primary-soft)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--brown-700)",
      fontFamily: "var(--font-quote)",
      fontSize: 22
    }
  }, "\uC11C"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: 18,
      fontWeight: 600
    }
  }, "\uC11C\uB9B0"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-quote)",
      fontSize: 14,
      color: "var(--text-secondary)",
      marginTop: 2
    }
  }, "\uC811\uC5B4\uB454 \uBB38\uC7A5\uC744 \uB2E4\uC2DC \uD3BC\uCCD0\uBCF4\uB294 \uC0AC\uB78C"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      borderTop: "1px solid var(--border)",
      paddingTop: "var(--space-3)"
    }
  }, [["책", books.length], ["대사", quoteTotal], ["팔로워", 18]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: 18,
      fontWeight: 600
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-meta)",
      color: "var(--text-secondary)",
      marginTop: 2
    }
  }, k)))), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    iconLeft: "search"
  }, "\uC0AC\uC6A9\uC790 \uAC80\uC0C9")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 var(--space-3)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-section)",
      fontWeight: 600
    }
  }, "\uC124\uC815"), /*#__PURE__*/React.createElement(Card, {
    padded: false,
    style: {
      boxShadow: "var(--shadow-1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-4)",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "\uC54C\uB9BC \uBC1B\uAE30",
    description: "\uAE30\uBCF8 \uC54C\uB9BC \uC2DC\uAC04 \xB7 \uC624\uC804 7:30",
    checked: pushOn,
    onChange: setPushOn
  })), ["앱 정보", "이용약관", "개인정보처리방침"].map(r => /*#__PURE__*/React.createElement("button", {
    key: r,
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--space-4)",
      background: "transparent",
      border: "none",
      borderBottom: "1px solid var(--border)",
      cursor: "pointer",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-body)",
      color: "var(--text-primary)"
    }
  }, r, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16,
    color: "var(--text-muted)"
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    style: {
      width: "100%",
      textAlign: "left",
      padding: "var(--space-4)",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-body)",
      color: "var(--error)"
    }
  }, "\uB85C\uADF8\uC544\uC6C3")))));
}
Object.assign(window, {
  FeedScreen,
  ProfileScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/galpi-app/SocialScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/galpi-app/data.js
try { (() => {
// Mock content for the 갈피 UI kit. Titles/quotes are public-domain works.
window.GalpiData = {
  books: [{
    id: "b1",
    title: "데미안",
    author: "헤르만 헤세",
    tint: "var(--brown-100)",
    quoteCount: 3
  }, {
    id: "b2",
    title: "위대한 개츠비",
    author: "F. 스콧 피츠제럴드",
    tint: "var(--paper-200)",
    quoteCount: 2
  }, {
    id: "b3",
    title: "어린 왕자",
    author: "앙투안 드 생텍쥐페리",
    tint: "var(--gold-100)",
    quoteCount: 5
  }, {
    id: "b4",
    title: "노인과 바다",
    author: "어니스트 헤밍웨이",
    tint: "var(--paper-300)",
    quoteCount: 1
  }, {
    id: "b5",
    title: "달빛 아래 첫 문장",
    author: "이서린",
    tint: "var(--success-soft)",
    quoteCount: 4,
    manual: true
  }, {
    id: "b6",
    title: "지킬 박사와 하이드",
    author: "로버트 루이스 스티븐슨",
    tint: "var(--brown-100)",
    quoteCount: 2
  }],
  quotes: {
    b1: [{
      id: "q1",
      character: "싱클레어",
      text: "새는 알에서 나오려고 투쟁한다. 알은 세계다. 태어나려는 자는 한 세계를 파괴해야 한다.",
      note: "처음 읽었을 때 한참 멈춰 있었던 문장.",
      alarms: [{
        time: "07:30",
        repeat: "매일"
      }]
    }, {
      id: "q2",
      character: "데미안",
      text: "우리가 어떤 사람을 미워한다면, 우리는 그의 모습 속에서 우리 자신 안에 있는 무엇인가를 미워하는 것이다."
    }, {
      id: "q3",
      text: "내 안에서 솟아나는 것, 그것을 살아보려 했다."
    }],
    b2: [{
      id: "q4",
      character: "닉 캐러웨이",
      text: "누군가를 비판하고 싶어질 때면, 세상 모든 사람이 너처럼 유리한 처지에 있지 않다는 걸 기억해라.",
      alarms: [{
        time: "22:00",
        repeat: "월·수·금"
      }]
    }, {
      id: "q5",
      character: "개츠비",
      text: "그의 꿈은 너무 가까이 있어서 붙잡지 못할 리 없어 보였다."
    }],
    b3: [{
      id: "q6",
      character: "여우",
      text: "가장 중요한 것은 눈에 보이지 않아.",
      note: "친구에게 그대로 보내줬다."
    }, {
      id: "q7",
      character: "어린 왕자",
      text: "네가 오후 네 시에 온다면, 나는 세 시부터 행복해지기 시작할 거야."
    }],
    b4: [{
      id: "q8",
      text: "인간은 파괴될 수 있지만 패배하지 않는다."
    }],
    b5: [{
      id: "q9",
      character: "서린",
      text: "문장을 접어두는 습관은, 언젠가 다시 만나자는 약속과 같았다."
    }],
    b6: [{
      id: "q10",
      text: "인간은 하나가 아니라 둘이라는 것을, 나는 알게 되었다."
    }]
  },
  searchResults: [],
  // 이제 kakaoBooks.js(카카오 책 검색 API 형태)에서 옵니다.
  feed: [{
    id: "f1",
    by: "밤의독서가",
    text: "가장 중요한 것은 눈에 보이지 않아.",
    source: "어린 왕자",
    author: "앙투안 드 생텍쥐페리",
    likes: 24,
    liked: true
  }, {
    id: "f2",
    by: "도서관고양이",
    text: "인간은 파괴될 수 있지만 패배하지 않는다.",
    source: "노인과 바다",
    author: "어니스트 헤밍웨이",
    likes: 11
  }, {
    id: "f3",
    by: "서린",
    text: "문장을 접어두는 습관은, 언젠가 다시 만나자는 약속과 같았다.",
    source: "달빛 아래 첫 문장",
    author: "이서린",
    likes: 7
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/galpi-app/data.js", error: String((e && e.message) || e) }); }

// ui_kits/galpi-app/kakaoBooks.js
try { (() => {
// Kakao 책 검색 API (GET https://dapi.kakao.com/v3/search/book) → 갈피 book shape.
// Response: { meta:{is_end,pageable_count,total_count}, documents:[{authors,contents,datetime,
//             isbn,price,publisher,sale_price,status,thumbnail,title,url}] }
window.KakaoBooks = {
  // One document → the shape BookRow / Bookshelf / BookCard expect.
  mapDocument(d) {
    const isbn = (d.isbn || "").split(" ").filter(Boolean);
    return {
      id: isbn[1] || isbn[0] || d.url,
      // ISBN13 preferred as the stable key
      title: d.title,
      author: (d.authors || []).join(", "),
      // 저자 여러 명은 콤마로
      cover: d.thumbnail || undefined,
      // 없으면 제목 기본 표지로 폴백
      publisher: d.publisher,
      year: d.datetime ? d.datetime.slice(0, 4) : undefined,
      isbn: isbn[1] || isbn[0],
      soldOut: d.status !== "정상판매",
      source: "KAKAO",
      quoteCount: 0
    };
  },
  map(res) {
    return {
      books: (res.documents || []).map(window.KakaoBooks.mapDocument),
      isEnd: !!(res.meta && res.meta.is_end),
      total: res.meta && res.meta.total_count || 0
    };
  },
  // Mock response in the real API shape — swap for fetch() in production.
  async search(query) {
    const res = {
      meta: {
        is_end: false,
        pageable_count: 100,
        total_count: 150
      },
      documents: [{
        authors: ["헤르만 헤세"],
        contents: "",
        datetime: "2018-10-30T00:00:00.000+09:00",
        isbn: "8937460440 9788937460449",
        price: 9000,
        publisher: "민음사",
        sale_price: 8100,
        status: "정상판매",
        thumbnail: "",
        title: "데미안",
        url: ""
      }, {
        authors: ["헤르만 헤세"],
        contents: "",
        datetime: "2013-05-20T00:00:00.000+09:00",
        isbn: "8937462354 9788937462351",
        price: 10000,
        publisher: "민음사",
        sale_price: 9000,
        status: "정상판매",
        thumbnail: "",
        title: "수레바퀴 아래서",
        url: ""
      }, {
        authors: ["헤르만 헤세"],
        contents: "",
        datetime: "2002-01-05T00:00:00.000+09:00",
        isbn: "8937460432 9788937460432",
        price: 9000,
        publisher: "민음사",
        sale_price: 8100,
        status: "정상판매",
        thumbnail: "",
        title: "싯다르타",
        url: ""
      }, {
        authors: ["헤르만 헤세", "이영임"],
        contents: "",
        datetime: "2011-03-15T00:00:00.000+09:00",
        isbn: "8937462362 9788937462368",
        price: 15000,
        publisher: "민음사",
        sale_price: 13500,
        status: "품절",
        thumbnail: "",
        title: "유리알 유희",
        url: ""
      }]
    };
    await new Promise(r => setTimeout(r, 500));
    return window.KakaoBooks.map(res);
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/galpi-app/kakaoBooks.js", error: String((e && e.message) || e) }); }

__ds_ns.BookCard = __ds_scope.BookCard;

__ds_ns.BookRow = __ds_scope.BookRow;

__ds_ns.Bookshelf = __ds_scope.Bookshelf;

__ds_ns.QuoteCard = __ds_scope.QuoteCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.FloatingButton = __ds_scope.FloatingButton;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.ErrorState = __ds_scope.ErrorState;

__ds_ns.ErrorBanner = __ds_scope.ErrorBanner;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.SkeletonBookGrid = __ds_scope.SkeletonBookGrid;

__ds_ns.SkeletonQuoteList = __ds_scope.SkeletonQuoteList;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.WeekdayPicker = __ds_scope.WeekdayPicker;

__ds_ns.ScreenHeader = __ds_scope.ScreenHeader;

__ds_ns.Segmented = __ds_scope.Segmented;

__ds_ns.TabBar = __ds_scope.TabBar;

})();
