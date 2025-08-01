document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");

  // 👉 파일 선택하면 crop 페이지로 이동
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem("cropImage", e.target.result); // base64 임시 저장
      window.location.href = "/livee-beta/frontend/canvas.html";
    };
    reader.readAsDataURL(file);
  });

  // 👉 크롭된 이미지가 돌아왔을 때 보여줌
  const savedImage = localStorage.getItem("croppedImage");
  if (savedImage) {
    imagePreview.src = savedImage;
    localStorage.removeItem("croppedImage");
  }
});