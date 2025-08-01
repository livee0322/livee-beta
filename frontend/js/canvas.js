// /livee-beta/frontend/js/canvas.js

const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let image = new Image();

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (evt) {
    image.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.src = evt.target.result;
  };
  reader.readAsDataURL(file);
});

document.getElementById("cropBtn").addEventListener("click", () => {
  const cropped = canvas.toDataURL("image/png");
  localStorage.setItem("croppedImage", cropped);
  alert("이미지가 저장되었습니다!");
  window.location.href = "/livee-beta/frontend/portfolio-edit.html";
});