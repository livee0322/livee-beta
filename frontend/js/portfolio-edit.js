document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const canvas = document.getElementById("imageCanvas");
  const cropBox = document.getElementById("cropBox");
  const ctx = canvas.getContext("2d");

  let img = new Image();
  let startX = 0;
  let startY = 0;
  let dragging = false;

  // ✅ cropBox 초기 크기 및 위치 지정
  cropBox.style.width = "100px";
  cropBox.style.height = "75px"; // 4:3 비율 유지
  cropBox.style.left = "10px";
  cropBox.style.top = "10px";

  // ✅ 이미지 선택 → 미리보기 및 캔버스에 렌더링
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 이미지 비율 유지하며 캔버스에 맞게 중앙 정렬
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const imgWidth = img.width * scale;
        const imgHeight = img.height * scale;
        const offsetX = (canvas.width - imgWidth) / 2;
        const offsetY = (canvas.height - imgHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);

        // cropBox 초기화 위치 재설정
        cropBox.style.left = "10px";
        cropBox.style.top = "10px";
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });

  // ✅ cropBox 드래그 시작
  cropBox.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.offsetX;
    startY = e.offsetY;
  });

  // ✅ cropBox 드래그 이동
  document.addEventListener("mousemove", (e) => {
    if (dragging) {
      const rect = canvas.getBoundingClientRect();
      const cropRect = cropBox.getBoundingClientRect();

      // 마우스 위치 기반 좌표 계산
      let x = e.clientX - rect.left - startX;
      let y = e.clientY - rect.top - startY;

      // 캔버스 범위 내로 제한
      x = Math.max(0, Math.min(x, canvas.width - cropBox.offsetWidth));
      y = Math.max(0, Math.min(y, canvas.height - cropBox.offsetHeight));

      cropBox.style.left = `${x}px`;
      cropBox.style.top = `${y}px`;
    }
  });

  // ✅ 드래그 종료
  document.addEventListener("mouseup", () => {
    dragging = false;
  });

  // ✅ 저장 버튼 → 알림 후 마이페이지 이동
  document.getElementById("saveBtn")?.addEventListener("click", () => {
    alert("포트폴리오가 저장되었습니다!");
    window.location.href = "/livee-beta/frontend/mypage.html";
  });

  // ✅ 공개 여부 토글 상태 확인
  const toggle = document.getElementById("isPublic");
  if (toggle) {
    toggle.addEventListener("change", () => {
      console.log("공개여부:", toggle.checked ? "공개" : "비공개");
    });
  }
});