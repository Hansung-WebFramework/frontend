import "./AccuracyCircle.css";
import PropTypes from "prop-types"; // prop-types 임포트

const AccuracyCircle = ({ accuracy }) => {
  // wave 높이 계산: accuracy에 비례하여 위치 설정
  const waveHeight = 100 - accuracy; // accuracy가 높을수록 wave 높이는 낮아짐

  return (
    <div className="circle-container">
      <div className="circle">
        <div
          className="ocean"
          style={{ "--wave-top": `${waveHeight}%` }} // CSS 변수로 전달
        >
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
        <div className="accuracy-text">{accuracy}%</div>
      </div>
    </div>
  );
};

// prop-types를 사용한 타입 정의
AccuracyCircle.propTypes = {
  accuracy: PropTypes.number.isRequired, // accuracy는 필수 숫자 타입
};

export default AccuracyCircle;
