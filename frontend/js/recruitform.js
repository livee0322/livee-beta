document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("liveeToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    location.href = "/livee-beta/frontend/login.html";
    return;
  }

  const params = new URLSearchParams(location.search);
  const recruitId = params.get("id");

  // ✅ 수정 모드인 경우 기존 데이터 불러오기
  if (recruitId) {
    try {
      const res = await fetch(`https://main-server-ekgr.onrender.com/api/recruit/${recruitId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      document.getElementById("title").value = data.title;
      document.getElementById("brand").value = data.brand;
      document.getElementById("category").value = data.category;
      document.getElementById("date").value = data.date?.slice(0, 16); // datetime-local 포맷
      document.getElementById("description").value = data.description;
      document.getElementById("applyLink").value = data.link;
    } catch (err) {
      alert("기존 공고 불러오기 실패: " + err.message);
    }
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

    let thumbnailUrl = "";

    try {
      // ✅ 이미지 업로드 (새 이미지 선택 시에만)
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "livee_unsigned");

        const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dis1og9uq/image/upload", {
          method: "POST",
          body: formData,
        });

        const cloudData = await cloudRes.json();
        thumbnailUrl = cloudData.secure_url;
      }

      // ✅ 서버에 등록/수정 요청
      const payload = {
        title,
        brand,
        category,
        date,
        description,
        link: applyLink,
      };

      if (thumbnailUrl) payload.thumbnailUrl = thumbnailUrl;

      const method = recruitId ? "PUT" : "POST";
      const url = recruitId
        ? `https://main-server-ekgr.onrender.com/api/recruit/${recruitId}`
        : `https://main-server-ekgr.onrender.com/api/recruit`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);
      alert(recruitId ? "공고가 수정되었습니다!" : "공고가 등록되었습니다!");
      location.href = "/livee-beta/frontend/recruitlist.html";
    } catch (err) {
      console.error("❌ 등록/수정 오류:", err);
      alert("실패: " + err.message);
    }
  });
});