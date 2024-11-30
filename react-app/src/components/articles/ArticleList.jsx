import PropTypes from 'prop-types';
import ArticleItem from './ArticleItem';

export default function ArticleList({ articles, onArticleSelect }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {articles.map((article) => (
                <ArticleItem
                    key={article.id}
                    article={article}
                    onClick={onArticleSelect}
                />
            ))}
        </div>
    );
}

ArticleList.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            originalArticle: PropTypes.shape({
                image: PropTypes.string.isRequired,
            }).isRequired,
        })
    ).isRequired,
    onArticleSelect: PropTypes.func.isRequired,
};
