import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import API_BASE_URL from '../apiConfig';

const categories = [
  { id: 'growth', name: '채널 성장' },
  { id: 'monetization', name: '수익화' },
  { id: 'sponsorship', name: '광고/협찬' },
  { id: 'etc', name: '기타/참고' },
];

function AddPostPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0].id);
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      setError('제목, 카테고리, 내용은 필수 항목입니다.');
      return;
    }
    setSubmitting(true);
    setError(null);

    fetch(`${API_BASE_URL}/api/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, category, content }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.error || '저장에 실패했습니다.') });
        }
        return response.json();
      })
      .then(data => {
        // Redirect to the new article page
        navigate(`/${category}/${data.id}`);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="page-container">
      <h2>새 글 작성</h2>
      <Form onSubmit={handleSubmit} className="mt-4">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="글 제목을 입력하세요"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>카테고리</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContent">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={15}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="마크다운 형식으로 내용을 작성하세요"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={submitting}>
          {submitting ? '저장 중...' : '저장하기'}
        </Button>
      </Form>
    </div>
  );
}

export default AddPostPage;