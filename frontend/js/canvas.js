document.addEventListener("DOMContentLoaded", () => {
  const image = document.getElementById("image");
  const cropBtn = document.getElementById("cropBtn");
  let cropper;

  const dataUrl = localStorage.getItem("cropImage");
  if (dataUrl) {
    image.src = dataUrl;
    image.onload = () => {
      cropper = new Cropper(image, {
        aspectRatio: 4 / 3,
        viewMode: 1,
        movable: true,
        zoomable: true,
        scalable: false,
        cropBoxResizable: true,
      });
    };
  }

  cropBtn.addEventListener("click", () => {
    const croppedCanvas = cropper.getCroppedCanvas({
      width: 800,
      height: 600,
    });
    const croppedImageData = croppedCanvas.toDataURL("image/jpeg");
    localStorage.setItem("croppedImage", croppedImageData);
    window.location.href = "/livee-beta/frontend/portfolio-edit.html";
  });
});