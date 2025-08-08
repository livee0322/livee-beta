// ✅ 메인 슬라이드 초기화
new Swiper('.main-banner-slide', {
  loop: true,
  pagination: { el: '.swiper-pagination' },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});

// ✅ 포트폴리오 불러오기
fetch("https://main-server-ekgr.onrender.com/api/portfolio/all")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("portfolioCardList");
    if (!data || data.length === 0) {
      list.innerHTML = `<p class="empty-message">등록된 포트폴리오가 없습니다.</p>`;
      return;
    }

    list.innerHTML = data.slice(0, 4).map(item => `
      <div class="card-item">
        <img src="${item.profileImage || '/livee-beta/frontend/default-profile.jpg'}" alt="${item.name}" />
        <div class="card-info">
          <h3>${item.name || '이름 없음'}</h3>
          <p>${item.jobTag || '-'}</p>
          <p class="desc">${item.introText || ''}</p>
        </div>
      </div>
    `).join("");
  })
  .catch(err => {
    console.error("❌ 포트폴리오 불러오기 실패:", err);
  });


// ✅ 공고 연동 (예시용)
fetch("https://main-server-ekgr.onrender.com/api/recruit/all")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("recruitCardList");
    if (!data || data.length === 0) {
      list.innerHTML = `<p class="empty-message">등록된 공고가 없습니다.</p>`;
      return;
    }

    list.innerHTML = data.slice(0, 4).map(item => `
      <div class="card-item">
        <img src="${item.thumbnail || '/livee-beta/frontend/default-thumb.jpg'}" alt="${item.title}" />
        <div class="card-info">
          <p class="brand">${item.brandName || '-'}</p>
          <h3 class="title">${item.title || '-'}</h3>
          <span class="fee">💰 ${item.fee || '협의'}</span>
        </div>
      </div>
    `).join("");
  })
  .catch(err => {
    console.error("❌ 공고 불러오기 실패:", err);
  });