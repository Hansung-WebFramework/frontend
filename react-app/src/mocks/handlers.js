import { HttpResponse, http } from "msw";
import dummy from "./dummy.json";
import analysis from "./analysis.json";

export const handlers = [
  http.get("/dummy", () => {
    return HttpResponse.json(dummy);
  }),

  // 분석 차트 페이지용 Mock API
  http.get("/analysis", () => {
    return HttpResponse.json(analysis);
  })
];
