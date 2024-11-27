import PropTypes from 'prop-types'

export default function ArticleItem({ article, onClick }) {
    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onClick(article)}
        >
            {/* 이미지에 hover 시 확대 효과 추가 */}
            <img
                src={article.image}
                alt={article.title}
                className="w-full h-32 object-cover transition-transform duration-300 transform hover:scale-105" // 확대 효과 추가
            />
            <div className="p-3">
                <h3 className="font-medium text-sm text-gray-900">{article.title}</h3>
            </div>
        </div>
    )
}

ArticleItem.propTypes = {
    article: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
}
