import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';

// 페이지 컴포넌트
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import AddPostPage from './pages/AddPostPage';
import EditPostPage from './pages/EditPostPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar expand="lg" className="navbar-custom">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand className="fw-bold">TSS Channel Hub</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <LinkContainer to="/growth">
                  <Nav.Link>채널 성장</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/monetization">
                  <Nav.Link>수익화</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/sponsorship">
                  <Nav.Link>광고/협찬</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/etc">
                  <Nav.Link>기타/참고</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/add-post">
                  <Nav.Link className="fw-bold text-primary">+ 새 글 작성</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <main className="main-content">
          <Container className="mt-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add-post" element={<AddPostPage />} />
              <Route path="/edit-post/:category/:id" element={<EditPostPage />} />
              <Route path="/:category" element={<CategoryPage />} />
              <Route path="/:category/:articleId" element={<ArticlePage />} />
            </Routes>
          </Container>
        </main>

        <footer className="footer">
          <Container>
            <p>&copy; 2025 TSS Channel Hub. All Rights Reserved.</p>
          </Container>
        </footer>
      </div>
    </Router>
  );
}




export default App;