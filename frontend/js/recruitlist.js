document.addEventListener("DOMContentLoaded", async () => {
  const listEl = document.getElementById("recruit-list");
  const categoryButtons = document.querySelectorAll(".category-scroll button");

  let allPosts = [];

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

        return `
          <div class="recruit-card">
            <img src="${post.thumbnailUrl}" alt="${post.title}" />
            <h3>${post.title}</h3>
            <p>${post.brand}</p>
            <small>${dateText}</small>
            <a href="${post.link}" target="_blank">지원하기</a>
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