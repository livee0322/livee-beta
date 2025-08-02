document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("liveeToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    window.location.href = "/livee-beta/login.html";
    return;
  }

  fetch("https://main-server-ekgr.onrender.com/api/portfolio/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("portfolioContent");

      if (!data || !data.name) {
        container.innerHTML = `<p>등록된 포트폴리오가 없습니다.</p>`;
        return;
      }

      container.innerHTML = `
        <div class="portfolio-card">
          <div class="image-wrapper">
            <img src="${data.image || '/default-profile.png'}" alt="프로필" />
          </div>
          <div class="info">
            <h3>${data.name}</h3>
            <p>${data.specialty || '소개 없음'}</p>
            <p>${data.region || ''} ${data.age ? `| ${data.age}세` : ''}</p>
            <p class="tags">${data.tags || ''}</p>
            <p><strong>SNS:</strong> ${data.sns || '-'}</p>
            <p><strong>경력:</strong> ${data.experience || '-'}</p>
          </div>
        </div>
      `;
    })
    .catch((err) => {
      console.error("❌ 포트폴리오 불러오기 실패:", err);
      alert("포트폴리오를 불러오지 못했습니다.");
    });
});