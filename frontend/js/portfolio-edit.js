document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const selectBtn = document.getElementById("selectFileBtn");
  const imagePreview = document.getElementById("imagePreview");

  // 👉 버튼 누르면 input 실행
  selectBtn.addEventListener("click", () => {
    imageInput.click();
  });

  // 👉 이미지 선택 시 crop 페이지로 이동
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem("cropImage", e.target.result);
      window.location.href = "/livee-beta/frontend/canvas.html";
    };
    reader.readAsDataURL(file);
  });

  // 👉 crop 결과 반영
  const savedImage = localStorage.getItem("croppedImage");
  if (savedImage) {
    imagePreview.src = savedImage;
    localStorage.removeItem("croppedImage");
  }

  // 👉 저장 후 이동
  document.getElementById("saveBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    alert("포트폴리오가 저장되었습니다!");
    window.location.href = "/livee-beta/frontend/mypage.html";
  });

  // 👉 공개여부 로그
  const toggle = document.getElementById("isPublic");
  toggle?.addEventListener("change", () => {
    console.log("공개여부:", toggle.checked ? "공개" : "비공개");
  });
});