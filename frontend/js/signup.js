document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const errorEl = document.getElementById('signupError');
  const toggleBtns = document.querySelectorAll('.toggle-password');

  // 🔐 비밀번호 보기 토글
  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
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

  // 📨 회원가입 요청
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // 🔍 유효성 검사
    if (!name || !email || !password || !confirmPassword) {
      errorEl.textContent = '모든 항목을 입력해주세요.';
      return;
    }

    if (password !== confirmPassword) {
      errorEl.textContent = '비밀번호가 일치하지 않습니다.';
      return;
    }

    // 🌐 API 요청 (Render 서버에 연결)
    try {
      const response = await fetch('https://livee-server-dev.onrender.com/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();

      if (response.ok) {
        alert('회원가입이 완료되었습니다!');
        window.location.href = '/livee-beta/login.html';
      } else {
        errorEl.textContent = result.message || '회원가입에 실패했습니다.';
      }
    } catch (err) {
      console.error('❌ 서버 요청 에러:', err);
      errorEl.textContent = '서버와 연결 중 오류가 발생했습니다.';
    }
  });
});