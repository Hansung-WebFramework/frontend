import PropTypes from 'prop-types';

export default function ArticleItem({ article, onClick }) {
    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onClick(article)}
        >
            {/* 이미지가 칸 안에서 크기를 유지하도록 수정 */}
            <div className="w-full h-32 relative">
                <img
                    src={article.originalArticle.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
            </div>
            {/* 텍스트 영역 */}
            <div className="p-3">
                <h3 className="font-medium text-sm text-gray-900">{article.title}</h3>
            </div>
        </div>
    );
}

ArticleItem.propTypes = {
    article: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        originalArticle: PropTypes.shape({
            image: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};
