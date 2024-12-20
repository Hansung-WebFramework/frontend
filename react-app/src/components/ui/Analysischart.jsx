import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Loader from '../Loader'; // Loader 컴포넌트

export default function AnalysisChart({ data }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const currentDate = new Date();
  
  const handleButtonClick = () => {
    setLoading(true); // 로딩 시작
    setTimeout(() => {
      navigate('/IdentifiedArticlesPage');
      // 로딩 상태를 해제하지 않고 다음 페이지에서 로딩 상태를 관리함
    }, 1500);
  };

  return (
    <div style={{ width: '100%', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
      {loading && <Loader />}
      {/* 제목 섹션 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '-60px',
          marginBottom: '30px',
        }}
      >
        <hr
          style={{
            width: '100%',
            border: 'none',
            borderTop: '4px solid #4B5563',
            marginRight: '50px',
          }}
        />
        <h2
          style={{
            fontFamily: 'Amethysta, serif',
            fontSize: '40px',
            fontWeight: 'bold',
            color: '#111827',
          }}
        >
          {`${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}`}
        </h2>
        <hr
          style={{
            width: '100%',
            border: 'none',
            borderTop: '4px solid #4B5563',
            marginLeft: '50px',
          }}
        />
      </div>

      {/* 버튼 */}
      <div style={{ marginBottom: '20px', textAlign: 'right', marginRight: '100px' }}>
        <button
          onClick={handleButtonClick}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#000000',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: 0,
          }}
        >
          신뢰도 높은 기사 보러가기 →
        </button>
      </div>

      {/* 차트 */}
      <div>
        <LineChart width={1100} height={300} data={data} style={{ margin: '20px auto' }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
          <XAxis dataKey="date" stroke="#4B5563" />
          <YAxis stroke="#4B5563" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#4B5563" strokeWidth={2} />
        </LineChart>
      </div>
    </div>
  );
}

// Add prop validation
AnalysisChart.propTypes = {
  data: PropTypes.array.isRequired,  // Add prop type validation for 'data'
};
