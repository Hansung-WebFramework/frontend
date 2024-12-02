// src/components/articles/ArticleItem.jsx
import PropTypes from "prop-types";
import Bookmark from "../bookmark/Bookmark";

const ArticleItem = ({ article, isBookmarked, onBookmark, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow relative"
      onClick={() => onClick(article)}
    >
      {/* Bookmark Icon */}
      <Bookmark
        isBookmarked={isBookmarked}
        onToggle={() => onBookmark(article.id)}
      />

      {/* Article Image with Hover Effect */}
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-32 object-cover transition-transform duration-300 transform hover:scale-105"
      />

      {/* Article Title */}
      <div className="p-3">
        <h3 className="font-medium text-sm text-gray-900">{article.title}</h3>
      </div>
    </div>
  );
};

ArticleItem.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    // Add other fields if necessary
  }).isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  onBookmark: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ArticleItem;
