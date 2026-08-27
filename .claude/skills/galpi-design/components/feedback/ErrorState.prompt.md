Failure state with a retry — used whenever a list fails to load.

```jsx
<ErrorState title="책장을 불러오지 못했습니다" description="네트워크를 확인하고 다시 시도해주세요" onRetry={reload} />
<ErrorBanner>이메일 또는 비밀번호가 올바르지 않습니다</ErrorBanner>
```

Copy stays short and kind; a retry button is mandatory on full-screen errors.
