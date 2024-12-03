import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import SelectedArticle from '../components/articles/SelectedArticle';
import ArticleList from '../components/articles/ArticleList';
import Loader from '../components/Loader';

export default function IdentifiedArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 4;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch('/analysis');
                if (!res.ok) {
                    throw new Error('Failed to fetch articles');
                }
                const data = await res.json();

                // 로컬 스토리지에서 북마크 상태 로드
                const bookmarkedIds = JSON.parse(localStorage.getItem('bookmarkedIds')) || [];
                const updatedData = data.map(article => ({
                    ...article,
                    isBookmarked: bookmarkedIds.includes(article.id),
                }));

                setArticles(updatedData);
                setSelectedArticle(updatedData[0]);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleArticleSelect = (article) => {
        setSelectedArticle(article);
    };

    const handleArticleClick = (article) => {
        navigate(`/AnalysisPage/${article.id}`);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleToggleBookmark = (articleId) => {
        setArticles((prevArticles) => {
            const updatedArticles = prevArticles.map((article) =>
                article.id === articleId
                    ? { ...article, isBookmarked: !article.isBookmarked }
                    : article
            );

            // 로컬 스토리지에 북마크 상태 저장
            const bookmarkedIds = updatedArticles
                .filter(article => article.isBookmarked)
                .map(article => article.id);
            localStorage.setItem('bookmarkedIds', JSON.stringify(bookmarkedIds));

            return updatedArticles;
        });
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
                                onToggleBookmark={handleToggleBookmark}
                            />
                        )}
                    </div>
                    <div>
                        <ArticleList
                            articles={currentArticles}
                            onArticleSelect={handleArticleSelect}
                            onToggleBookmark={handleToggleBookmark}
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
