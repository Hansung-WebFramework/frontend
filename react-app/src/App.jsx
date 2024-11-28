import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnalysisPage from "./pages/AnalysisPage";
import ScrapPage from "./pages/ScrapPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/AnalysisPage" element={<AnalysisPage />} />{" "}
        {/* 분석 차트 페이지 라우팅 */}
        <Route path="/scrap" element={<ScrapPage />} />
      </Routes>
    </Router>
  );
}
