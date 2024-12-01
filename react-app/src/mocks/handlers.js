import { HttpResponse, http } from "msw";
import dummy from "./dummy.json";
import analysis from "./analysis.json";
import onboardingMock from "./OnboardingMock.js"; // 온보딩 데이터 가져오기
import { chartMockData } from "./AnalysischartMock.js"; // 차트 데이터 가져오기

export const handlers = [
  // 기존 /dummy 엔드포인트
  http.get("/dummy", () => {
    return HttpResponse.json(dummy);
  }),

  // 기존 /analysis 엔드포인트
  http.get("/analysis", () => {
    return HttpResponse.json(analysis);
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
