document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("liveeToken");
  let currentUserId = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      currentUserId = payload.id;
    } catch (err) {
      console.warn("❌ 토큰 파싱 실패:", err);
    }
  }

  // 전체 공고 가져오기
  let allPosts = [];
  try {
    const res = await fetch("https://main-server-ekgr.onrender.com/api/recruit");
    allPosts = await res.json();
  } catch (err) {
    console.error("❌ 공고 불러오기 실패", err);
  }

  // 리스트 섹션별 랜더링
  renderRecruitCards("latest-list", [...allPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10));
  renderRecruitCards("urgent-list", [...allPosts].filter(p => p.date).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 10));
  renderRecruitCards("highfee-list", [...allPosts].sort((a, b) => parseInt(b.fee) - parseInt(a.fee)).slice(0, 10));

  // 카테고리 필터
  const categoryButtons = document.querySelectorAll(".category-scroll button");
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".category-scroll .active")?.classList.remove("active");
      btn.classList.add("active");

      const selected = btn.textContent.trim();
      const filtered = selected === "전체"
        ? allPosts
        : allPosts.filter((post) => post.category === selected);

      renderRecruitCards("category-list", filtered);
    });
  });
});

// 공고 카드 랜더링 함수 (공통)
function renderRecruitCards(containerId, posts) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = posts
    .map((post) => {
      const fee = post.fee ? `<div class="fee">💰 ${post.fee}</div>` : "";
      return `
        <div class="recruit-card">
          <div class="thumb-wrap">
            <img src="${post.thumbnailUrl || "/default.jpg"}" alt="${post.title}" />
            <span class="scrap ri-star-line"></span>
          </div>
          <p>${post.brand || ""}</p>
          <h3>${post.title}</h3>
          ${fee}
        </div>
      `;
    })
    .join("");
}

// FAB 버튼
function handleFabClick() {
  const token = localStorage.getItem("liveeToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    location.href = "/livee-beta/frontend/login.html";
  } else {
    location.href = "/livee-beta/frontend/recruitform.html";
  }
}