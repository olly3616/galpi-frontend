The centrepiece card — a recorded 대사, set in serif with a left quote rule.

```jsx
<QuoteCard character="개츠비" text="그래서 우리는…" hasAlarm hasNote onClick={open} />
<QuoteCard by="도서관고양이" text="…" source="위대한 개츠비" author="피츠제럴드" likes={12} />
<QuoteCard text="…" clamp={0} />   {/* 대사 상세: no clamp */}
```

On feed cards `source` is mandatory. Bell icon = notification set, note icon = memo attached.
