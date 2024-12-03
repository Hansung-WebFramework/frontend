import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import SelectedArticle from '../components/articles/SelectedArticle';
import ArticleList from '../components/articles/ArticleList';
import Loader from '../components/Loader';
import { ArticleContext } from '../contexts/ArticleContext';

export default function IdentifiedArticlesPage() {
    const { articles, loading, updateBookmark } = useContext(ArticleContext);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 4;
    const navigate = useNavigate();

    // 컴포넌트가 마운트될 때 첫 번째 기사를 선택
    useEffect(() => {
        if (articles.length > 0) {
            setSelectedArticle(articles[0]);
        }
    }, [articles]);

    const handleArticleSelect = (article) => {
        setSelectedArticle(article);
    };

    const handleArticleClick = (article) => {
        navigate(`/AnalysisPage/${article.id}`);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <Loader />;
    }

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    return (
        <div className="min-h-screen bg-[#f0f4f8]">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        {selectedArticle && (
                            <SelectedArticle
                                article={selectedArticle}
                                onClick={() => handleArticleClick(selectedArticle)}
                                onToggleBookmark={() =>
                                    updateBookmark(selectedArticle.id, selectedArticle.isBookmarked || false)
                                }
                            />
                        )}
                    </div>
                    <div>
                        <ArticleList
                            articles={currentArticles}
                            onArticleSelect={handleArticleSelect}
                            onToggleBookmark={updateBookmark}
                        />
                        <div className="flex justify-center mt-4">
                            {[...Array(Math.ceil(articles.length / articlesPerPage)).keys()].map(
                                (page) => (
                                    <button
                                        key={page + 1}
                                        onClick={() => handlePageChange(page + 1)}
                                        className={`px-4 py-2 mx-1 rounded-lg ${currentPage === page + 1
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200'
                                            }`}
                                    >
                                        {page + 1}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
