// Kakao 책 검색 API (GET https://dapi.kakao.com/v3/search/book) → 갈피 book shape.
// Response: { meta:{is_end,pageable_count,total_count}, documents:[{authors,contents,datetime,
//             isbn,price,publisher,sale_price,status,thumbnail,title,url}] }
window.KakaoBooks = {
  // One document → the shape BookRow / Bookshelf / BookCard expect.
  mapDocument(d) {
    const isbn = (d.isbn || "").split(" ").filter(Boolean);
    return {
      id: isbn[1] || isbn[0] || d.url,          // ISBN13 preferred as the stable key
      title: d.title,
      author: (d.authors || []).join(", "),      // 저자 여러 명은 콤마로
      cover: d.thumbnail || undefined,           // 없으면 제목 기본 표지로 폴백
      publisher: d.publisher,
      year: d.datetime ? d.datetime.slice(0, 4) : undefined,
      isbn: isbn[1] || isbn[0],
      soldOut: d.status !== "정상판매",
      source: "KAKAO",
      quoteCount: 0,
    };
  },
  map(res) {
    return {
      books: (res.documents || []).map(window.KakaoBooks.mapDocument),
      isEnd: !!(res.meta && res.meta.is_end),
      total: (res.meta && res.meta.total_count) || 0,
    };
  },
  // Mock response in the real API shape — swap for fetch() in production.
  async search(query) {
    const res = {
      meta: { is_end: false, pageable_count: 100, total_count: 150 },
      documents: [
        { authors: ["헤르만 헤세"], contents: "", datetime: "2018-10-30T00:00:00.000+09:00", isbn: "8937460440 9788937460449", price: 9000, publisher: "민음사", sale_price: 8100, status: "정상판매", thumbnail: "", title: "데미안", url: "" },
        { authors: ["헤르만 헤세"], contents: "", datetime: "2013-05-20T00:00:00.000+09:00", isbn: "8937462354 9788937462351", price: 10000, publisher: "민음사", sale_price: 9000, status: "정상판매", thumbnail: "", title: "수레바퀴 아래서", url: "" },
        { authors: ["헤르만 헤세"], contents: "", datetime: "2002-01-05T00:00:00.000+09:00", isbn: "8937460432 9788937460432", price: 9000, publisher: "민음사", sale_price: 8100, status: "정상판매", thumbnail: "", title: "싯다르타", url: "" },
        { authors: ["헤르만 헤세", "이영임"], contents: "", datetime: "2011-03-15T00:00:00.000+09:00", isbn: "8937462362 9788937462368", price: 15000, publisher: "민음사", sale_price: 13500, status: "품절", thumbnail: "", title: "유리알 유희", url: "" },
      ],
    };
    await new Promise((r) => setTimeout(r, 500));
    return window.KakaoBooks.map(res);
  },
};
