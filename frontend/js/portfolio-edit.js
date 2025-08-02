document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const uploadButton = document.getElementById("uploadButton");
  const imagePreviewWrapper = document.getElementById("imagePreviewWrapper");
  const saveBtn = document.getElementById("savePortfolioBtn");

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

  // 저장 버튼 클릭 시 서버로 전송
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      const token = localStorage.getItem("liveeToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        window.location.href = "/livee-beta/frontend/login.html";
        return;
      }

      const profileData = {
        image: document.querySelector("#imagePreviewWrapper img")?.src || "",
        name: document.getElementById("name")?.value,
        age: document.getElementById("age")?.value,
        experience: document.getElementById("career")?.value, // ✅ 수정됨
        region: document.getElementById("region")?.value,
        sns: document.getElementById("sns")?.value,
        tags: document.getElementById("tags")?.value,
        specialty: document.getElementById("specialty")?.value,
        isPublic: document.getElementById("isPublic")?.checked,
      };

      try {
        const response = await fetch("https://main-server-ekgr.onrender.com/api/portfolio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profileData),
        });

        if (!response.ok) {
          throw new Error("서버 오류: " + response.status);
        }

        alert("포트폴리오가 저장되었습니다!");
        window.location.href = "/livee-beta/portfolio.html";
      } catch (err) {
        console.error("저장 실패:", err);
        alert("저장 중 오류가 발생했습니다.");
      }
    });
  }
});