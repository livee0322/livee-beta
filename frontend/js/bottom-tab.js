document.addEventListener("DOMContentLoaded", () => {
  const bottomTab = document.getElementById("bottom-tab-container");
  if (!bottomTab) return;

  bottomTab.innerHTML = `
    <nav class="bottom-tab">
      <a href="/livee-beta/index.html"><i class="ri-home-line"></i><span>홈</span></a>
      <a href="/livee-beta/frontend/showhost.html"><i class="ri-user-star-line"></i><span>쇼호스트</span></a>
      <a href="#" id="bottomMyBtn"><i class="ri-user-line"></i><span id="bottomMyText">로그인</span></a>
    </nav>
  `;

  const token = localStorage.getItem("liveeToken");
  const myBtn = document.getElementById("bottomMyBtn");
  const myText = document.getElementById("bottomMyText");

  if (token) {
    myText.textContent = "My";
    myBtn.href = "/livee-beta/frontend/mypage.html";
  } else {
    myText.textContent = "로그인";
    myBtn.href = "/livee-beta/frontend/login.html";
  }
});