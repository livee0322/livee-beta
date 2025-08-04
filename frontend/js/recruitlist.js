document.addEventListener("DOMContentLoaded", () => {
  const recruitListEl = document.getElementById("recruit-list");
  const categoryButtons = document.querySelectorAll(".category-scroll button");

  let allPosts = [];

  async function fetchPosts() {
    try {
      const res = await fetch("https://main-server-ekgr.onrender.com/api/recruit");
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "불러오기 실패");

      allPosts = data;
      renderList(allPosts);
    } catch (err) {
      console.error("❌ 공고 불러오기 실패:", err);
      recruitListEl.innerHTML = `<p class="empty">공고를 불러오지 못했습니다.</p>`;
    }
  }

  function renderList(posts) {
    if (!posts || posts.length === 0) {
      recruitListEl.innerHTML = `<p class="empty">등록된 공고가 없습니다.</p>`;
      return;
    }

    recruitListEl.innerHTML = posts.map(post => {
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
          <img src="${post.thumbnailUrl || '/livee-beta/frontend/default.jpg'}" alt="${post.title}" />
          <h3>${post.title}</h3>
          <p>${post.brand}</p>
          <small>${dateText}</small>
          <a href="${post.link}" target="_blank">지원하기</a>
        </div>
      `;
    }).join("");
  }

  // ✅ 카테고리 필터 작동
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedCategory = btn.textContent.trim();
      if (selectedCategory === "전체") {
        renderList(allPosts);
      } else {
        const filtered = allPosts.filter(post => post.category === selectedCategory);
        renderList(filtered);
      }
    });
  });

  fetchPosts();
});