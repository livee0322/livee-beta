document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");

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

  // 캔버스에서 저장한 이미지 불러오기 (저장 후 돌아왔을 때)
  const savedImage = localStorage.getItem("croppedImage");
  if (savedImage) {
    imagePreview.src = savedImage;
    localStorage.removeItem("croppedImage"); // 재사용 방지
  }
});