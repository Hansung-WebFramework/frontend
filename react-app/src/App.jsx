import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OnBoardingPage from './pages/OnBoardingPage'; // 온보딩 페이지 경로 확인
import IdentifiedArticlesPage from './pages/IdentifiedArticlesPage';
import AnalysisPage from './pages/AnalysisPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 온보딩 페이지 라우팅 */}
        <Route path="/OnboardingPage" element={<OnBoardingPage />} />
        
        {/* 판별 기사 목록 페이지 라우팅 */}
        <Route path="/IdentifiedArticlesPage" element={<IdentifiedArticlesPage />} />
        
        {/* 분석 차트 페이지 라우팅 (동적 파라미터 id 추가) */}
        <Route path="/AnalysisPage/:id" element={<AnalysisPage />} />
      </Routes>
    </Router>
  );
}
