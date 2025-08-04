document.addEventListener("DOMContentLoaded", () => {
  const bottomTab = document.getElementById("bottom-tab-container");
  if (!bottomTab) return;

  const token = localStorage.getItem("liveeToken");
  const myHref = token
    ? "/livee-beta/frontend/mypage.html"
    : "/livee-beta/frontend/login.html";
  const myText = token ? "My" : "로그인";

  bottomTab.innerHTML = `
    <nav class="bottom-tab">
      <a href="/livee-beta/index.html">
        <i class="ri-home-line"></i><span>홈</span>
      </a>
      <a href="/livee-beta/frontend/showhost.html">
        <i class="ri-user-star-line"></i><span>쇼호스트</span>
      </a>
      <a href="/livee-beta/frontend/recruitlist.html">
        <i class="ri-megaphone-line"></i><span>모집공고</span>
      </a>
      <a href="${myHref}">
        <i class="ri-user-line"></i><span>${myText}</span>
      </a>
    </nav>
  `;
});