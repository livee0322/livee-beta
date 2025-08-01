document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const imagePreviewWrapper = document.getElementById("imagePreviewWrapper");

  // 파일 선택 시 이벤트
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      // canvas.html에서 이미지 편집
      localStorage.setItem("cropImage", e.target.result);
      window.location.href = "/livee-beta/frontend/canvas.html";
    };
    reader.readAsDataURL(file);
  });

  // crop 완료 이미지 불러오기
  const savedImage = localStorage.getItem("croppedImage");
  if (savedImage) {
    imagePreviewWrapper.innerHTML = `<img src="${savedImage}" alt="미리보기" />`;
    localStorage.removeItem("croppedImage");
  }
});