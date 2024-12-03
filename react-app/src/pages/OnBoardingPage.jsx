import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/layout/Navbar';
import AnalysisChart from '../components/ui/Analysischart';
import styles from './OnBoardingPage.module.css';
import OnboardingObject from '../assets/images/OnBoardingObject.png';
import Loader from '../components/Loader'; // Loader 컴포넌트

export default function OnboardingPage() {
  const [stats, setStats] = useState({ articles: 0, trustLevel: 0, highTrustArticles: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate(); // useNavigate 초기화

  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    };

    const fetchChart = async () => {
      const res = await fetch('/api/chart');
      const data = await res.json();
      setChartData(data);
    };

    fetchStats();
    fetchChart();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
          } else {
            entry.target.style.transform = 'translateY(50px)';
            entry.target.style.opacity = '0';
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = [imageRef.current, titleRef.current, descriptionRef.current, buttonRef.current];
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleButtonClick = () => {
    setLoading(true); // 로딩 시작
    setTimeout(() => {
      navigate('/IdentifiedArticlesPage');
    }, 1500);
  };

  return (
    <>
      {loading && <Loader />}
      <div>
        <NavBar />

        <section className={styles['chart-section']}>
          <div className={styles['chart-background']} />
          <div className={styles['chart-container']}>
            <AnalysisChart data={chartData} />
          </div>
        </section>

        <section className={styles['second-section']}>
          <div className={styles['stats-container']}>
            <div className={styles['stat-item']}>
              <h2 className="text-3xl font-bold">{stats.articles}</h2>
              <p className="text-base">일주일 간 분석한 뉴스 기사 수</p>
            </div>
            <div className={styles['stat-item']}>
              <h2 className="text-3xl font-bold">{stats.trustLevel}%</h2>
              <p className="text-base">평균 신뢰도</p>
            </div>
            <div className={styles['stat-item']}>
              <h2 className="text-3xl font-bold">{stats.highTrustArticles}</h2>
              <p className="text-base">신뢰도 80% 이상 기사</p>
            </div>
          </div>
          <div className="text-center mt-12 mb-12">
            <h2
              ref={titleRef}
              className="font-amethysta text-4xl font-bold mb-4"
              style={{
                transform: 'translateY(50px)',
                opacity: '0',
                transition: 'transform 0.6s ease, opacity 0.6s ease',
              }}
            >
              Check Today News
            </h2>
            <p
              ref={descriptionRef}
              className="text-sm text-gray-700"
              style={{
                transform: 'translateY(50px)',
                opacity: '0',
                transition: 'transform 0.8s ease, opacity 0.8s ease',
              }}
            >
              매일매일 판별 되는 뉴스 기사
            </p>
            <button
              ref={buttonRef}
              className={styles['news-button']}
              style={{
                transform: 'translateY(50px)',
                opacity: '0',
                transition: 'transform 1s ease, opacity 1s ease',
              }}
              onClick={handleButtonClick}
            >
              보러가기 &gt;&gt;
            </button>
            <div className="mt-8">
              <img
                ref={imageRef}
                src={OnboardingObject}
                alt="Onboarding Graphic"
                className="mx-auto"
                style={{
                  width: '150px',
                  height: 'auto',
                  transition: 'transform 1.2s ease, opacity 1.2s ease',
                  transform: 'translateY(50px)',
                  opacity: '0',
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
