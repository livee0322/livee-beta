document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("liveeToken");
  const currentUserId = getUserIdFromToken(token);
  const listContainer = document.querySelector(".my-recruit-list");

  if (!currentUserId) {
    alert("로그인이 필요합니다.");
    location.href = "/livee-beta/frontend/login.html";
    return;
  }

  try {
    const res = await fetch("https://main-server-ekgr.onrender.com/api/recruit");
    const allPosts = await res.json();

    const myPosts = allPosts.filter((post) => post.user?._id === currentUserId);

    if (myPosts.length === 0) {
      listContainer.innerHTML = `<p class="empty-text">등록한 공고가 없습니다.</p>`;
      return;
    }

    renderMyCards(myPosts);
  } catch (err) {
    console.error("❌ 내 공고 불러오기 실패", err);
    listContainer.innerHTML = `<p class="empty-text">오류가 발생했습니다.</p>`;
  }
});

function getUserIdFromToken(token) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch (err) {
    console.warn("❌ 토큰 파싱 실패:", err);
    return null;
  }
}

function renderMyCards(posts) {
  const container = document.querySelector(".my-recruit-list");
  container.innerHTML = posts
    .map((post) => {
      const fee = post.fee ? `💰 ${post.fee}` : "";
      const thumb = post.thumbnailUrl || "/default.jpg";
      return `
        <div class="my-recruit-card" data-id="${post._id}">
          <img src="${thumb}" alt="${post.title}" />
          <div class="my-recruit-info">
            <h3>${post.title}</h3>
            <p>${post.brand || ""}</p>
            <div class="fee">${fee}</div>
          </div>
          <div class="my-recruit-actions">
            <i class="ri-edit-2-line" onclick="editPost('${post._id}')"></i>
            <i class="ri-delete-bin-line" onclick="deletePost('${post._id}')"></i>
          </div>
        </div>
      `;
    })
    .join("");
}

function editPost(postId) {
  location.href = `/livee-beta/frontend/recruitform.html?edit=${postId}`;
}

async function deletePost(postId) {
  if (!confirm("정말 이 공고를 삭제하시겠습니까?")) return;

  try {
    const res = await fetch(`https://main-server-ekgr.onrender.com/api/recruit/${postId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("삭제되었습니다.");
      document.querySelector(`.my-recruit-card[data-id="${postId}"]`).remove();
    } else {
      alert("삭제에 실패했습니다.");
    }
  } catch (err) {
    console.error("❌ 삭제 중 오류 발생", err);
    alert("오류로 인해 삭제하지 못했습니다.");
  }
}