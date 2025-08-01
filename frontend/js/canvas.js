// Cropper 인스턴스 변수
let cropper;

// DOMContentLoaded 시 실행
document.addEventListener("DOMContentLoaded", () => {
  const imageElement = document.getElementById("imageToCrop");
  const cropBtn = document.getElementById("cropBtn");
  const backBtn = document.getElementById("backBtn");

  // 로컬스토리지에 저장된 원본 이미지 불러오기
  const originalImage = localStorage.getItem("cropImage");
  if (!originalImage) {
    alert("편집할 이미지가 없습니다.");
    window.location.href = "/livee-beta/frontend/portfolio-edit.html";
    return;
  }

  // 이미지 src 세팅
  imageElement.src = originalImage;

  // 이미지가 로드된 후 Cropper 인스턴스 생성
  imageElement.onload = () => {
    cropper = new Cropper(imageElement, {
      aspectRatio: 3 / 4, // 3:4 비율 고정
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 1,
      responsive: true,
      background: false,
    });
  };

  // 저장하기 버튼 클릭 시
  cropBtn.addEventListener("click", () => {
    if (!cropper) return;

    // 크롭된 이미지 가져오기
    const croppedCanvas = cropper.getCroppedCanvas({
      width: 300,
      height: 400,
    });

    // base64 데이터로 변환
    const croppedImage = croppedCanvas.toDataURL("image/png");

    // 로컬스토리지에 저장하고 이전 페이지로 이동
    localStorage.setItem("croppedImage", croppedImage);
    window.location.href = "/livee-beta/frontend/portfolio-edit.html";
  });

  // 뒤로가기 버튼
  backBtn.addEventListener("click", () => {
    window.history.back();
  });
});