document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('hostRequestForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const sns = form.sns.value.trim();
    const message = form.message.value.trim();

    if (!name || !sns || !message) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    try {
      const res = await fetch('https://livee-server-dev.onrender.com/host-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, sns, message })
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || '요청 실패');
      }

      alert('섭외 요청이 성공적으로 접수되었습니다!');
      form.reset();
    } catch (err) {
      console.error('❌ 섭외 요청 실패:', err);
      alert('섭외 요청 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  });
});