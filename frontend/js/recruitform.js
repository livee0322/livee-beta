document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("liveeToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    location.href = "/livee-beta/login.html";
    return;
  }

  document.querySelector(".form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const brand = document.getElementById("brand").value.trim();
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const imageFile = document.getElementById("thumbnail").files[0];
    const description = document.getElementById("description").value.trim();
    const applyLink = document.getElementById("applyLink").value.trim();

    if (!imageFile) {
      alert("썸네일 이미지를 선택해주세요.");
      return;
    }

    try {
      // ✅ Cloudinary 업로드
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "livee_unsigned");

      const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dis1og9uq/image/upload", {
        method: "POST",
        body: formData,
      });

      const cloudData = await cloudRes.json();
      const thumbnailUrl = cloudData.secure_url;

      // ✅ 서버에 공고 등록 요청
      const res = await fetch("https://main-server-ekgr.onrender.com/api/recruit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          brand,
          category,
          date,
          thumbnailUrl,
          description,
          link: applyLink
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("공고가 성공적으로 등록되었습니다!");
        window.location.href = "/livee-beta/frontend/recruitlist.html";
      } else {
        alert("등록 실패: " + (result.message || "서버 오류"));
      }
    } catch (err) {
      console.error("❌ 등록 중 에러:", err);
      alert("에러 발생: " + err.message);
    }
  });
});