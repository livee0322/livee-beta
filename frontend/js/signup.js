// ✅ 비밀번호 보기 토글
document.querySelectorAll('.toggle-password').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const input = document.getElementById(targetId);
    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = '🙈';
    } else {
      input.type = 'password';
      btn.textContent = '👁';
    }
  });
});

// ✅ 회원가입 폼 제출
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorMsg = document.getElementById('signupError');

  // 유효성 검사
  if (!name || !email || !password || !confirmPassword) {
    errorMsg.textContent = '모든 항목을 입력해주세요.';
    return;
  }
  if (password !== confirmPassword) {
    errorMsg.textContent = '비밀번호가 일치하지 않습니다.';
    return;
  }

  try {
    const res = await fetch('https://livee-server-dev.onrender.com/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await res.json();

    if (res.ok) {
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      window.location.href = '/livee-beta/frontend/login.html';
    } else {
      errorMsg.textContent = result.message || '회원가입 실패';
    }
  } catch (err) {
    errorMsg.textContent = '서버 오류가 발생했습니다.';
  }
});