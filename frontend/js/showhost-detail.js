document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const showhostId = urlParams.get('id');
  const container = document.querySelector('.showhost-card');

  if (!showhostId) {
    container.innerHTML = `<p>잘못된 접근입니다. ID가 없습니다.</p>`;
    return;
  }

  try {
    const res = await fetch(`https://livee-server-dev.onrender.com/portfolio/${showhostId}`);
    if (!res.ok) throw new Error('데이터 불러오기 실패');

    const data = await res.json();

    container.innerHTML = `
      <img src="${data.photo || '/default-profile.png'}" alt="프로필 이미지" />
      <h2>${data.title || '제목 없음'}</h2>
      <p><strong>이름:</strong> ${data.public_name ? data.name : '비공개'}</p>
      <p><strong>경력:</strong> ${data.public_career ? data.career : '비공개'}</p>
      <p><strong>활동:</strong> ${data.activity || '-'}</p>
      <p><strong>성격:</strong> ${data.character || '-'}</p>
      <p><strong>희망 출연료:</strong> ${data.fee || '-'}</p>
      <p><strong>출연 조건:</strong> ${data.condition || '-'}</p>
      <p><strong>카테고리:</strong> ${data.category || '-'}</p>
      <button class="btn-request" onclick="location.href='/influencer-request.html?id=${data._id}'">
        섭외 요청하기
      </button>
    `;
  } catch (err) {
    console.error('❌ 쇼호스트 상세 불러오기 오류:', err);
    container.innerHTML = `<p>데이터를 불러오는 중 오류가 발생했어요. 😢</p>`;
  }
});