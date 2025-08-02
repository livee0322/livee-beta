// 📍 portfolio-edit.js
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("liveeToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    window.location.href = "/livee-beta/login.html";
    return;
  }

  // ✅ 이미지 업로드 및 미리보기
  const imageInput = document.getElementById("imageInput");
  const imagePreviewWrapper = document.getElementById("imagePreviewWrapper");
  let uploadedImageUrl = "";

  imageInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 미리보기 처리
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreviewWrapper.innerHTML = `
        <img src="${e.target.result}" alt="미리보기 이미지" class="preview-image" />
      `;
    };
    reader.readAsDataURL(file);

    // Cloudinary 업로드
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

  // ✅ 저장하기
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