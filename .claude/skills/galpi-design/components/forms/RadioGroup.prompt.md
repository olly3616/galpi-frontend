Single choice from 2–4 stacked rows — 유형(소설/웹소설), 공개 범위(나만 보기/팔로워에게 공개).

```jsx
<RadioGroup label="공개 범위" value={scope}
  options={[{id:"private",label:"나만 보기",description:"기본값이에요"},{id:"followers",label:"팔로워에게 공개"}]}
  onChange={setScope} />
```
