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
    const [transitioning, setTransitioning] = useState(false);
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
                setArticles(data);
                setSelectedArticle(data[0]);
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
        setTransitioning(true);
        setTimeout(() => {
            navigate(`/AnalysisPage/${article.id}`);
        }, 500); // 로딩 애니메이션 지속 시간
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading || transitioning) {
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
                            />
                        )}
                    </div>
                    <div>
                        <ArticleList
                            articles={currentArticles}
                            onArticleSelect={handleArticleSelect}
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
