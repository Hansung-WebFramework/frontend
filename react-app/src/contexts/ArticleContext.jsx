import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchArticles = async () => {
        try {
            const res = await axios.get('/analysis');
            setArticles(res.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const updateBookmark = async (articleId, isCurrentlyBookmarked) => {
        try {
            // UI 업데이트
            setArticles((prevArticles) =>
                prevArticles.map((article) =>
                    article.id === articleId
                        ? { ...article, isBookmarked: !isCurrentlyBookmarked }
                        : article
                )
            );

            // 서버에 북마크 상태 업데이트 요청
            if (isCurrentlyBookmarked) {
                await axios.delete(`/bookmarks/${articleId}`);
            } else {
                await axios.post('/bookmarks', { id: articleId });
            }
        } catch (error) {
            console.error('Error updating bookmark:', error);
            // 에러 발생 시 상태 복원
            setArticles((prevArticles) =>
                prevArticles.map((article) =>
                    article.id === articleId
                        ? { ...article, isBookmarked: isCurrentlyBookmarked }
                        : article
                )
            );
        }
    };

    return (
        <ArticleContext.Provider
            value={{ articles, setArticles, loading, updateBookmark, fetchArticles }}
        >
            {children}
        </ArticleContext.Provider>
    );
};

ArticleProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
