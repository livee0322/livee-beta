document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const container = document.querySelector('.showhost-container') || document.querySelector('.showhost-detail');

  if (!id || !container) {
    container.innerHTML = `<p>잘못된 접근입니다.</p>`;
    return;
  }

  try {
    const res = await fetch(`https://livee-server-dev.onrender.com/portfolio/${id}`);
    if (!res.ok) throw new Error('데이터를 불러올 수 없습니다.');

    const data = await res.json();

    container.innerHTML = `
      <div class="showhost-card">
        <img src="${data.photo || '/default-profile.png'}" alt="프로필 이미지" />
        <div class="info">
          <h3>${data.title || '제목 없음'}</h3>
          <p><strong>이름:</strong> ${data.name || '-'}</p>
          <p><strong>경력:</strong> ${data.career || '-'}</p>
          <p><strong>활동:</strong> ${data.activity || '-'}</p>
          <p><strong>성격:</strong> ${data.character || '-'}</p>
          <p><strong>출연료:</strong> ${data.fee || '-'}</p>
          <p><strong>카테고리:</strong> ${data.category || '-'}</p>
        </div>
        <button class="btn-request" onclick="location.href='/host-request.html?id=${data._id}'">섭외 요청하기</button>
      </div>
    `;
  } catch (err) {
    console.error('❌ 상세정보 오류:', err);
    container.innerHTML = `<p>데이터를 불러오는 중 오류가 발생했습니다.</p>`;
  }
});