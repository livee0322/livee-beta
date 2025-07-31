document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('hostRegisterForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !contact || !category || !message) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    try {
      const res = await fetch('https://livee-server-dev.onrender.com/host-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, contact, category, message })
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || '요청 실패');
      }

      alert('등록 요청이 정상적으로 접수되었습니다!');
      form.reset();
    } catch (err) {
      console.error('❌ 등록 요청 실패:', err);
      alert('요청 중 문제가 발생했어요. 다시 시도해주세요.');
    }
  });
});