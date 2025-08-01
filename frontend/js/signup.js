try {
  const response = await fetch('https://livee-server-dev.onrender.com/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });

  // 👉 응답이 HTML인지 감지
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('서버에서 JSON이 아닌 응답을 반환했습니다.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '회원가입 실패');
  }

  alert('회원가입 성공! 로그인 페이지로 이동합니다.');
  window.location.href = '/livee-beta/login.html';

} catch (err) {
  errorDisplay.textContent = err.message;
}