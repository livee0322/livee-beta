document.addEventListener("DOMContentLoaded", async () => {
  const listEl = document.getElementById("showhostList");
  const filterCategory = document.getElementById("filterCategory");
  const filterFee = document.getElementById("filterFee");
  const token = localStorage.getItem("liveeToken");
  let myUserId = null;
  let allData = [];

  // 🔍 내 유저 ID 가져오기 (토큰에서 디코딩된 사용자 정보 필요)
  if (token) {
    try {
      const res = await fetch("https://main-server-ekgr.onrender.com/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const user = await res.json();
      if (res.ok) {
        myUserId = user._id;
      }
    } catch (err) {
      console.warn("유저 정보 가져오기 실패:", err);
    }
  }

  // ✅ 공개 포트폴리오 불러오기
  try {
    const res = await fetch("https://main-server-ekgr.onrender.com/api/portfolio/all");
    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "불러오기 실패");

    allData = result;
    renderList(allData);
  } catch (err) {
    console.error("❌ 쇼호스트 불러오기 실패:", err);
    listEl.innerHTML = `<p class="empty-message">등록된 쇼호스트가 없습니다.</p>`;
  }

  // ✅ 필터링
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

  // ✅ 리스트 렌더링 함수
  function renderList(data) {
    if (!data || data.length === 0) {
      listEl.innerHTML = `<p class="empty-message">등록된 쇼호스트가 없습니다.</p>`;
      return;
    }

    listEl.innerHTML = data.map(item => {
      const isMine = myUserId && item.user === myUserId;

      return `
        <div class="portfolio-card">
          <img src="${item.profileImage || '/livee-beta/frontend/default-profile.jpg'}" 
               alt="${item.name}" 
               onerror="this.onerror=null;this.src='/livee-beta/frontend/default-profile.jpg';"/>
          <div class="portfolio-info">
            <h3>${item.name || '이름 없음'}</h3>
            <p>경력: ${item.experienceYears || '-'}년</p>
            <p>지역: ${item.region || '-'}</p>
            ${isMine ? `<button class="delete-btn" data-id="${item._id}">삭제하기</button>` : ""}
          </div>
        </div>
      `;
    }).join("");

    // 삭제 버튼 이벤트 등록
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const portfolioId = btn.dataset.id;
        if (!confirm("정말 삭제하시겠습니까?")) return;

        try {
          const delRes = await fetch(`https://main-server-ekgr.onrender.com/api/portfolio/${portfolioId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const result = await delRes.json();
          if (!delRes.ok) throw new Error(result.message);

          alert("삭제 완료!");
          // 목록에서 제거
          allData = allData.filter(p => p._id !== portfolioId);
          renderList(allData);
        } catch (err) {
          alert("삭제 실패: " + err.message);
        }
      });
    });
  }
});