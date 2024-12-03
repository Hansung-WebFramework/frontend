import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import BookmarkArticleItem from "../components/bookmark/BookmarkedArticleItem";
import styles from "./BookmarkPage.module.css"; // 스타일 추가

const BookmarkPage = () => {
  const [articles, setArticles] = useState([]);
  const [setLoading] = useState(true);
  const navigate = useNavigate();

  // API 데이터 가져오기
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/bookmarks");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleNavigateToAnalysis = (articleId) => {
    if (!articleId) {
      console.error("Invalid article ID");
      return;
    }
    navigate(`/AnalysisPage/${articleId}`); // AnalysisPage로 이동
  };

  const handleToggleBookmark = useCallback(async (articleId) => {
    try {
      await axios.delete(`/bookmarks/${String(articleId)}`);
      setArticles((prev) =>
        prev.filter((article) => article.id !== String(articleId))
      ); // 수정된 부분
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.gridContainer}>
        {articles.map((article) => (
          <BookmarkArticleItem
            key={article.id}
            article={article}
            isBookmarked={true}
            onClick={() => handleNavigateToAnalysis(article.id)} // 페이지 이동 핸들러 전달
            onToggleBookmark={() => handleToggleBookmark(article.id)} // 북마크 제거 핸들러 전달
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarkPage;
