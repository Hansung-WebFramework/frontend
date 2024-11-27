import PropTypes from 'prop-types'

export default function SelectedArticle({ article }) {
    if (!article) return null

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="relative">
                <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    본석 페이지
                </span>
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-[400px] object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 bg-pink-500 rounded-full w-20 h-20 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{article.trustScore}%</span>
                </div>
            </div>
            <div className="mt-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>{article.author}</span>
                    <span>{article.date}</span>
                    <span>{article.source}</span>
                </div>
                <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
                <p className="text-gray-700">{article.content}</p>
                <div className="flex gap-4 mt-6">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Share
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

SelectedArticle.propTypes = {
    article: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        trustScore: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired,
    }).isRequired,
}
