// ✅ 이거 그대로 사용하세요
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("liveeToken");
  const currentUserId = getUserIdFromToken(token);

  // 토큰 없으면 로그인 유도
  if (!currentUserId) {
    alert("로그인이 필요합니다.");
    location.href = "/livee-beta/frontend/login.html";
    return;
  }

  // 전체 공고 불러오기
  let allPosts = [];
  try {
    const res = await fetch("https://main-server-ekgr.onrender.com/api/recruit");
    allPosts = await res.json();
  } catch (err) {
    console.error("❌ 공고 불러오기 실패", err);
  }

  // 🔥 내가 등록한 공고만 필터
  const myPosts = allPosts.filter((post) => post.user === currentUserId);
  renderRecruitCards("recruit-list", myPosts);
});

// ✅ 유저 ID 추출 함수
function getUserIdFromToken(token) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.id || null;
  } catch (err) {
    console.warn("❌ 토큰 파싱 실패:", err);
    return null;
  }
}

// ✅ 카드 렌더링 함수
function renderRecruitCards(containerId, posts) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.classList.add("recruit-list");

  if (posts.length === 0) {
    container.innerHTML = `<p class="empty-text">등록한 공고가 없습니다.</p>`;
    return;
  }

  container.innerHTML = posts
    .map((post) => {
      const fee = post.fee ? `<div class="fee">💰 ${post.fee}</div>` : "";
      const thumb = post.thumbnailUrl || "/default.jpg";

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
    })
    .join("");
}