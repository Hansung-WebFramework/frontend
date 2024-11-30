import PropTypes from 'prop-types';

export default function ArticleItem({ article, onClick }) {
    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transform transition-all duration-300"
            onClick={() => onClick(article)}
        >
            <div className="relative w-full h-[200px]">
                <img
                    src={article.originalArticle.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
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
