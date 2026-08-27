Top bar for every app screen.

```jsx
<ScreenHeader large title="내 책장" actions={<><IconButton icon="search" label="검색"/><IconButton icon="plus" label="책 추가"/></>} />
<ScreenHeader title="대사 기록" onBack={cancel} actions={<Button variant="text">저장</Button>} />
```

Header background matches the page (ivory), never white — the page should feel like one sheet.
