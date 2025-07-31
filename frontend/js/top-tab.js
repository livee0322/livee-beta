document.getElementById('top-tab-container').innerHTML = `
  <nav class="top-tabs">
    <a href="/livee-beta/index.html" class="${location.pathname.includes('index') || location.pathname === '/livee-beta/' ? 'active' : ''}">홈</a>
    <a href="/livee-beta/frontend/showhost.html" class="${location.pathname.includes('showhost') ? 'active' : ''}">쇼호스트</a>
    <a href="/livee-beta/frontend/login.html" class="${location.pathname.includes('login') ? 'active' : ''}">로그인</a>
  </nav>
`;