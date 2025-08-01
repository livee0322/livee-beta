// /livee-beta/frontend/js/portfolio-edit.js

// 이미지 불러오기
const croppedImage = document.getElementById("croppedImage");
const savedImage = localStorage.getItem("croppedImage");
if (croppedImage && savedImage) {
  croppedImage.src = savedImage;
}

// 저장하기 버튼
document.getElementById("saveBtn").addEventListener("click", () => {
  alert("포트폴리오가 저장되었습니다!");
  window.location.href = "/livee-beta/frontend/mypage.html";
});