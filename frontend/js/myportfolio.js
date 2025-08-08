// 📍 /frontend/js/myportfolio.js
const API = "https://main-server-ekgr.onrender.com";
const token = localStorage.getItem("liveeToken");

document.addEventListener("DOMContentLoaded", async () => {
  if (!token) {
    alert("로그인이 필요합니다.");
    location.href = "/livee-beta/login.html";
    return;
  }

  const listEl = document.getElementById("portfolioList");
  const addBtn = document.getElementById("portfolioActionBtn");

  try {
    const res = await fetch(`${API}/portfolio/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    if (!res.ok || !data || !data.name) throw new Error(data.message || "불러오기 실패");

    const {
      _id,
      profileImage,
      backgroundImage,
      name,
      region,
      experienceYears,
      statusMessage,
      jobTag,
      introText
    } = data;

    listEl.innerHTML = `
      <div class="myportfolio-card">
        <div class="background" style="background-image: url('${backgroundImage || '/livee-beta/default-bg.jpg'}');">
          <div class="profile-wrapper">
            <img class="profile" src="${profileImage || '/livee-beta/default-profile.jpg'}" />
          </div>
        </div>
        <div class="info">
          <h3>${name || "이름 없음"}</h3>
          <p class="job">${jobTag || ""}</p>
          <p>📍 ${region || "-"}</p>
          <p>경력: ${experienceYears || 0}년</p>
          <p>${statusMessage || ""}</p>
          <p>${introText || ""}</p>
        </div>
        <div class="card-actions">
          <button onclick="editPortfolio()">수정</button>
          <button onclick="deletePortfolio()">삭제</button>
        </div>
      </div>
    `;

    addBtn.textContent = "포트폴리오 수정하기";
    addBtn.onclick = editPortfolio;
  } catch (err) {
    console.warn("❌ 포트폴리오 없음:", err);
    listEl.innerHTML = `<p class="empty-message">아직 등록된 포트폴리오가 없습니다.</p>`;
    addBtn.textContent = "포트폴리오 등록하기";
    addBtn.onclick = () => location.href = "/livee-beta/frontend/portfolio-edit.html";
  }
});

// 수정 버튼
function editPortfolio() {
  location.href = "/livee-beta/frontend/portfolio-edit.html";
}

// 삭제 버튼
async function deletePortfolio() {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  const token = localStorage.getItem("liveeToken");
  try {
    const res = await fetch("https://main-server-ekgr.onrender.com/api/portfolio/me", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    const result = await res.json();
    alert(result.message || "삭제 완료");
    window.location.reload();
  } catch (err) {
    console.error("❌ 삭제 오류:", err);
    alert("삭제 실패");
  }
}