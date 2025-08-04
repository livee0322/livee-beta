// 📍 /frontend/js/showhost.js

document.addEventListener("DOMContentLoaded", async () => {
  const listEl = document.getElementById("showhostList");
  const filterCategory = document.getElementById("filterCategory");
  const filterFee = document.getElementById("filterFee");

  let allData = [];

  try {
    const res = await fetch("https://main-server-ekgr.onrender.com/api/portfolio");
    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "불러오기 실패");

    allData = result; // 전체 저장
    renderList(allData);

  } catch (err) {
    console.error("❌ 쇼호스트 불러오기 실패:", err);
    listEl.innerHTML = `<p class="empty-message">등록된 쇼호스트가 없습니다.</p>`;
  }

  // ✅ 필터 작동
  [filterCategory, filterFee].forEach(select => {
    select.addEventListener("change", () => {
      const filtered = allData.filter(item => {
        const matchCategory = filterCategory.value === "" || item.category === filterCategory.value;
        const matchFee = filterFee.value === "" || item.fee === filterFee.value;
        return matchCategory && matchFee;
      });
      renderList(filtered);
    });
  });

  function renderList(data) {
    if (!data || data.length === 0) {
      listEl.innerHTML = `<p class="empty-message">등록된 쇼호스트가 없습니다.</p>`;
      return;
    }

    listEl.innerHTML = data.map(item => `
      <div class="portfolio-card">
        <img src="${item.image || '/livee-beta/frontend/default.jpg'}" 
             alt="${item.name}" 
             onerror="this.onerror=null;this.src='/livee-beta/frontend/default.jpg';"/>
        <div class="portfolio-info">
          <h3>${item.name}</h3>
          <p>경력: ${item.experience || '-'}</p>
          <p>지역: ${item.region || '-'}</p>
        </div>
      </div>
    `).join("");
  }
});