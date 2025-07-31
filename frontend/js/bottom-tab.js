document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('liveeToken');
  const myLink = token ? 'mypage.html' : 'login.html';

  const bottomTabHTML = `
    <nav class="bottom-tab">
      <a href="index.html">홈</a>
      <a href="live.html">라이브</a>
      <a href="showhost.html">쇼호스트</a>
      <a href="liveschedule.html">일정</a>
      <a href="${myLink}">마이</a>
    </nav>
  `;
  document.getElementById('bottom-tab-container').innerHTML = bottomTabHTML;
});