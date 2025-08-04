document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("liveeToken");
  const currentUserId = getUserIdFromToken(token);

  // ✅ 전체 공고 불러오기
  let allPosts = [];
  try {
    const res = await fetch("https://main-server-ekgr.onrender.com/api/recruit");
    allPosts = await res.json();
  } catch (err) {
    console.error("❌ 공고 불러오기 실패", err);
  }

  // ✅ 섹션별 공고 렌더링 (HTML ID에 맞춤!)
  renderRecruitCards("latest-posts", getLatestPosts(allPosts));
  renderRecruitCards("urgent-posts", getUrgentPosts(allPosts));
  renderRecruitCards("highfee-posts", getHighFeePosts(allPosts));
  renderRecruitCards("recruit-list", allPosts); // 기본 전체 리스트

  // ✅ 카테고리 필터 핸들링
  const categoryButtons = document.querySelectorAll(".category-scroll button");
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".category-scroll .active")?.classList.remove("active");
      btn.classList.add("active");

      const selected = btn.textContent.trim();
      const filtered = selected === "전체"
        ? allPosts
        : allPosts.filter((post) => post.category === selected);

      renderRecruitCards("recruit-list", filtered); // 필터 결과도 동일 id
    });
  });
});

// ✅ 로그인 토큰에서 사용자 ID 추출
function getUserIdFromToken(token) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch (err) {
    console.warn("❌ 토큰 파싱 실패:", err);
    return null;
  }
}

// ✅ 공고 렌더링 함수
function renderRecruitCards(containerId, posts) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (posts.length === 0) {
    container.innerHTML = `<p class="empty-text">등록된 공고가 없습니다.</p>`;
    return;
  }

  container.innerHTML = posts
    .map((post) => {
      const fee = post.fee ? `<div class="fee">💰 ${post.fee}</div>` : "";
      const thumb = post.thumbnailUrl || "/default.jpg";
      return `
        <div class="recruit-card">
          <div class="thumb-wrap">
            <img src="${thumb}" alt="${post.title}" />
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

// ✅ 최신 공고 10개
function getLatestPosts(posts) {
  return [...posts]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 10);
}

// ✅ 촬영일 임박 공고
function getUrgentPosts(posts) {
  return [...posts]
    .filter((p) => p.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 10);
}

// ✅ 출연료 높은 순 공고
function getHighFeePosts(posts) {
  return [...posts]
    .sort((a, b) => {
      const feeA = parseInt(a.fee?.replace(/\D/g, "")) || 0;
      const feeB = parseInt(b.fee?.replace(/\D/g, "")) || 0;
      return feeB - feeA;
    })
    .slice(0, 10);
}

// ✅ FAB 버튼 클릭 시 이동
function handleFabClick() {
  const token = localStorage.getItem("liveeToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    location.href = "/livee-beta/frontend/login.html";
  } else {
    location.href = "/livee-beta/frontend/recruitform.html";
  }
}