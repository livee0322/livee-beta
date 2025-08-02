// ✅ /livee-beta/frontend/js/canvas.js
document.addEventListener("DOMContentLoaded", () => {
  const imageElement = document.getElementById("imageToCrop");
  const cropBtn = document.getElementById("cropBtn");
  const backBtn = document.getElementById("backBtn");

  // ✅ 저장된 이미지 불러오기
  const originalImage = localStorage.getItem("cropImage");

  if (!originalImage) {
    alert("편집할 이미지가 없습니다.");
    window.location.href = "/livee-beta/frontend/portfolio-edit.html";
    return;
  }

  let cropper = null;

  // ✅ 크롭퍼 초기화: onload 먼저 설정 후 src 지정
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

  imageElement.src = originalImage;

  // ✅ 저장 버튼 클릭 → 이미지 크롭 → 저장
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

    // ✅ 포트폴리오 수정 페이지로 이동
    window.location.href = "/livee-beta/frontend/portfolio-edit.html";
  });

  // ✅ 뒤로가기 버튼
  backBtn.addEventListener("click", () => {
    window.history.back();
  });
});