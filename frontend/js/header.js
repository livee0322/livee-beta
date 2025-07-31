document.getElementById('header-container').innerHTML = `
  <header class="header">
    <a href="/livee-beta/index.html" class="logo">Livee</a>
    <div class="right-icons">
      <span id="welcomeMsg" style="display: none;"></span>
      <i class="ri-user-3-line" id="userIcon" onclick="handleUserIconClick()"></i>
    </div>
  </header>
`;

function handleUserIconClick() {
  const token = localStorage.getItem('liveeToken');
  if (token) {
    location.href = "/livee-beta/frontend/mypage.html";
  } else {
    location.href = "/livee-beta/frontend/login.html";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("liveeToken");
  const welcomeMsg = document.getElementById("welcomeMsg");

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload.name || payload.username || "사용자";

      welcomeMsg.textContent = `${username}님`;
      welcomeMsg.style.display = "inline-block";
    } catch (e) {
      console.error("토큰 파싱 오류:", e);
    }
  }
});