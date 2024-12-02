// src/components/bookmark/BookmarkedArticleItem.jsx
import PropTypes from "prop-types";

const BookmarkedArticleItem = ({ article, onBookmark }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
    {/* Bookmark Icon */}
    <div
      className="absolute top-2 right-2 text-yellow-500 cursor-pointer text-xl"
      onClick={() => onBookmark(article.id)}
    >
      ★
    </div>

    {/* Article Image */}
    <img
      src={article.image}
      alt={article.title}
      className="w-full h-48 object-cover"
    />

    {/* Article Details */}
    <div className="p-4">
      <h2 className="text-lg font-semibold">{article.title}</h2>
      <p className="text-sm text-gray-600">By {article.author}</p>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline mt-2 block"
      >
        Read more
      </a>
    </div>
  </div>
);

BookmarkedArticleItem.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    // Add other fields if necessary
  }).isRequired,
  onBookmark: PropTypes.func.isRequired,
};

export default BookmarkedArticleItem;
