import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import OnBoardingPage from './pages/OnBoardingPage';
import IdentifiedArticlesPage from './pages/IdentifiedArticlesPage';
import AnalysisPage from './pages/AnalysisPage';
import SearchResultsPage from './pages/SearchResultsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/OnboardingPage" element={<OnBoardingPage />} /> 온보딩 페이지 라우팅 */}
        <Route path="/IdentifiedArticlesPage" element={<IdentifiedArticlesPage />} /> {/* 판별 기사 목록 페이지 라우팅 */}
        <Route path="/AnalysisPage/:id" element={<AnalysisPage />} /> {/* 분석 차트 페이지 라우팅 */}
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </Router>
  );
}
