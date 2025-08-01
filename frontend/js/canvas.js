// ✅ canvas.js
let cropper;

document.getElementById("upload").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return alert("이미지를 선택해주세요.");
  const image = document.getElementById("image");
  image.src = URL.createObjectURL(file);
  image.onload = () => {
    if (cropper) cropper.destroy();
    cropper = new Cropper(image, {
      aspectRatio: 4 / 3,
      viewMode: 1,
      movable: true,
      zoomable: true,
      scalable: false,
      rotatable: false,
    });
  };
});

document.getElementById("saveBtn").addEventListener("click", () => {
  if (!cropper) return alert("이미지를 먼저 선택해주세요.");
  const canvas = cropper.getCroppedCanvas({ width: 400, height: 300 });
  const imageData = canvas.toDataURL("image/jpeg");
  localStorage.setItem("croppedImage", imageData);
  window.location.href = "/livee-beta/frontend/portfolio-edit.html";
});