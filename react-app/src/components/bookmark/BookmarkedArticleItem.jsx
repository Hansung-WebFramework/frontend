import PropTypes from "prop-types";
import ArticleItem from "../articles/ArticleItem";
import Bookmark from "./Bookmark";

const BookmarkArticleItem = ({
  article,
  isBookmarked,
  onToggleBookmark,
  onClick,
}) => {
  return (
    <div className="relative" onClick={onClick}>
      {/* 기존 ArticleItem 컴포넌트 */}
      <ArticleItem article={article} />

      {/* Bookmark 컴포넌트 */}
      <Bookmark
        isBookmarked={isBookmarked}
        onToggle={() => onToggleBookmark(article.id)}
      />
    </div>
  );
};

BookmarkArticleItem.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    originalArticle: PropTypes.shape({
      image: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onClick: PropTypes.func, // 추가된 부분
};

export default BookmarkArticleItem;
