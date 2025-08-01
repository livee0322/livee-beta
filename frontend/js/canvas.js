document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const backButton = document.getElementById("backButton");
  const saveButton = document.getElementById("saveButton");

  // 이미지 로드
  const imageDataUrl = localStorage.getItem("cropImage");
  if (!imageDataUrl) {
    alert("이미지가 없습니다.");
    window.history.back();
    return;
  }

  const image = new Image();
  image.onload = () => {
    canvas.width = 300;
    canvas.height = 400;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
  image.src = imageDataUrl;

  // 뒤로가기
  backButton.addEventListener("click", () => {
    window.history.back();
  });

  // 저장하기
  saveButton.addEventListener("click", () => {
    const cropped = canvas.toDataURL("image/png");
    localStorage.setItem("croppedImage", cropped);
    window.location.href = "/livee-beta/frontend/portfolio-edit.html";
  });
});