const token = localStorage.getItem("liveeToken");
const API = "https://main-server-ekgr.onrender.com";

document.addEventListener("DOMContentLoaded", async () => {
  if (!token) {
    alert("로그인이 필요합니다.");
    location.href = "/livee-beta/login.html";
    return;
  }

  const form = document.getElementById("portfolioForm");
  const deleteBtn = document.getElementById("deletePortfolioBtn");

  const profileInput = document.getElementById("profileImage");
  const backgroundInput = document.getElementById("backgroundImage");
  const profilePreview = document.getElementById("profilePreview");
  const backgroundPreview = document.getElementById("backgroundPreview");

  let portfolioId = null;

  // Cloudinary 설정
  const CLOUD_NAME = "dis1og9uq";
  const PRESET = "livee_unsigned";

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    return data.secure_url;
  };

  // 🔹 이미지 미리보기 + 업로드
  profileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadImage(file);
      profilePreview.src = url;
      profilePreview.dataset.url = url;
    }
  });

  backgroundInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadImage(file);
      backgroundPreview.src = url;
      backgroundPreview.dataset.url = url;
    }
  });

  // 🔹 기존 데이터 불러오기
  try {
    const res = await fetch(`${API}/portfolio/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      portfolioId = data._id;
      form.name.value = data.name || "";
      form.statusMessage.value = data.statusMessage || "";
      form.jobTag.value = data.jobTag || "";
      form.region.value = data.region || "";
      form.experienceYears.value = data.experienceYears || "";
      form.introText.value = data.introText || "";
      document.getElementById("youtubeLink").value = data.youtubeLinks?.[0] || "";
      document.getElementById("isPublic").checked = data.isPublic;

      profilePreview.src = data.profileImage || "";
      profilePreview.dataset.url = data.profileImage || "";
      backgroundPreview.src = data.backgroundImage || "";
      backgroundPreview.dataset.url = data.backgroundImage || "";
    }
  } catch (err) {
    console.error("❌ 포트폴리오 불러오기 오류:", err);
  }

  // 🔹 저장
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {
      name: form.name.value,
      statusMessage: form.statusMessage.value,
      jobTag: form.jobTag.value,
      region: form.region.value,
      experienceYears: parseInt(form.experienceYears.value),
      introText: form.introText.value,
      profileImage: profilePreview.dataset.url || "",
      backgroundImage: backgroundPreview.dataset.url || "",
      youtubeLinks: [document.getElementById("youtubeLink").value],
      isPublic: document.getElementById("isPublic").checked
    };

    const method = portfolioId ? "PUT" : "POST";
    const endpoint = portfolioId
      ? `${API}/portfolio/${portfolioId}`
      : `${API}/portfolio`;

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const result = await res.json();
      if (!res.ok) return alert(result.message || "실패");
      alert("포트폴리오 저장 완료");
      location.href = "/livee-beta/mypage.html";
    } catch (err) {
      alert("서버 오류");
    }
  });

  // 🔹 삭제
  deleteBtn.addEventListener("click", async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`${API}/portfolio/me`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      const result = await res.json();
      if (!res.ok) return alert(result.message || "삭제 실패");
      alert("삭제 완료");
      location.reload();
    } catch (err) {
      alert("삭제 중 오류 발생");
    }
  });
});