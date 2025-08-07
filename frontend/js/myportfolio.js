// 📍 내 포트폴리오 보기 (수정/삭제 포함)
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("liveeToken");
  const listContainer = document.getElementById("portfolioList");
  const actionBtn = document.getElementById("portfolioActionBtn");

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
    if (!res.ok || !data || !data.name) throw new Error(data.message || "불러오기 실패");

    const {
      profileImage,
      backgroundImage,
      name,
      region,
      experienceYears,
      statusMessage,
      jobTag,
      introText
    } = data;

    // 포트폴리오 카드 렌더링
    listContainer.innerHTML = `
      <div class="myportfolio-card">
        <div class="background" style="background-image: url('${backgroundImage || "/livee-beta/default-bg.jpg"}');">
          <div class="profile-wrapper">
            <img class="profile" src="${profileImage || "/livee-beta/default-profile.jpg"}" />
          </div>
        </div>
        <div class="info">
          <h3>${name || "이름 없음"}</h3>
          <p class="job">${jobTag || ""}</p>
          <p class="region">📍 ${region || "-"}</p>
          <p class="exp">총 경력: ${experienceYears || 0}년</p>
          <p class="status">${statusMessage || ""}</p>
          <p class="intro">${introText || ""}</p>
          <div class="btn-group">
            <button id="editBtn">수정하기</button>
            <button id="deleteBtn">삭제하기</button>
          </div>
        </div>
      </div>
    `;

    // 수정 버튼 동작
    document.getElementById("editBtn").addEventListener("click", () => {
      localStorage.setItem("portfolioData", JSON.stringify(data));
      location.href = "/livee-beta/frontend/portfolio-edit.html";
    });

    // 삭제 버튼 동작
    document.getElementById("deleteBtn").addEventListener("click", async () => {
      if (!confirm("정말 삭제하시겠습니까? 되돌릴 수 없습니다.")) return;

      try {
        const delRes = await fetch("https://main-server-ekgr.onrender.com/api/portfolio/me", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const result = await delRes.json();
        if (!delRes.ok) throw new Error(result.message);

        alert("포트폴리오가 삭제되었습니다.");
        location.reload();
      } catch (err) {
        alert("삭제 실패: " + err.message);
        console.error("❌ 삭제 오류:", err);
      }
    });

    // 버튼 텍스트 조정
    actionBtn.textContent = "포트폴리오 수정하기";

  } catch (err) {
    console.error("❌ 포트폴리오 불러오기 오류:", err);
    listContainer.innerHTML = `<p class="empty-message">등록된 포트폴리오가 없습니다.</p>`;
    actionBtn.textContent = "포트폴리오 등록하기";
    actionBtn.onclick = () => {
      localStorage.removeItem("portfolioData");
      location.href = "/livee-beta/frontend/portfolio-edit.html";
    };
  }
});