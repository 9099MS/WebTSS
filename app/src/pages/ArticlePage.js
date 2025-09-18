
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Spinner, Alert } from 'react-bootstrap';
import API_BASE_URL from '../apiConfig';

function ArticlePage() {
  const { category, articleId } = useParams();
  const [article, setArticle] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/articles/${category}/${articleId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch article.');
        }
        return response.json();
      })
      .then(data => {
        setArticle(data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('글을 불러오는 데 실패했습니다.');
        setArticle({ title: '오류', content: '내용을 찾을 수 없습니다.' });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category, articleId]);

  return (
    <div className="article-content">
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <h1>{article.title}</h1>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {article.content}
          </ReactMarkdown>
        </>
      )}
    </div>
  );
}

export default ArticlePage;
