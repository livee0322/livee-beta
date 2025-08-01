document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");
  const imageButton = document.getElementById("imageUploadButton");

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

  // 🔄 캔버스에서 돌아왔을 때 이미지 반영
  const savedImage = localStorage.getItem("croppedImage");
  if (savedImage) {
    imagePreview.src = savedImage;
    imagePreview.style.display = "block";
    imageButton.style.display = "none";
    localStorage.removeItem("croppedImage");
  }
});