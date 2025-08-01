document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('.toggle-password');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈';
      } else {
        input.type = 'password';
        button.textContent = '👁';
      }
    });
  });

  const form = document.getElementById('signupForm');
  const errorDisplay = document.getElementById('signupError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDisplay.textContent = '';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      errorDisplay.textContent = '비밀번호가 일치하지 않습니다.';
      return;
    }

    try {
      const response = await fetch('https://livee-server-dev.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '회원가입 실패');
      }

      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      window.location.href = '/livee-beta/login.html'; // ✅ 절대경로
    } catch (err) {
      errorDisplay.textContent = err.message;
    }
  });
});