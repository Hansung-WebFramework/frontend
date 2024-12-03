import PropTypes from 'prop-types';
import Bookmark from '../bookmark/Bookmark';

export default function SelectedArticle({ article, onClick, onToggleBookmark }) {
    if (!article) return null;

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <Bookmark
                isBookmarked={article.isBookmarked || false}
                onToggle={onToggleBookmark}
            />
            <div className="relative">
                <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    본석 페이지
                </span>
                <img
                    src={article.originalArticle.image}
                    alt={article.title}
                    className="w-full h-[300px] object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 bg-pink-500 rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                        {article.accuracy}%
                    </span>
                </div>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-bold">{article.title}</h2>
                <p className="text-sm text-gray-600">{article.summary}</p>
            </div>
            <button
                onClick={onClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            >
                뉴스 요약 및 페이지 이동
            </button>
        </div>
    );
}

SelectedArticle.propTypes = {
    article: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
};
