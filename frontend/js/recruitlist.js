document.addEventListener("DOMContentLoaded", async () => {
  const listEl = document.getElementById("recruit-list");
  const categoryButtons = document.querySelectorAll(".category-scroll button");

  let allPosts = [];
  let currentUserId = null;

  // ✅ 내 userId 추출 (토큰 → payload 디코딩)
  const token = localStorage.getItem("liveeToken");
  if (token) {
    try {
      const base64Payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      currentUserId = decodedPayload.id;
    } catch (err) {
      console.warn("❌ 토큰 파싱 오류:", err);
    }
  }

  // ✅ 공고 불러오기
  try {
    const res = await fetch("https://main-server-ekgr.onrender.com/api/recruit");
    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "불러오기 실패");

    allPosts = result;
    renderList(allPosts);
  } catch (err) {
    console.error("❌ 공고 불러오기 실패:", err);
    listEl.innerHTML = `<p class="empty">등록된 공고가 없습니다.</p>`;
  }

  // ✅ 카테고리 필터 작동
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".category-scroll .active")?.classList.remove("active");
      btn.classList.add("active");

      const selected = btn.textContent.trim();
      const filtered = selected === "전체"
        ? allPosts
        : allPosts.filter((post) => post.category === selected);

      renderList(filtered);
    });
  });

  // ✅ 리스트 렌더링 함수
  function renderList(data) {
    if (!data || data.length === 0) {
      listEl.innerHTML = `<p class="empty">해당 카테고리의 공고가 없습니다.</p>`;
      return;
    }

    listEl.innerHTML = data
      .map((post) => {
        const date = new Date(post.date);
        const dateText = isNaN(date.getTime())
          ? "방송일 미정"
          : date.toLocaleString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

        const isMine = currentUserId && post.user === currentUserId;
        const buttonText = isMine ? "수정하기" : "지원하기";
        const buttonHref = isMine
          ? `/livee-beta/frontend/recruitform.html?id=${post._id}`
          : post.link;

        const targetAttr = isMine ? "" : 'target="_blank"';

        return `
          <div class="recruit-card">
            <img src="${post.thumbnailUrl}" alt="${post.title}" />
            <h3>${post.title}</h3>
            <p>${post.brand}</p>
            <small>${dateText}</small>
            <a href="${buttonHref}" ${targetAttr}>${buttonText}</a>
          </div>
        `;
      })
      .join("");
  }
});

// ✅ FAB 클릭 시
function handleFabClick() {
  const token = localStorage.getItem("liveeToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    location.href = "/livee-beta/frontend/login.html";
  } else {
    location.href = "/livee-beta/frontend/recruitform.html";
  }
}