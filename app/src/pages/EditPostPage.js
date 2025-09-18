import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import API_BASE_URL from '../apiConfig';

const categoryNames = {
  growth: '채널 성장',
  monetization: '수익화',
  sponsorship: '광고/협찬',
  etc: '기타/참고',
};

function EditPostPage() {
  const { category, id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/articles/${category}/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Could not fetch article data.');
        return response.json();
      })
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError('제목과 내용은 필수 항목입니다.');
      return;
    }
    setSubmitting(true);
    setError(null);

    fetch(`${API_BASE_URL}/api/articles/${category}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.error || 'Update failed.') });
        }
        return response.json();
      })
      .then(data => {
        navigate(`/${category}/${data.id}`);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="page-container">
      <h2>글 수정</h2>
      <Form onSubmit={handleSubmit} className="mt-4">
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>카테고리</Form.Label>
          <Form.Control
            type="text"
            value={categoryNames[category] || category}
            readOnly
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContent">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={15}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={submitting}>
          {submitting ? '수정 중...' : '수정하기'}
        </Button>
      </Form>
    </div>
  );
}

export default EditPostPage;