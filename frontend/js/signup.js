document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const errorMessage = document.getElementById('signupError');

  // ✅ 비밀번호 보기 토글
  document.querySelectorAll('.toggle-password').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      const type = target.getAttribute('type') === 'password' ? 'text' : 'password';
      target.setAttribute('type', type);
      btn.textContent = type === 'password' ? '👁' : '🙈';
    });
  });

  // ✅ 회원가입 처리
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMessage.textContent = ''; // 이전 메시지 초기화

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!name || !email || !password || !confirmPassword) {
      errorMessage.textContent = '모든 항목을 입력해주세요.';
      return;
    }

    if (password !== confirmPassword) {
      errorMessage.textContent = '비밀번호가 일치하지 않습니다.';
      return;
    }

    try {
      const response = await fetch('https://livee-server-dev.onrender.com/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      console.log('서버 응답:', data); // ✅ 디버깅 로그

      if (!response.ok) {
        errorMessage.textContent = data.message || '회원가입 중 오류가 발생했습니다.';
        return;
      }

      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      window.location.href = '/livee-beta/frontend/login.html';

    } catch (err) {
      console.error('요청 중 오류 발생:', err);
      errorMessage.textContent = '서버와 연결 중 오류가 발생했습니다.';
    }
  });
});