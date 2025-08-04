document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("liveeToken");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    alert("로그인이 필요합니다.");
    location.href = "/livee-beta/frontend/login.html";
    return;
  }

  const container = document.getElementById("myRecruitList");

  try {
    const res = await fetch(`https://main-server-ekgr.onrender.com/api/recruit?user=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // ✅ 추가된 부분
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    if (data.length === 0) {
      container.innerHTML = `<p class="no-post">등록한 공고가 없습니다.</p>`;
      return;
    }

    const html = data.map((item) => {
      return `
        <div class="recruit-card">
          <img src="${item.thumbnailUrl}" alt="썸네일" />
          <div class="recruit-info">
            <h3>${item.title}</h3>
            <p class="brand">${item.brand || ""}</p>
            <p class="fee"><i class="ri-coins-line"></i> ${item.fee || "미정"}</p>
          </div>
          <div class="recruit-actions">
            <button onclick="editRecruit('${item._id}')"><i class="ri-edit-2-line"></i></button>
            <button onclick="deleteRecruit('${item._id}')"><i class="ri-delete-bin-line"></i></button>
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = html;
  } catch (err) {
    console.error("❌ 내 공고 불러오기 실패:", err);
    alert("내 공고를 불러오지 못했습니다.");
  }
});

function editRecruit(id) {
  location.href = `/livee-beta/frontend/recruitform.html?edit=${id}`;
}

async function deleteRecruit(id) {
  const confirmDelete = confirm("정말 삭제하시겠습니까?");
  if (!confirmDelete) return;

  const token = localStorage.getItem("liveeToken");

  try {
    const res = await fetch(`https://main-server-ekgr.onrender.com/api/recruit/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message);

    alert("삭제되었습니다.");
    location.reload();
  } catch (err) {
    console.error("❌ 삭제 오류:", err);
    alert("삭제 실패: " + err.message);
  }
}