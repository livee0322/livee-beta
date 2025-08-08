document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const errorDisplay = document.getElementById('signupError');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    errorDisplay.textContent = '';

    if (!name || !email || !password || !confirmPassword) {
      errorDisplay.textContent = '모든 항목을 입력해주세요.';
      return;
    }

    if (password !== confirmPassword) {
      errorDisplay.textContent = '비밀번호가 일치하지 않습니다.';
      return;
    }

    const response = await fetch('https://main-server-ekgr.onrender.com/api/auth/signup', {
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
      window.location.href = '/livee-beta/frontend/login.html';  // 🔁 여기 수정

    } catch (err) {
      errorDisplay.textContent = err.message;
    }
  });

  // ✅ 비밀번호 보기 토글
  const toggleButtons = document.querySelectorAll('.toggle-password');
  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
      }
    });
  });
});