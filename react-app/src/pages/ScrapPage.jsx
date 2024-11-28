import { useState, useEffect } from "react";
import BookmarkedArticleList from "../components/bookmark/BookmarkedArticleList";
import Navbar from "../components/layout/Navbar";
import { articles } from "../data/articles"; // Mock 데이터를 import

export default function ScrapPage() {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 북마크 ID 로드
    localStorage.setItem(
      "bookmarkedIds",
      JSON.stringify([1, 2, 3, 4, 5, 6, 7])
    ); // 초기 북마크 설정
    const storedIds = JSON.parse(localStorage.getItem("bookmarkedIds")) || [];
    setBookmarkedIds(storedIds);

    // 북마크된 기사 필터링
    const filteredArticles = articles.filter((article) =>
      storedIds.includes(article.id)
    );
    setBookmarkedArticles(filteredArticles);
  }, []);

  const handleBookmark = (id) => {
    // 북마크 제거
    const updatedIds = bookmarkedIds.filter(
      (bookmarkedId) => bookmarkedId !== id
    );
    setBookmarkedIds(updatedIds);
    localStorage.setItem("bookmarkedIds", JSON.stringify(updatedIds));

    // 북마크 리스트 업데이트
    setBookmarkedArticles((prevArticles) =>
      prevArticles.filter((article) => article.id !== id)
    );
  };

  const handleArticleSelect = (article) => {
    console.log("Selected article:", article);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {bookmarkedArticles.length === 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Scrap Page</h2>
            <p className="text-gray-700">No bookmarked articles.</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6">Bookmarked News</h2>
            <BookmarkedArticleList
              articles={bookmarkedArticles}
              onArticleSelect={handleArticleSelect}
              onBookmark={handleBookmark}
            />
          </>
        )}
      </div>
    </>
  );
}
