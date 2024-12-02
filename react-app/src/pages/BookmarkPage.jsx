// src/pages/BookmarkPage.jsx
import { useState, useEffect } from "react";
import ArticleItem from "../components/articles/ArticleItem";
import BookmarkedArticleItem from "../components/bookmark/BookmarkedArticleItem";
import Navbar from "../components/layout/Navbar";
import axios from "axios";

const BookmarkPage = () => {
  const [articles, setArticles] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  useEffect(() => {
    // Fetch articles from the mock API
    axios.get("/bookmarks").then((response) => setArticles(response.data));
  }, []);

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleArticleClick = (article) => {
    // Handle article click, e.g., navigate to article detail
    window.open(article.link, "_blank");
  };

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* All Articles Section */}
        <h1 className="text-2xl font-bold mb-4">All Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleItem
              key={article.id}
              article={article}
              isBookmarked={bookmarkedIds.has(article.id)}
              onBookmark={toggleBookmark}
              onClick={handleArticleClick}
            />
          ))}
        </div>

        {/* Bookmarked Articles Section */}
        <h1 className="text-2xl font-bold mt-8 mb-4">Bookmarked Articles</h1>
        {bookmarkedIds.size === 0 ? (
          <p>No bookmarked articles.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles
              .filter((article) => bookmarkedIds.has(article.id))
              .map((article) => (
                <BookmarkedArticleItem
                  key={article.id}
                  article={article}
                  onBookmark={toggleBookmark}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPage;
