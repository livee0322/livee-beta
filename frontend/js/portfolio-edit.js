document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const canvas = document.getElementById("imageCanvas");
  const cropBox = document.getElementById("cropBox");
  const ctx = canvas.getContext("2d");

  let img = new Image();
  let startX = 0;
  let startY = 0;
  let dragging = false;

  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight;
        if (imgRatio > canvasRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
        }

        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });

  cropBox.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.offsetX;
    startY = e.offsetY;
  });

  document.addEventListener("mousemove", (e) => {
    if (dragging) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - startX;
      const y = e.clientY - rect.top - startY;
      cropBox.style.left = `${x}px`;
      cropBox.style.top = `${y}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });

  document.getElementById("saveBtn")?.addEventListener("click", () => {
    alert("포트폴리오가 저장되었습니다!");
    window.location.href = "/livee-beta/frontend/mypage.html";
  });

  const toggle = document.getElementById("isPublic");
  toggle?.addEventListener("change", () => {
    console.log("공개여부:", toggle.checked ? "공개" : "비공개");
  });
});