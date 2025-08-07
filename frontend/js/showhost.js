// 📍 /frontend/js/showhost.js

document.addEventListener("DOMContentLoaded", async () => {
  const listEl = document.getElementById("showhostList");
  const filterCategory = document.getElementById("filterCategory");
  const filterFee = document.getElementById("filterFee");

  let allData = [];
  const myId = localStorage.getItem("liveeUserId"); // 로그인한 사용자 ID

  try {
    // ✅ 공개 포트폴리오 가져오기
    const res = await fetch("https://main-server-ekgr.onrender.com/api/portfolio/all");
    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "불러오기 실패");

    allData = result;
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

  // ✅ 삭제 함수
  window.deletePortfolio = async () => {
    const token = localStorage.getItem("liveeToken");
    if (!token) return alert("로그인이 필요합니다.");

    const ok = confirm("정말 삭제하시겠습니까?");
    if (!ok) return;

    try {
      const res = await fetch("https://main-server-ekgr.onrender.com/api/portfolio/me", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("삭제 실패");

      alert("삭제되었습니다.");
      location.reload();
    } catch (err) {
      console.error("❌ 삭제 오류:", err);
      alert("삭제 실패");
    }
  };

  // ✅ 리스트 렌더링
  function renderList(data) {
    if (!data || data.length === 0) {
      listEl.innerHTML = `<p class="empty-message">등록된 쇼호스트가 없습니다.</p>`;
      return;
    }

    listEl.innerHTML = data
      .map(item => `
      <div class="portfolio-card">
        <img src="${item.profileImage || '/livee-beta/frontend/default-profile.jpg'}" 
             alt="${item.name}" 
             onerror="this.onerror=null;this.src='/livee-beta/frontend/default-profile.jpg';"/>
        <div class="portfolio-info">
          <h3>${item.name || '이름 없음'}</h3>
          <p>경력: ${item.experienceYears || '-'}년</p>
          <p>지역: ${item.region || '-'}</p>
          ${
            item.user === myId
              ? `<button class="delete-btn" onclick="deletePortfolio()"><i class="ri-delete-bin-line"></i></button>`
              : ""
          }
        </div>
      </div>
    `)
      .join("");
  }
});