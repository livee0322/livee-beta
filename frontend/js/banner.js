// /livee-beta/js/banner.js
document.addEventListener("DOMContentLoaded", () => {
  const bannerContainer = document.getElementById("beta-banner-container");
  if (bannerContainer) {
    bannerContainer.innerHTML = `
      <div class="beta-banner">
        현재 클로즈 베타 테스트 중입니다
      </div>
    `;
  }
});