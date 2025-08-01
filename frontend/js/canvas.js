let cropper;
const image = document.getElementById("image");
const upload = document.getElementById("upload");

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (evt) {
    image.src = evt.target.result;
    if (cropper) {
      cropper.destroy();
    }
    cropper = new Cropper(image, {
      aspectRatio: 4 / 3,
      viewMode: 1,
      dragMode: "move",
      autoCropArea: 1,
    });
  };
  reader.readAsDataURL(file);
});

document.getElementById("cropBtn").addEventListener("click", () => {
  if (!cropper) return alert("이미지를 먼저 업로드하세요!");

  const canvas = cropper.getCroppedCanvas({
    width: 400,
    height: 300,
  });

  const croppedImage = canvas.toDataURL("image/png");
  localStorage.setItem("croppedImage", croppedImage);

  alert("자른 이미지가 저장되었습니다!");
  window.location.href = "/livee-beta/frontend/portfolio-edit.html";
});