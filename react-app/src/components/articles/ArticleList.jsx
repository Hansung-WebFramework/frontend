import PropTypes from 'prop-types'
import ArticleItem from './ArticleItem'
import Pagination from './Pagination'

export default function ArticleList({ articles, onArticleSelect }) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                {articles.map((article) => (
                    <ArticleItem
                        key={article.id}
                        article={article}
                        onClick={onArticleSelect}
                    />
                ))}
            </div>
            <Pagination />
        </div>
    )
}

ArticleList.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
        })
    ).isRequired,
    onArticleSelect: PropTypes.func.isRequired,
}
