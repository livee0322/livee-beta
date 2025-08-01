document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const uploadButton = document.getElementById("uploadButton");
  const imagePreviewWrapper = document.getElementById("imagePreviewWrapper");

  // ✅ 버튼 클릭 시 input[type=file] 클릭 트리거
  uploadButton.addEventListener("click", () => {
    imageInput.click();
  });

  // ✅ 파일 선택 시 로컬스토리지에 저장 후 캔버스로 이동
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem("cropImage", e.target.result);
      window.location.href = "/livee-beta/frontend/canvas.html";
    };
    reader.readAsDataURL(file);
  });

  // ✅ 캔버스에서 저장된 이미지 불러오기
  const savedImage = localStorage.getItem("croppedImage");
  if (savedImage) {
    imagePreviewWrapper.innerHTML = `<img src="${savedImage}" alt="미리보기" />`;
    localStorage.removeItem("croppedImage");
  }
});