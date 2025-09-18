
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ListGroup, Button, Stack, Spinner, Alert } from 'react-bootstrap';
import API_BASE_URL from '../apiConfig';

const categoryNames = {
  growth: '채널 성장',
  monetization: '수익화',
  sponsorship: '광고/협찬',
  etc: '기타/참고',
};

function CategoryPage() {
  const { category } = useParams();
  const [articleList, setArticleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categoryName = categoryNames[category] || '알 수 없는 카테고리';

  const fetchArticles = useCallback(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/articles`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setArticleList(data[category] || []);
        setError(null);
      })
      .catch(error => {
        console.error("Error fetching articles:", error);
        setError('글 목록을 불러오는 데 실패했습니다.');
      })
      .finally(() => setLoading(false));
  }, [category]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleDelete = (id) => {
    if (window.confirm(`정말로 '${id}' 글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`)) {
      fetch(`${API_BASE_URL}/api/articles/${category}/${id}`, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) throw new Error('Deletion failed');
          // UI에서 즉시 삭제된 항목을 반영
          setArticleList(prevList => prevList.filter(article => article.id !== id));
        })
        .catch(err => {
          console.error('Error deleting article:', err);
          alert('글 삭제에 실패했습니다.');
        });
    }
  };

  return (
    <div className="page-container">
      <h2>{categoryName}</h2>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        <ListGroup className="mt-4">
          {articleList.length > 0 ? (
            articleList.map((article) => (
              <ListGroup.Item key={article.id} className="d-flex justify-content-between align-items-center">
                <Link to={`/${category}/${article.id}`} className="text-decoration-none flex-grow-1">{article.title}</Link>
                <Stack direction="horizontal" gap={2}>
                  <Link to={`/edit-post/${category}/${article.id}`} className="btn btn-sm btn-outline-secondary">수정</Link>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(article.id)}>삭제</Button>
                </Stack>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>아직 작성된 글이 없습니다.</ListGroup.Item>
          )}
        </ListGroup>
      )}
    </div>
  );
}

export default CategoryPage;
