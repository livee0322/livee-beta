document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const uploadButton = document.getElementById("uploadButton");
  const imagePreviewWrapper = document.getElementById("imagePreviewWrapper");

  // 버튼 클릭 → input 클릭
  if (uploadButton && imageInput) {
    uploadButton.addEventListener("click", () => {
      imageInput.click();
    });
  }

  // 이미지 선택 → cropImage 저장 후 이동
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

  // 크롭된 이미지 미리보기 표시
  const savedImage = localStorage.getItem("croppedImage");
  if (savedImage && imagePreviewWrapper) {
    imagePreviewWrapper.innerHTML = `<img src="${savedImage}" alt="미리보기" />`;
    localStorage.removeItem("croppedImage");
  }
});