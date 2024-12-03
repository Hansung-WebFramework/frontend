import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import BookmarkArticleItem from "../components/bookmark/BookmarkedArticleItem";
import styles from "./BookmarkPage.module.css";
import { ArticleContext } from '../contexts/ArticleContext';

const BookmarkPage = () => {
  const { articles, updateBookmark } = useContext(ArticleContext);
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(true);

  const displayedArticles = showAll ? articles : articles.filter(article => article.isBookmarked);

  const handleNavigateToAnalysis = (articleId) => {
    if (!articleId) {
      console.error("Invalid article ID");
      return;
    }
    navigate(`/AnalysisPage/${articleId}`);
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-end p-4">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {showAll ? '북마크된 기사만 보기' : '모든 기사 보기'}
        </button>
      </div>
      <div className={styles.gridContainer}>
        {displayedArticles.map((article) => (
          <BookmarkArticleItem
            key={article.id}
            article={article}
            isBookmarked={article.isBookmarked || false}
            onClick={() => handleNavigateToAnalysis(article.id)}
            onToggleBookmark={() => updateBookmark(article.id, article.isBookmarked || false)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarkPage;
