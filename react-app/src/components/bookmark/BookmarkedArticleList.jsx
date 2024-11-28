import PropTypes from "prop-types";
import BookmarkedArticleItem from "./BookmarkedArticleItem";
import Pagination from "../articles/Pagination";

export default function BookmarkedArticleList({
  articles,
  onArticleSelect,
  onBookmark,
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {articles.map((article) => (
          <BookmarkedArticleItem
            key={article.id}
            article={article}
            onClick={onArticleSelect}
            onBookmark={onBookmark}
            isBookmarked={true}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
}

BookmarkedArticleList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onArticleSelect: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
};
