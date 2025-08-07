document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("liveeToken");
  const listContainer = document.getElementById("portfolioList");
  const actionBtn = document.getElementById("portfolioActionBtn");

  if (!token) {
    alert("로그인이 필요합니다.");
    location.href = "/livee-beta/login.html";
    return;
  }

  try {
    const res = await fetch("https://main-server-ekgr.onrender.com/api/portfolio/me", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "불러오기 실패");

    if (!data || !data.name) {
      listContainer.innerHTML = `<p class="empty-message">등록된 포트폴리오가 없습니다.</p>`;
      actionBtn.textContent = "포트폴리오 등록하기";
      actionBtn.onclick = () => {
        localStorage.removeItem("portfolioData");
        location.href = "/livee-beta/frontend/portfolio-edit.html";
      };
      return;
    }

    // 카드형 UI 구성 (오늘의집 스타일)
    listContainer.innerHTML = `
      <div class="portfolio-card">
        <img src="${data.backgroundImage || '/livee-beta/default-bg.jpg'}" 
             class="background" alt="배경 이미지" />
        <img src="${data.profileImage || '/livee-beta/default-profile.jpg'}" 
             class="profile-img" alt="프로필 이미지" />
        <div class="portfolio-info">
          <div class="name">${data.name}</div>
          <div class="job">${data.jobTag || '-'}</div>
          <div class="status">${data.statusMessage || ''}</div>
          <div class="portfolio-actions">
            <button class="edit" onclick="location.href='/livee-beta/frontend/portfolio-edit.html?id=${data._id}'">수정</button>
            <button class="toggle">${data.isPublic ? "비공개" : "공개"}</button>
          </div>
        </div>
      </div>
    `;

    // 수정 버튼 텍스트
    actionBtn.textContent = "포트폴리오 수정하기";
    actionBtn.onclick = () => {
      localStorage.setItem("portfolioData", JSON.stringify(data));
      location.href = "/livee-beta/frontend/portfolio-edit.html";
    };

  } catch (err) {
    console.error("❌ 포트폴리오 불러오기 오류:", err);
    listContainer.innerHTML = `<p class="empty-message">포트폴리오를 불러오지 못했습니다.</p>`;
    if (actionBtn) actionBtn.textContent = "포트폴리오 등록하기";
  }
});