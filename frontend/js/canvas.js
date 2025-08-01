document.addEventListener("DOMContentLoaded", () => {
  const imageElement = document.getElementById("imageToCrop");
  const cropBtn = document.getElementById("cropBtn");
  const backBtn = document.getElementById("backBtn");

  // 저장된 원본 이미지 로드
  const originalImage = localStorage.getItem("cropImage");
  if (!originalImage) {
    alert("편집할 이미지가 없습니다.");
    window.location.href = "/livee-beta/frontend/portfolio-edit.html";
    return;
  }

  // 안전한 이미지 초기화
  imageElement.src = "";
  imageElement.src = originalImage;

  let cropper = null;

  // 이미지 로드 후 cropper 초기화
  imageElement.addEventListener("load", () => {
    cropper = new Cropper(imageElement, {
      aspectRatio: 3 / 4,
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 1,
      responsive: true,
      background: false,
    });
  });

  // 저장 버튼 클릭 시 크롭 → 로컬스토리지 → 이동
  cropBtn.addEventListener("click", () => {
    if (!cropper) {
      alert("이미지 편집기가 초기화되지 않았습니다.");
      return;
    }

    const croppedCanvas = cropper.getCroppedCanvas({
      width: 300,
      height: 400,
    });

    const croppedImage = croppedCanvas.toDataURL("image/png");
    localStorage.setItem("