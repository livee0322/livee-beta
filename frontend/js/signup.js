document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const errorDisplay = document.getElementById('errorMsg');
  errorDisplay.textContent = '';

  if (!name || !email || !password || !confirmPassword) {
    errorDisplay.textContent = '모든 항목을 입력해주세요.';
    return;
  }

  if (password !== confirmPassword) {
    errorDisplay.textContent = '비밀번호가 일치하지 않습니다.';
    return;
  }

  try {
    const response = await fetch('https://main-server-ekgr.onrender.com/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

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
});