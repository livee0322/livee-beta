document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("liveeToken");
  const portfolioCard = document.getElementById("portfolioCard");

  if (!token) {
    alert("로그인이 필요합니다.");
    window.location.href = "/livee-beta/login.html";
    return;
  }

  try {
    const res = await fetch("https://main-server-ekgr.onrender.com/api/portfolio/mine", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("불러오기 실패");

    const data = await res.json();
    if (!data) {
      portfolioCard.innerHTML = "<p>등록된 포트폴리오가 없습니다.</p>";
      return;
    }

    portfolioCard.innerHTML = `
      <div class="card">
        <img src="${data.image}" alt="프로필 이미지" />
        <h3>${data.name} (${data.age})</h3>
        <p>경력: ${data.experience}</p>
        <p>지역: ${data.region}</p>
        <p>SNS: <a href="${data.sns}" target="_blank">${data.sns}</a></p>
        <p>태그: ${data.tags}</p>
        <p>전문분야: ${data.specialty}</p>
        <p>공개 여부: ${data.isPublic ? "✅ 공개" : "🔒 비공개"}</p>
      </div>
    `;
  } catch (err) {
    console.error("오류:", err);
    portfolioCard.innerHTML = "<p>포트폴리오를 불러오는 데 실패했습니다.</p>";
  }
});