document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");

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

  const savedImage = localStorage.getItem("croppedImage");
  if (savedImage) {
    imagePreview.innerHTML = `<img src="${savedImage}" alt="미리보기" />`;
    localStorage.removeItem("croppedImage");
  }
});