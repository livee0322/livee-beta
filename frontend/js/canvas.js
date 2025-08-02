document.addEventListener("DOMContentLoaded", () => {
  const imageElement = document.getElementById("imageToCrop");
  const cropBtn = document.getElementById("cropBtn");
  const backBtn = document.getElementById("backBtn");

  const originalImage = localStorage.getItem("cropImage");

  if (!originalImage) {
    alert("편집할 이미지가 없습니다.");
    window.location.href = "/livee-beta/frontend/portfolio-edit.html";
    return;
  }

  imageElement.src = originalImage;

  let cropper = null;

  imageElement.onload = () => {
    cropper = new Cropper(imageElement, {
      aspectRatio: 3 / 4,
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 1,
      responsive: true,
      background: false,
    });
  };

  cropBtn.addEventListener("click", () => {
    if (!cropper) {
      alert("크롭 기능이 초기화되지 않았습니다.");
      return;
    }

    const croppedCanvas = cropper.getCroppedCanvas({
      width: 300,
      height: 400,
    });

    const croppedImage = croppedCanvas.toDataURL("image/png");
    localStorage.setItem("croppedImage", croppedImage);

    window.location.href = "/livee-beta/frontend/portfolio-edit.html";
  });

  backBtn.addEventListener("click", () => {
    window.history.back();
  });
});