let cropper;
const image = document.getElementById('image');
const saveBtn = document.getElementById('saveBtn');
const backBtn = document.getElementById('backBtn');

// 이미지 파일 선택
window.addEventListener('load', () => {
  const file = localStorage.getItem('cropImageData');
  if (!file) {
    alert('이미지가 없습니다');
    window.history.back();
    return;
  }

  image.src = file;
  image.addEventListener('load', () => {
    cropper = new Cropper(image, {
      aspectRatio: 4 / 3,
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 1,
    });
  });
});

// 저장 버튼
saveBtn.addEventListener('click', () => {
  if (!cropper) return;

  const canvas = cropper.getCroppedCanvas({
    width: 400,
    height: 300,
  });

  const croppedDataURL = canvas.toDataURL('image/jpeg');

  // 저장할 위치로 넘김
  localStorage.setItem('croppedImage', croppedDataURL);
  window.history.back(); // 또는 원하는 페이지로 이동
});

// 뒤로가기
backBtn.addEventListener('click', () => {
  window.history.back();
});