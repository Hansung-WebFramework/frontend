import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/layout/Navbar";
import AnalysisChart from "../components/ui/Analysischart";
import styles from "./OnBoardingPage.module.css";
import OnboardingObject from "../assets/images/OnBoardingObject.png";

export default function OnboardingPage() {
  const [stats, setStats] = useState({ articles: 0, trustLevel: 0, highTrustArticles: 0 });
  const [chartData, setChartData] = useState([]);
  const [articles, setArticles] = useState([]);
  const sliderRef = useRef(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);

  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    };

    const fetchChart = async () => {
      const res = await fetch("/api/chart");
      const data = await res.json();
      setChartData(data);
    };

    const fetchArticles = async () => {
      const res = await fetch("/analysis");
      const data = await res.json();
      setArticles([...data, ...data]); // 무한 스크롤용 데이터 복제
    };

    fetchStats();
    fetchChart();
    fetchArticles();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transform = "translateY(0)";
            entry.target.style.opacity = "1";
          } else {
            entry.target.style.transform = "translateY(50px)";
            entry.target.style.opacity = "0";
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

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX || e.touches[0].pageX;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX.current) * 0.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
    velocity.current = walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    applyMomentum();
  };

  const applyMomentum = () => {
    if (Math.abs(velocity.current) < 0.1) return;
    sliderRef.current.scrollLeft -= velocity.current;
    velocity.current *= 0.8;
    requestAnimationFrame(applyMomentum);
  };

  const handleScroll = () => {
    const slider = sliderRef.current;
    const maxScroll = slider.scrollWidth / 2;

    if (slider.scrollLeft <= 0) {
      slider.scrollLeft = maxScroll - 1;
    } else if (slider.scrollLeft >= maxScroll) {
      slider.scrollLeft = 1;
    }
  };

  const disableDrag = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <NavBar />

      <section className={styles["chart-section"]}>
        <div className={styles["chart-background"]} />
        <div className={styles["chart-container"]}>
          <AnalysisChart data={chartData} />
        </div>
      </section>

      <section className={styles["second-section"]}>
        <div className={styles["stats-container"]}>
          <div className={styles["stat-item"]}>
            <h2 className="text-3xl font-bold">{stats.articles}</h2>
            <p className="text-base">일주일 간 분석한 뉴스 기사 수</p>
          </div>
          <div className={styles["stat-item"]}>
            <h2 className="text-3xl font-bold">{stats.trustLevel}%</h2>
            <p className="text-base">평균 신뢰도</p>
          </div>
          <div className={styles["stat-item"]}>
            <h2 className="text-3xl font-bold">{stats.highTrustArticles}</h2>
            <p className="text-base">신뢰도 80% 이상 기사</p>
          </div>
        </div>

        <div className="text-center mt-12 mb-12">
          <h2
            ref={titleRef}
            className="font-amethysta text-4xl font-bold mb-4"
            style={{
              transform: "translateY(50px)",
              opacity: "0",
              transition: "transform 0.6s ease, opacity 0.6s ease",
            }}
          >
            Check Today News
          </h2>
          <p
            ref={descriptionRef}
            className="text-sm text-gray-700"
            style={{
              transform: "translateY(50px)",
              opacity: "0",
              transition: "transform 0.8s ease, opacity 0.8s ease",
            }}
          >
            매일매일 판별 되는 뉴스 기사
          </p>
          <button
            ref={buttonRef}
            className={styles["news-button"]}
            style={{
              transform: "translateY(50px)",
              opacity: "0",
              transition: "transform 1s ease, opacity 1s ease",
            }}
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
                width: "150px",
                height: "auto",
                transition: "transform 1.2s ease, opacity 1.2s ease",
                transform: "translateY(50px)",
                opacity: "0",
                marginBottom: "30px",
              }}
              onDragStart={disableDrag}
            />
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="font-amethysta text-4xl font-bold">Today's recommended article</h2>
        </div>

        <div
          ref={sliderRef}
          className={styles["slider"]}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          onScroll={handleScroll}
        >
          {articles.map((article, index) => (
            <div
              key={index}
              className={styles["slider-item"]}
              onDragStart={disableDrag}
              style={{ userSelect: "none" }}
            >
              <img
                src={article.originalArticle.image}
                alt={article.title}
                className={styles["slider-image"]}
                onDragStart={disableDrag}
              />
              <p className={styles["slider-title"]}>{article.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
