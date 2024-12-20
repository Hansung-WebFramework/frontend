import PropTypes from "prop-types";
import Bookmark from "./Bookmark";

export default function BookmarkArticleItem({
  article,
  isBookmarked,
  onToggleBookmark,
  onClick,
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transform transition-all duration-300 relative ${
        !isBookmarked ? 'opacity-50' : ''
      }`} // 북마크되지 않은 기사의 투명도 조절
      onClick={() => onClick(article)}
    >
      <div className="relative w-full h-[200px]">
        <img
          src={article.originalArticle.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* 북마크 아이콘 */}
        <Bookmark
          isBookmarked={isBookmarked}
          onToggle={onToggleBookmark}
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm text-gray-900 line-clamp-2">
          {article.title}
        </h3>
      </div>
    </div>
  );
}

BookmarkArticleItem.propTypes = {
  article: PropTypes.object.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
