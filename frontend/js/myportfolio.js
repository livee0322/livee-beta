// 📍 /livee-beta/frontend/js/myportfolio.js

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("liveeToken");
  const listContainer = document.getElementById("portfolioList");

  if (!token) {
    alert("로그인이 필요합니다.");
    location.href = "/livee-beta/login.html";
    return;
  }

  try {
    const res = await fetch("https://main-server-ekgr.onrender.com/api/portfolio/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "불러오기 실패");
    }

    if (!data || !data.name) {
      listContainer.innerHTML = `<p class="empty-message">현재 등록된 포트폴리오가 없습니다.</p>`;
      return;
    }

    listContainer.innerHTML = `
      <div class="portfolio-card">
        <img src="${data.image || '/livee-beta/frontend/default.jpg'}" 
             alt="${data.name}" 
             onerror="this.onerror=null;this.src='/livee-beta/frontend/default.jpg';"/>
        <div class="portfolio-info">
          <h3>${data.name}</h3>
          <p>경력: ${data.experience || '-'}</p>
          <p>지역: ${data.region || '-'}</p>
        </div>
      </div>
    `;

  } catch (err) {
    console.error("❌ 포트폴리오 불러오기 오류:", err);
    listContainer.innerHTML = `<p class="empty-message">포트폴리오를 불러오지 못했습니다.</p>`;
  }
});