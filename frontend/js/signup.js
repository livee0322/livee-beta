// ✅ 비밀번호 보기 토글
document.querySelectorAll('.toggle-password').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const input = document.getElementById(targetId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    btn.textContent = type === 'password' ? '👁' : '🙈';
  });
});

// ✅ 회원가입 폼 제출
document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();
  const errorEl = document.getElementById('signupError');

  if (!name || !email || !password || !confirmPassword) {
    errorEl.textContent = '모든 항목을 입력해주세요.';
    return;
  }

  if (password !== confirmPassword) {
    errorEl.textContent = '비밀번호가 일치하지 않습니다.';
    return;
  }

  try {
    const response = await fetch('https://livee-server-dev.onrender.com/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      errorEl.textContent = data.message || '회원가입 실패. 다시 시도해주세요.';
    } else {
      alert('회원가입이 완료되었습니다!');
      window.location.href = '/livee-beta/login.html';
    }
  } catch (err) {
    console.error(err);
    errorEl.textContent = '서버 오류가 발생했습니다.';
  }
});