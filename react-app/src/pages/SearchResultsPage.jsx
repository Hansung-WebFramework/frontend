import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ArticleList from '../components/articles/ArticleList';
import Navbar from '../components/layout/Navbar';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchResultsPage() {
    const query = useQuery();
    const searchQuery = query.get('query');
    const [filteredArticles, setFilteredArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch('/analysis');
                if (!res.ok) {
                    throw new Error('Failed to fetch articles');
                }
                const articles = await res.json();
                const results = articles.filter(
                    (article) =>
                        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        article.summary.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setFilteredArticles(results);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        if (searchQuery) {
            fetchArticles();
        }
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-[#f0f4f8]">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h1>
                <ArticleList articles={filteredArticles} onArticleSelect={() => { }} />
            </main>
        </div>
    );
}
