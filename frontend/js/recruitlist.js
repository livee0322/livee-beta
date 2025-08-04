document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("liveeToken");
  const currentUserId = getUserIdFromToken(token);

  // 전체 공고 불러오기
  let allPosts = [];
  try {
    const res = await fetch("https://main-server-ekgr.onrender.com/api/recruit");
    allPosts = await res.json();
  } catch (err) {
    console.error("❌ 공고 불러오기 실패", err);
  }

  renderRecruitCards("latest-posts", getLatestPosts(allPosts));
  renderRecruitCards("urgent-posts", getUrgentPosts(allPosts));
  renderRecruitCards("highfee-posts", getHighFeePosts(allPosts));
  renderRecruitCards("recruit-list", allPosts);

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

      renderRecruitCards("recruit-list", filtered);
    });
  });
});

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

function renderRecruitCards(containerId, posts) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (containerId === "recruit-list") {
    container.classList.add("recruit-list");
  }

  if (posts.length === 0) {
    container.innerHTML = `<p class="empty-text">등록된 공고가 없습니다.</p>`;
    return;
  }

  container.innerHTML = posts
    .map((post) => {
      const fee = post.fee ? `<div class="fee">💰 ${post.fee}</div>` : "";
      const thumb = post.thumbnailUrl || "/default.jpg";

      if (containerId === "recruit-list") {
        // 리스트형 카드
        return `
          <div class="recruit-card">
            <img src="${thumb}" alt="${post.title}" />
            <div class="recruit-card-content">
              <p>${post.brand || ""}</p>
              <h3>${post.title}</h3>
              ${fee}
            </div>
          </div>
        `;
      } else {
        // 가로 스크롤 카드
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
      }
    })
    .join("");
}

function getLatestPosts(posts) {
  return [...posts].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 10);
}

function getUrgentPosts(posts) {
  return [...posts].filter((p) => p.date).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 10);
}

function getHighFeePosts(posts) {
  return [...posts]
    .sort((a, b) => {
      const feeA = parseInt(a.fee?.replace(/\D/g, "")) || 0;
      const feeB = parseInt(b.fee?.replace(/\D/g, "")) || 0;
      return feeB - feeA;
    })
    .slice(0, 10);
}

function handleFabClick() {
  const token = localStorage.getItem("liveeToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    location.href = "/livee-beta/frontend/login.html";
  } else {
    location.href = "/livee-beta/frontend/recruitform.html";
  }
}