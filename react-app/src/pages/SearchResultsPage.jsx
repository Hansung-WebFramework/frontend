import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import ArticleList from '../components/articles/ArticleList';

export default function SearchResultsPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await fetch('/analysis');
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setTimeout(() => setLoading(false), 500); // 로딩 화면 유지 시간
            }
        };

        fetchSearchResults();
    }, []);

    const handleArticleClick = (article) => {
        navigate(`/AnalysisPage/${article.id}`);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Search Results</h1>
                <ArticleList articles={articles} onArticleSelect={handleArticleClick} />
            </main>
        </div>
    );
}
