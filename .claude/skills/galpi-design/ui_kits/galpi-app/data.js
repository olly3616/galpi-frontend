// Mock content for the 갈피 UI kit. Titles/quotes are public-domain works.
window.GalpiData = {
  books: [
    { id: "b1", title: "데미안", author: "헤르만 헤세", tint: "var(--brown-100)", quoteCount: 3 },
    { id: "b2", title: "위대한 개츠비", author: "F. 스콧 피츠제럴드", tint: "var(--paper-200)", quoteCount: 2 },
    { id: "b3", title: "어린 왕자", author: "앙투안 드 생텍쥐페리", tint: "var(--gold-100)", quoteCount: 5 },
    { id: "b4", title: "노인과 바다", author: "어니스트 헤밍웨이", tint: "var(--paper-300)", quoteCount: 1 },
    { id: "b5", title: "달빛 아래 첫 문장", author: "이서린", tint: "var(--success-soft)", quoteCount: 4, manual: true },
    { id: "b6", title: "지킬 박사와 하이드", author: "로버트 루이스 스티븐슨", tint: "var(--brown-100)", quoteCount: 2 },
  ],
  quotes: {
    b1: [
      { id: "q1", character: "싱클레어", text: "새는 알에서 나오려고 투쟁한다. 알은 세계다. 태어나려는 자는 한 세계를 파괴해야 한다.", note: "처음 읽었을 때 한참 멈춰 있었던 문장.", alarms: [{ time: "07:30", repeat: "매일" }] },
      { id: "q2", character: "데미안", text: "우리가 어떤 사람을 미워한다면, 우리는 그의 모습 속에서 우리 자신 안에 있는 무엇인가를 미워하는 것이다." },
      { id: "q3", text: "내 안에서 솟아나는 것, 그것을 살아보려 했다." },
    ],
    b2: [
      { id: "q4", character: "닉 캐러웨이", text: "누군가를 비판하고 싶어질 때면, 세상 모든 사람이 너처럼 유리한 처지에 있지 않다는 걸 기억해라.", alarms: [{ time: "22:00", repeat: "월·수·금" }] },
      { id: "q5", character: "개츠비", text: "그의 꿈은 너무 가까이 있어서 붙잡지 못할 리 없어 보였다." },
    ],
    b3: [
      { id: "q6", character: "여우", text: "가장 중요한 것은 눈에 보이지 않아.", note: "친구에게 그대로 보내줬다." },
      { id: "q7", character: "어린 왕자", text: "네가 오후 네 시에 온다면, 나는 세 시부터 행복해지기 시작할 거야." },
    ],
    b4: [{ id: "q8", text: "인간은 파괴될 수 있지만 패배하지 않는다." }],
    b5: [{ id: "q9", character: "서린", text: "문장을 접어두는 습관은, 언젠가 다시 만나자는 약속과 같았다." }],
    b6: [{ id: "q10", text: "인간은 하나가 아니라 둘이라는 것을, 나는 알게 되었다." }],
  },
  searchResults: [], // 이제 kakaoBooks.js(카카오 책 검색 API 형태)에서 옵니다.
  feed: [
    { id: "f1", by: "밤의독서가", text: "가장 중요한 것은 눈에 보이지 않아.", source: "어린 왕자", author: "앙투안 드 생텍쥐페리", likes: 24, liked: true },
    { id: "f2", by: "도서관고양이", text: "인간은 파괴될 수 있지만 패배하지 않는다.", source: "노인과 바다", author: "어니스트 헤밍웨이", likes: 11 },
    { id: "f3", by: "서린", text: "문장을 접어두는 습관은, 언젠가 다시 만나자는 약속과 같았다.", source: "달빛 아래 첫 문장", author: "이서린", likes: 7 },
  ],
};
