document.addEventListener("DOMContentLoaded", () => {
  const image = document.getElementById("image");
  const cropBtn = document.getElementById("cropBtn");
  const backBtn = document.getElementById("backBtn");

  const cropImageData = localStorage.getItem("cropImage");
  if (!cropImageData) {
    alert("잘못된 접근입니다.");
    window.location.href = "/livee-beta/frontend/portfolio-edit.html";
    return;
  }

  image.src = cropImageData;

  let cropper;
  image.addEventListener("load", () => {
    cropper = new Cropper(image, {
      aspectRatio: 4 / 3,
      viewMode: 1,
      autoCropArea: 1,
    });
  });

  cropBtn.addEventListener("click", () => {
    if (!cropper) return;

    const canvas = cropper.getCroppedCanvas({
      width: 400,
      height: 300,
    });

    const croppedDataUrl = canvas.toDataURL("image/jpeg");
    localStorage.setItem("croppedImage", croppedDataUrl);
    localStorage.removeItem("cropImage");
    window.location.href = "/livee-beta/frontend/portfolio-edit.html";
  });

  backBtn.addEventListener("click", () => {
    window.history.back();
  });
});