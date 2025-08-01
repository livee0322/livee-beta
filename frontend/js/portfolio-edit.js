document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");

  // 🔁 파일 선택 시 로컬스토리지 저장 후 캔버스 페이지로 이동
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem("cropImage", e.target.result); // 임시 저장
      window.location.href = "/livee-beta/frontend/canvas.html";
    };
    reader.readAsDataURL(file);
  });

  // ✅ 크롭 후 돌아왔을 때 이미지 표시
  const savedImage = localStorage.getItem("croppedImage");
  if (savedImage) {
    imagePreview.src = savedImage;
    localStorage.removeItem("croppedImage");
  }
});