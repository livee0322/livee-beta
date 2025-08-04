document.addEventListener("DOMContentLoaded", async () => {
  const listEl = document.getElementById("showhostList");

  try {
    const res = await fetch("https://main-server-ekgr.onrender.com/api/portfolio/all");
    const portfolios = await res.json();

    if (!res.ok) throw new Error(portfolios.message || "불러오기 실패");

    if (!portfolios || portfolios.length === 0) {
      listEl.innerHTML = `<p class="empty-message">등록된 쇼호스트가 없습니다.</p>`;
      return;
    }

    listEl.innerHTML = portfolios.map(p => `
      <div class="portfolio-card">
        <img src="${p.image || '/livee-beta/frontend/default.jpg'}" 
             alt="${p.name}" 
             onerror="this.onerror=null;this.src='/livee-beta/frontend/default.jpg';"/>
        <div class="portfolio-info">
          <h3>${p.name}</h3>
          <p>경력: ${p.experience || '-'}</p>
          <p>지역: ${p.region || '-'}</p>
          <p>출연료: ${p.fee || '-'}</p>
          <p>카테고리: ${p.category || '-'}</p>
        </div>
      </div>
    `).join("");

  } catch (err) {
    console.error("❌ 쇼호스트 리스트 오류:", err);
    listEl.innerHTML = `<p class="empty-message">리스트를 불러오지 못했습니다.</p>`;
  }
});