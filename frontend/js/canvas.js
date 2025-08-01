// canvas.js

let cropper;
const upload = document.getElementById('upload');
const image = document.getElementById('image');
const cropBtn = document.getElementById('cropBtn');

upload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    image.src = event.target.result;
    image.style.display = 'block'; // 보이도록

    if (cropper) {
      cropper.destroy();
    }

    cropper = new Cropper(image, {
      aspectRatio: 4 / 3,
      viewMode: 1,
      movable: true,
      cropBoxResizable: false,
      dragMode: 'move',
    });
  };
  reader.readAsDataURL(file);
});

cropBtn.addEventListener('click', () => {
  if (!cropper) return;

  const canvas = cropper.getCroppedCanvas({
    width: 400,
    height: 300,
  });

  canvas.toBlob((blob) => {
    const fileName = 'cropped_image.png';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
  });
});