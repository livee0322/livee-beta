document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorBox = document.getElementById('loginError');

  try {
    const res = await fetch('https://livee-server-dev.onrender.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem('liveeToken', data.token);
      location.href = 'mypage.html';
    } else {
      errorBox.textContent = data.message || '로그인에 실패했습니다.';
    }
  } catch (err) {
    console.error(err);
    errorBox.textContent = '서버 오류가 발생했습니다.';
  }
});