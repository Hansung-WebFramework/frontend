import { HttpResponse, http } from "msw";
import dummy from "./dummy.json";
import analysis from "./analysis.json";
import onboardingMock from "./OnboardingMock.js"; // 온보딩 데이터 가져오기
import { chartMockData } from "./AnalysischartMock.js"; // 차트 데이터 가져오기
import bookmarkData from "./bookmarkMock.json";

let bookmarkMock = [...bookmarkData];

export const handlers = [
  // 기존 /dummy 엔드포인트
  http.get("/dummy", () => {
    return HttpResponse.json(dummy);
  }),

  // 기존 /analysis 엔드포인트
  http.get("/analysis", () => {
    return HttpResponse.json(analysis);
  }),

  http.get("/bookmarks", () => {
    return HttpResponse.json(bookmarkMock);
  }),

  http.delete("/bookmarks/:id", ({ params }) => {
    const { id } = params;
    const bookmarkId = String(id);

    const index = bookmarkMock.findIndex(
      (bookmark) => bookmark.id === bookmarkId
    );

    if (index !== -1) {
      bookmarkMock.splice(index, 1);
      return HttpResponse.json(
        { message: "Bookmark deleted" },
        { status: 200 }
      );
    } else {
      return HttpResponse.json(
        { error: "Bookmark not found" },
        { status: 404 }
      );
    }
  }),

  // 새로 추가: /api/stats 엔드포인트
  http.get("/api/stats", () => {
    return HttpResponse.json({
      articles: onboardingMock.articles,
      trustLevel: onboardingMock.trustLevel,
      highTrustArticles: onboardingMock.highTrustArticles,
    });
  }),

  // 새로 추가: /api/chart 엔드포인트
  http.get("/api/chart", () => {
    return HttpResponse.json(chartMockData);
  }),
];
