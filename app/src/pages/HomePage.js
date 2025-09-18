
import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function HomePage() {
  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">TSS Channel Hub에 오신 것을 환영합니다</h1>
        <p className="col-md-8 fs-4">
          이곳은 유튜브 채널 성장을 위한 전략, 노하우, 그리고 다양한 정보들을 기록하고 관리하는 공간입니다.
        </p>
        <p>상단 메뉴의 '+ 새 글 작성' 또는 아래 버튼을 클릭하여 새로운 정보를 추가할 수 있습니다.</p>
        <hr className="my-4" />
        <LinkContainer to="/add-post">
          <Button variant="primary" size="lg">새 글 작성하기</Button>
        </LinkContainer>
      </div>
    </div>
  );
}

export default HomePage;
