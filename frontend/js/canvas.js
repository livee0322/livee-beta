document.addEventListener("DOMContentLoaded", () => {
  const image = document.getElementById("image");
  const cropImage = localStorage.getItem("cropImage");

  if (!cropImage) {
    alert("이미지를 먼저 선택해주세요.");
    window.location.href = "/livee-beta/frontend/portfolio-edit.html";
    return;
  }

  image.src = cropImage;

  let cropper;
  image.onload = () => {
    cropper = new Cropper(image, {
      aspectRatio: 4 / 3,
      viewMode: 1,
    });
  };

  const cropBtn = document.getElementById("cropBtn");
  cropBtn.addEventListener("click", () => {
    const canvas = cropper.getCroppedCanvas();
    const croppedDataUrl = canvas.toDataURL("image/png");
    localStorage.setItem("croppedImage", croppedDataUrl);
    localStorage.removeItem("cropImage");
    window.location.href = "/livee-beta/frontend/portfolio-edit.html";
  });
});