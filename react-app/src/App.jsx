import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnalysisPage from './pages/AnalysisPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/AnalysisPage/:id" element={<AnalysisPage />} /> {/* 분석 차트 페이지 라우팅 */}
      </Routes>
    </Router>
  );
}
