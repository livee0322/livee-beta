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
  const saveBtn = document.getElementById("savePortfolioBtn");
  let uploadedImageUrl = "";
  let imageUploaded = false;

  // ✅ 업로드 버튼 클릭 → input 클릭
  if (uploadButton && imageInput) {
    uploadButton.addEventListener("click", () => {
      imageInput.click();
    });
  }

  // ✅ 파일 선택 시 → 크롭용 base64 저장 후 canvas 이동
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

  // ✅ canvas.html → base64 가져와 미리보기 & Cloudinary 업로드
  const savedImage = localStorage.getItem("croppedImage");
  if (savedImage && imagePreviewWrapper) {
    imagePreviewWrapper.innerHTML = `<img src="${savedImage}" alt="미리보기" class="preview-image" />`;
    localStorage.removeItem("croppedImage");

    // 이미지 업로드
    fetch("https://api.cloudinary.com/v1_1/dis1og9uq/image/upload", {
      method: "POST",
      body: (() => {
        const blob = dataURItoBlob(savedImage);
        const formData = new FormData();
        formData.append("file", blob, "cropped.png");
        formData.append("upload_preset", "livee_unsigned");
        formData.append("folder", "livee");
        return formData;
      })(),
    })
      .then((res) => res.json())
      .then((data) => {
        uploadedImageUrl = data.secure_url;
        imageUploaded = true;
        console.log("✅ 이미지 업로드 성공:", uploadedImageUrl);
      })
      .catch((err) => {
        console.error("❌ 이미지 업로드 실패:", err);
        alert("이미지 업로드에 실패했습니다.");
      });
  }

  // ✅ base64 → Blob 변환 함수
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  // ✅ 저장하기 클릭 시
  saveBtn.addEventListener("click", async () => {
    // 🔒 이미지 업로드 완료 여부 확인
    if (!imageUploaded || !uploadedImageUrl) {
      alert("이미지가 아직 업로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

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
        window.location.href = "/livee-beta/frontend/myportfolio.html";
      } else {
        alert(result.message || "저장 실패");
      }
    } catch (err) {
      console.error("❌ 저장 오류:", err);
      alert("서버 오류로 저장에 실패했습니다.");
    }
  });
});