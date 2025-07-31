document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const detailContainer = document.querySelector('.showhost-detail-container');

  if (!id) {
    detailContainer.innerHTML = '<p>잘못된 접근입니다.</p>';
    return;
  }

  try {
    const res = await fetch(`https://livee-server-dev.onrender.com/portfolio/${id}`);
    if (!res.ok) throw new Error('데이터 불러오기 실패');

    const data = await res.json();

    detailContainer.innerHTML = `
      <section class="profile-section">
        <img src="${data.photo || '/default-profile.png'}" alt="프로필 이미지" />
        <div>
          <h2>${data.name || '이름 없음'}</h2>
          <p>${data.title || '소개 없음'}</p>
          <p>카테고리: ${data.category || '-'}</p>
        </div>
      </section>

      <section class="info-section">
        <h3>희망 출연료</h3>
        <p>${data.fee || '-'}</p>

        <h3>경력</h3>
        <p>${data.career || '-'}</p>

        <h3>활동</h3>
        <p>${data.activity || '-'}</p>

        <h3>성격</h3>
        <p>${data.character || '-'}</p>

        <h3>출연 조건</h3>
        <p>${data.condition || '-'}</p>

        <h3>링크</h3>
        <p>${data.link || '-'}</p>

        <button class="contract-btn" onclick="location.href='/showhost-request.html?id=${data._id}'">계약 요청하기</button>
      </section>
    `;
  } catch (err) {
    console.error('❌ 쇼호스트 상세 오류:', err);
    detailContainer.innerHTML = `<p>상세 정보를 불러오는 중 오류가 발생했어요. 😢</p>`;
  }
});