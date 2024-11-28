import PropTypes from "prop-types";
import { Bookmark } from "lucide-react";

export default function BookmarkedArticleItem({
  article,
  onClick,
  onBookmark,
  isBookmarked,
}) {
  return (
    <div className="group relative overflow-hidden transition-all hover:shadow-lg bg-white rounded-lg">
      {" "}
      {/* 그룹 클래스 추가 */}
      <div className="relative h-48">
        {/* 이미지 확대 효과 */}
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {/* 북마크 버튼 */}
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-transparent hover:bg-white/20 focus:ring-2 focus:ring-red-500"
          onClick={() => onBookmark(article.id)}
        >
          <Bookmark
            className={`h-5 w-5 ${
              isBookmarked ? "fill-red-500 drop-shadow-md" : "stroke-white"
            }`}
          />
        </button>
      </div>
      {/* 콘텐츠 영역 */}
      <div className="p-4">
        <h3
          className="text-lg font-semibold line-clamp-2 mb-2 cursor-pointer"
          onClick={() => onClick(article)}
        >
          {article.title}
        </h3>
      </div>
    </div>
  );
}

BookmarkedArticleItem.propTypes = {
  article: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
};
