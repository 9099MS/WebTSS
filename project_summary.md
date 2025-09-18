
# 프로젝트 요약: TSS Channel Hub

---

## 1. 프로젝트 목적

이 프로젝트는 유튜브 채널('TSS Channel Hub')의 성장을 지원하기 위한 개인용 정보 아카이브 웹사이트입니다. 채널 성장 전략, 수익화 노하우, 광고/협찬 관련 정보 등을 체계적으로 기록하고 관리하는 것을 목표로 합니다.

---

## 2. 기술 스택

*   **프레임워크:** React.js
*   **UI 라이브러리:** React-Bootstrap, Bootstrap 5
*   **라우팅(페이지 이동):** React Router
*   **콘텐츠 관리:** 마크다운(Markdown) 파일

---

## 3. 웹사이트 실행 방법

1.  프로젝트 폴더에 있는 `start-website.bat` 파일을 더블 클릭합니다.
2.  잠시 후, 자동으로 웹 브라우저가 열리며 `http://localhost:3000` 주소로 사이트가 표시됩니다.

---

## 4. 프로젝트 폴더 구조

이 프로젝트의 핵심 코드는 `app` 폴더 내에 있습니다.

```
/WebTSS
|-- app/                  <-- 실제 웹사이트 소스코드 폴더
|   |-- public/
|   |   |-- articles/     <-- 정보 글(마크다운)을 저장하는 곳
|   |   |   |-- growth/
|   |   |   |-- monetization/
|   |   |   |-- sponsorship/
|   |   |-- index.html    <-- 웹사이트의 기본 틀
|   |   `-- manifest.json <-- 웹 앱 정보
|   |
|   |-- src/              <-- 웹사이트의 기능 및 디자인 코드
|   |   |-- pages/        <-- 각 페이지 컴포넌트
|   |   |   |-- HomePage.js
|   |   |   |-- CategoryPage.js  <-- (※ 새 글 추가 시 수정 필요)
|   |   |   `-- ArticlePage.js
|   |   |
|   |   |-- App.js        <-- 전체 레이아웃 및 페이지 연결
|   |   |-- App.css       <-- 메인 스타일시트
|   |   `-- index.js      <-- 프로그램 시작점
|   |
|   `-- package.json      <-- 프로젝트에 사용된 라이브러리 목록
|
`-- start-website.bat     <-- 웹사이트 실행 파일
`-- project_summary.md    <-- (현재 파일) 프로젝트 요약
```

---

## 5. 새로운 정보(글) 추가 방법

새로운 글을 웹사이트에 추가하는 과정은 **2단계**로 이루어집니다.

### 1단계: 마크다운(.md) 파일 생성

*   `app/public/articles` 폴더 아래에서 원하는 주제의 폴더(예: `growth`)로 이동합니다.
*   그 안에 새로운 마크다운 파일(예: `my-new-tip.md`)을 만들고, 내용을 자유롭게 작성합니다.

### 2단계: `CategoryPage.js` 파일에 새 글 정보 등록

*   `app/src/pages/CategoryPage.js` 파일을 텍스트 편집기로 엽니다.
*   파일 상단에 있는 `articles` 객체를 찾습니다.
*   방금 파일을 추가한 카테고리(예: `growth`)의 배열에, 새로 만든 파일의 정보를 아래와 같이 추가합니다.

```javascript
// 예시: growth 카테고리에 my-new-tip.md 파일을 추가한 경우

const articles = {
  growth: [
    { id: 'strategy-1', title: '유튜브 채널 성장을 위한 첫 번째 전략' },
    { id: 'tags-for-views', title: '조회수를 높이는 태그 작성법' },
    { id: 'my-new-tip', title: '내가 발견한 새로운 꿀팁' } // <-- 이 줄을 추가
  ],
  monetization: [
    // ...
  ],
  // ...
};
```

*   **중요:** `id`는 `.md` 확장자를 제외한 파일 이름과 **정확히 일치**해야 합니다.

파일을 저장하면, 웹사이트에 자동으로 반영되어 새로운 글이 목록에 나타납니다.
