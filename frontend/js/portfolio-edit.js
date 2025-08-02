// 📍 /livee-beta/frontend/js/portfolio-edit.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("liveeToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    window.location.href = "/livee-beta/login.html";
    return;
  }

  const imageInput = document.getElementById("imageInput");
  const uploadButton = document.getElementById("uploadButton");
  const imagePreviewWrapper = document.getElementById("imagePreviewWrapper");
  let uploadedImageUrl = "";

  // ✅ 버튼 → 파일 선택 input 트리거
  uploadButton.addEventListener("click", () => {
    imageInput.click();
  });

  // ✅ 파일 선택 시 → 미리보기 & Cloudinary 업로드
  imageInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreviewWrapper.innerHTML = `
        <img src="${e.target.result}" alt="미리보기 이미지" class="preview-image" />
      `;
    };
    reader.readAsDataURL(file);

    // 🔄 Cloudinary 업로드
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "livee_unsigned");
    formData.append("folder", "livee");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dis1og9uq/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      uploadedImageUrl = data.secure_url;
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  });

  // ✅ 저장 버튼 클릭 시 → 서버 전송
  document.getElementById("savePortfolioBtn").addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const experience = document.getElementById("career").value.trim();
    const region = document.getElementById("region").value.trim();
    const sns = document.getElementById("sns").value.trim();
    const tags = document.getElementById("tags").value.trim();
    const specialty = document.getElementById("specialty").value.trim();
    const isPublic = document.getElementById("isPublic").checked;

    if (!name) {
      alert("이름은 필수 입력입니다.");
      return;
    }

    const payload = {
      name,
      age,
      experience,
      region,
      sns,
      tags,
      specialty,
      isPublic,
      image: uploadedImageUrl,
    };

    try {
      const res = await fetch("https://main-server-ekgr.onrender.com/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        alert("포트폴리오가 저장되었습니다.");
        window.location.href = "/livee-beta/myportfolio.html";
      } else {
        throw new Error(result.message || "저장 실패");
      }
    } catch (err) {
      console.error("저장 오류:", err);
      alert("저장 중 오류가 발생했습니다.");
    }
  });
});