// Swiper 메인 배너
const swiper = new Swiper('.main-banner-swiper', {
  effect: 'coverflow',
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  autoplay: {delay: 3500, disableOnInteraction:false},
  coverflowEffect: { rotate: 25, stretch: 0, depth: 100, modifier: 1, slideShadows: true, },
  pagination: { el: '.swiper-pagination', clickable: true, },
});

// 하단탭 - 로그인/마이 연동 (예시, 추후 서버 연동)
document.addEventListener('DOMContentLoaded', () => {
  const mypageBtn = document.getElementById('mypage-btn');
  const isLoggedIn = localStorage.getItem('liveeToken'); // 실제 로그인 체크
  if(isLoggedIn) {
    mypageBtn.innerText = "마이페이지";
    mypageBtn.href = "/mypage.html";
  } else {
    mypageBtn.innerText = "로그인";
    mypageBtn.href = "/login.html";
  }
});