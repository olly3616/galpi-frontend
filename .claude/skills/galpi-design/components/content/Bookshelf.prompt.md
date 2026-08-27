The 내 책장 display: covers standing face-out on wooden planks, three to a row. Tapping a book opens that book's 대사 모음 (S-05).

```jsx
<Bookshelf books={books} perRow={3} onSelect={openBook} />
```

Use this instead of a flat `BookCard` grid on the shelf screen; `BookCard` remains for lists and other contexts. Covers come from the books API via `cover`; without one, a typographic fallback is drawn from the title.
