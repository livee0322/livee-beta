const token = localStorage.getItem("liveeToken");
const API = "https://main-server-ekgr.onrender.com";

// ✅ 이미지 미리보기 처리
document.getElementById("profileImageInput")?.addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("profileImagePreview").src = reader.result;
    document.getElementById("profileImage").value = reader.result; // base64 저장
  };
  if (file) reader.readAsDataURL(file);
});

document.addEventListener("DOMContentLoaded", async () => {
  if (!token) {
    alert("로그인이 필요합니다.");
    window.location.href = "/livee-beta/login.html";
    return;
  }

  const form = document.getElementById("portfolioForm");
  const deleteBtn = document.getElementById("deletePortfolioBtn");

  let portfolioId = null;

  // ✅ 기존 포트폴리오 불러오기
  try {
    const res = await fetch(`${API}/portfolio/me`, {
      headers: { Authorization: `Bearer ${token}` },
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
      form.profileImage.value = data.profileImage || "";
      document.getElementById("profileImagePreview").src = data.profileImage || "";
    }
  } catch (err) {
    console.error("❌ 포트폴리오 불러오기 실패:", err);
  }

  // ✅ 제출: 등록 or 수정
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {
      name: form.name.value,
      statusMessage: form.statusMessage.value,
      jobTag: form.jobTag.value,
      region: form.region.value,
      experienceYears: parseInt(form.experienceYears.value) || 0,
      introText: form.introText.value,
      profileImage: form.profileImage.value,
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (!res.ok) return alert(result.message || "저장 실패");

      alert(result.message || "포트폴리오 저장 완료");
      window.location.href = "/livee-beta/mypage.html";
    } catch (err) {
      console.error("❌ 포트폴리오 저장 오류:", err);
      alert("서버 오류");
    }
  });

  // ✅ 삭제 처리
  if (deleteBtn) {
    deleteBtn.addEventListener("click", async () => {
      if (!confirm("정말 삭제하시겠습니까?")) return;
      try {
        const res = await fetch(`${API}/portfolio/me`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        alert(result.message);
        window.location.reload();
      } catch (err) {
        console.error("❌ 삭제 실패:", err);
        alert("삭제 중 오류 발생");
      }
    });
  }
});