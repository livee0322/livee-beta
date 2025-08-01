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
    console.log("✅ 이미지 로드 완료, cropper 생성 시작");
    try {
      cropper = new Cropper(imageElement, {
        aspectRatio: 3 / 4,
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 1,
        responsive: true,
        background: false,
        ready() {
          console.log("✅ cropper ready");
        },
      });
    } catch (err) {
      console.error("❌ cropper 생성 실패", err);
    }
  };

  cropBtn.addEventListener("click", () => {
    console.log("👉 저장 버튼 클릭됨");
    if (!cropper) {
      console.warn("❌ cropper 인스턴스 없음");
      return;
    }

    try {
      const croppedCanvas = cropper.getCroppedCanvas({
        width: 300,
        height: 400,
      });

      const croppedImage = croppedCanvas.toDataURL("image/png");
      localStorage.setItem("croppedImage", croppedImage);

      console.log("✅ 저장 완료 → portfolio-edit 이동");
      window.location.href = "/livee-beta/frontend/portfolio-edit.html";
    } catch (err) {
      console.error("❌ 크롭 중 오류", err);
    }
  });

  backBtn.addEventListener("click", () => {
    window.history.back();
  });
});