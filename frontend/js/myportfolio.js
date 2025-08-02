// 📍 /livee-beta/frontend/js/myportfolio.js

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("liveeToken");
  const portfolioList = document.getElementById("portfolioList"); // ✅ ID 통일

  if (!token) {
    alert("로그인이 필요합니다.");
    window.location.href = "/livee-beta/login.html";
    return;
  }

  try {
    const res = await fetch("https://main-server-ekgr.onrender.com/api/portfolio/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("불러오기 실패");

    const data = await res.json();

    // ✅ 빈 데이터일 경우 처리
    if (!data || Object.keys(data).length === 0) {
      portfolioList.innerHTML = "<p class='no-portfolio'>등록된 포트폴리오가 없습니다.</p>";
      return;
    }

    portfolioList.innerHTML = `
      <div class="portfolio-card">
        <div class="card-header">
          <div class="card-title">"${data.name || '쇼호스트'}" 님</div>
        </div>
        <div class="card-body">
          <p><strong>이름:</strong> ${data.name || '-'}</p>
          <p><strong>나이:</strong> ${data.age || '-'}</p>
          <p><strong>경력:</strong> ${data.experience || '-'}</p>
          <p><strong>지역:</strong> ${data.region || '-'}</p>
          <p><strong>SNS:</strong> ${data.sns ? `<a href="${data.sns}" target="_blank">${data.sns}</a>` : '-'}</p>
          <p><strong>태그:</strong> ${data.tags || '-'}</p>
          <p><strong>전문분야:</strong> ${data.specialty || '-'}</p>
          <p><strong>공개여부:</strong> ${data.isPublic ? "✅ 공개" : "🔒 비공개"}</p>
        </div>
      </div>
    `;
  } catch (err) {
    console.error("오류:", err);
    portfolioList.innerHTML = "<p class='no-portfolio'>포트폴리오를 불러오는 데 실패했습니다.</p>";
  }
});