import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import ArticleList from '../components/articles/ArticleList';
import Navbar from '../components/layout/Navbar';

export default function SearchResultsPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const queryParams = new URLSearchParams(location.search);
                const query = queryParams.get('query') || '';

                const response = await fetch('/analysis'); // 전체 기사 데이터 가져오기
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();

                // 검색어와 신뢰도 기준으로 기사 필터링
                const filteredArticles = data.filter((article) => {
                    const accuracyThreshold = 50; // 신뢰도 기준
                    const searchText = query.trim();
                    const isAccurate = article.accuracy >= accuracyThreshold;
                    const inTitle = article.title.includes(searchText);
                    const inSummary = article.summary.includes(searchText);
                    const inSummaryKor = article['summary-kor'].includes(searchText);
                    return isAccurate && (inTitle || inSummary || inSummaryKor);
                });

                setArticles(filteredArticles);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setTimeout(() => setLoading(false), 1000);
            }
        };

        fetchSearchResults();
    }, [location.search]);

    const handleArticleClick = (article) => {
        navigate(`/AnalysisPage/${article.id}`);
    };

    if (loading) {
        return <Loader />;
    }

    // 검색 결과가 없을 경우 처리
    if (articles.length === 0) {
        return (
            <div>
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold mb-4">검색 결과가 없습니다.</h1>
                </div>
            </div>
        );
    }

    // 첫 번째 기사의 summary-kor 가져오기
    const firstArticleSummaryKor = articles[0]['summary-kor'];

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                {/* AI 요약 섹션 */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">AI 요약</h2>
                    <div className="p-4 bg-white rounded-lg shadow">
                        <p className="text-gray-700">{firstArticleSummaryKor}</p>
                    </div>
                </section>

                {/* 신뢰도 문구 */}
                <section className="mb-4">
                    <p className="text-gray-600">
                        신뢰도 50%가 넘는 {articles.length}개의 뉴스 기반으로 작성된 글입니다.
                    </p>
                </section>

                {/* 기사 목록 */}
                <ArticleList articles={articles} onArticleSelect={handleArticleClick} />
            </main>
        </div>
    );
}
