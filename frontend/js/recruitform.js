document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("liveeToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    location.href = "/livee-beta/frontend/login.html";
    return;
  }

  const currentUserId = getUserIdFromToken(token); // ✅ 사용자 ID 추출
  const params = new URLSearchParams(location.search);
  const recruitId = params.get("edit");

  // ✅ 수정 모드일 경우 기존 데이터 불러오기
  if (recruitId) {
    try {
      const res = await fetch(`https://main-server-ekgr.onrender.com/api/recruit/${recruitId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      document.getElementById("title").value = data.title;
      document.getElementById("brand").value = data.brand;
      document.getElementById("category").value = data.category;
      document.getElementById("date").value = data.date?.slice(0, 16);
      document.getElementById("fee").value = data.fee || "";
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
    const fee = document.getElementById("fee").value.trim();
    const imageFile = document.getElementById("thumbnail").files[0];
    const description = document.getElementById("description").value.trim();
    const applyLink = document.getElementById("applyLink").value.trim();

    let thumbnailUrl = "";

    try {
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

      const payload = {
        title,
        brand,
        category,
        date,
        fee,
        description,
        link: applyLink,
        thumbnailUrl,
        user: currentUserId, // ✅ 여기 중요!
      };

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

// ✅ 토큰에서 user ID 추출
function getUserIdFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch {
    return null;
  }
}