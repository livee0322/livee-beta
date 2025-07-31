const token = localStorage.getItem('liveeToken');
const myLink = token ? './mypage.html' : './login.html';

document.getElementById('bottom-tab-container').innerHTML = `
  <nav class="bottom-tab">
    <a href="./index.html" class="tab">홈</a>
    <a href="./live.html" class="tab">라이브</a>
    <a href="./showhost.html" class="tab">쇼호스트</a>
    <a href="./schedule.html" class="tab">일정</a>
    <a href="${myLink}" class="tab">마이</a>
  </nav>
`;