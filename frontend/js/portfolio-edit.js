// ✅ /livee-beta/frontend/js/portfolio-edit.js (v1.05)

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

  // ✅ "파일 선택" 버튼 누르면 파일 선택창 뜨도록
  uploadButton.addEventListener("click", () => {
    imageInput.click();
  });

  // ✅ 이미지 선택 → 크롭 → Cloudinary 업로드
  imageInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;

      ctx.drawImage(img, 0, 0, size, size, 0, 0, size, size);

      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("file", blob, "cropped.png");
        formData.append("upload_preset", "livee_unsigned");
        formData.append("folder", "livee");

        try {
          const res = await fetch("https://api.cloudinary.com/v1_1/dis1og9uq/image/upload", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();
          uploadedImageUrl = data.secure_url;

          imagePreviewWrapper.innerHTML = `<img src="${uploadedImageUrl}" class="preview-image" />`;
        } catch (err) {
          console.error("이미지 업로드 실패:", err);
          alert("이미지 업로드 중 오류가 발생했습니다.");
        }
      }, "image/png");
    };
  });

  // ✅ 저장하기 버튼 클릭 시
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
      alert("이름을 입력해주세요.");
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
        window.location.href = "/livee-beta/myportfolio.html"; // ✅ 경로 확정
      } else {
        alert(result.message || "저장에 실패했습니다.");
      }
    } catch (err) {
      console.error("저장 오류:", err);
      alert("서버 통신 오류가 발생했습니다.");
    }
  });
});