// ✅ portfolio-edit.js
document.getElementById("selectImageBtn").addEventListener("click", () => {
  window.location.href = "/livee-beta/frontend/canvas.html";
});

window.addEventListener("DOMContentLoaded", () => {
  const imageData = localStorage.getItem("croppedImage");
  if (imageData) {
    document.getElementById("imagePreview").src = imageData;
  }
});