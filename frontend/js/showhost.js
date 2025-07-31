document.addEventListener("DOMContentLoaded", () => {
  const listEl = document.getElementById("showhostList");
  const categoryFilter = document.getElementById("filterCategory");
  const feeFilter = document.getElementById("filterFee");

  let page = 1;
  let loading = false;
  let hasMore = true;

  const fetchShowhosts = async (reset = false) => {
    if (loading || !hasMore) return;
    loading = true;

    if (reset) {
      listEl.innerHTML = '';
      page = 1;
      hasMore = true;
    }

    try {
      const category = categoryFilter.value;
      const fee = feeFilter.value;

      const res = await fetch(`https://livee-server-dev.onrender.com/portfolio/all?page=${page}&category=${category}&fee=${fee}`);
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        if (page === 1) {
          listEl.innerHTML = `<p style="text-align:center; color:#777;">조건에 맞는 쇼호스트가 없습니다.</p>`;
        }
        hasMore = false;
        return;
      }

      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "showhost-card";
        card.onclick = () => location.href = `/showhost-detail.html?id=${item._id}`;
        card.innerHTML = `
          <img src="${item.photo || '/default-profile.png'}" alt="프로필 이미지" />
          <div class="showhost-info">
            <h3>${item.name || '이름 없음'}</h3>
            <p><strong>카테고리:</strong> ${item.category || '-'}</p>
            <p><strong>희망 출연료:</strong> ${item.fee || '-'}</p>
            <p><strong>경력:</strong> ${item.career || '-'}</p>
          </div>
        `;
        listEl.appendChild(card);
      });

      page++;
    } catch (err) {
      console.error("❌ 쇼호스트 불러오기 오류:", err);
    } finally {
      loading = false;
    }
  };

  // 필터 이벤트
  categoryFilter.addEventListener("change", () => fetchShowhosts(true));
  feeFilter.addEventListener("change", () => fetchShowhosts(true));

  // 무한스크롤
  window.addEventListener("scroll", () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      fetchShowhosts();
    }
  });

  // 첫 로딩
  fetchShowhosts();
});