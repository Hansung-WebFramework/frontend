import { HttpResponse, http } from "msw";
import dummy from "./dummy.json";
import analysis from "./analysis.json";
import onboardingMock from "./OnboardingMock.js"; // 온보딩 데이터 가져오기
import { chartMockData } from "./AnalysischartMock.js"; // 차트 데이터 가져오기

let analysisData = [...analysis];

export const handlers = [
  // GET /dummy 엔드포인트
  http.get("/dummy", () => {
    return HttpResponse.json(dummy);
  }),

  // GET /analysis 엔드포인트
  http.get("/analysis", () => {
    return HttpResponse.json(analysisData);
  }),

  // GET /bookmarks 엔드포인트
  http.get("/bookmarks", () => {
    const bookmarkedArticles = analysisData.filter((article) => article.isBookmarked);
    return HttpResponse.json(bookmarkedArticles);
  }),

  // POST /bookmarks 엔드포인트: 북마크 추가
  http.post("/bookmarks", async (req) => {
    const { id } = await req.json();
    analysisData = analysisData.map((article) =>
      article.id === id ? { ...article, isBookmarked: true } : article
    );
    return HttpResponse.json({ success: true });
  }),

  // DELETE /bookmarks/:id 엔드포인트: 북마크 제거
  http.delete("/bookmarks/:id", (req) => {
    const { id } = req.params;
    analysisData = analysisData.map((article) =>
      article.id === id ? { ...article, isBookmarked: false } : article
    );
    return HttpResponse.json({ success: true });
  }),

  // GET /api/stats 엔드포인트
  http.get("/api/stats", () => {
    return HttpResponse.json({
      articles: onboardingMock.articles,
      trustLevel: onboardingMock.trustLevel,
      highTrustArticles: onboardingMock.highTrustArticles,
    });
  }),

  // GET /api/chart 엔드포인트
  http.get("/api/chart", () => {
    return HttpResponse.json(chartMockData);
  }),
];
