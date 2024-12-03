import PropTypes from 'prop-types';
import ArticleItem from './ArticleItem';

export default function ArticleList({ articles, onArticleSelect, onToggleBookmark }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {articles.map((article) => (
                <ArticleItem
                    key={article.id}
                    article={article}
                    isBookmarked={article.isBookmarked || false}
                    onToggleBookmark={onToggleBookmark}
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
            isBookmarked: PropTypes.bool,
            originalArticle: PropTypes.shape({
                image: PropTypes.string.isRequired,
            }).isRequired,
        })
    ).isRequired,
    onArticleSelect: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
};
