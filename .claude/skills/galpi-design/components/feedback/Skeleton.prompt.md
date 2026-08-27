Loading placeholder — skeleton first, always. Spinners only appear inside a Button.

```jsx
<SkeletonBookGrid columns={3} count={6} />
<SkeletonQuoteList count={3} />
<Skeleton height={20} width="70%" />
```

Blocks are --surface-skeleton with a slow opacity shimmer; never grey-blue, never a pulse that flashes.
