const token = localStorage.getItem("liveeToken");
const API = "https://main-server-ekgr.onrender.com";

let profileImageUrl = "";
let backgroundImageUrl = "";

// 이미지 선택 시 미리보기 및 업로드
document.getElementById("profileImage")?.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (file) {
    profileImageUrl = await uploadToCloudinary(file);
    document.getElementById("profilePreview").src = profileImageUrl;
    document.getElementById("profilePreview").style.display = "block";
  }
});
document.getElementById("backgroundImage")?.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (file) {
    backgroundImageUrl = await uploadToCloudinary(file);
    document.getElementById("backgroundPreview").src = backgroundImageUrl;
    document.getElementById("backgroundPreview").style.display = "block";
  }
});

// Cloudinary 업로드 함수
async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/dis1og9uq/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "livee_unsigned");

  const res = await fetch(url, { method: "POST", body: formData });
  const data = await res.json();
  return data.secure_url;
}

// 기존 데이터 불러오기
window.addEventListener("DOMContentLoaded", async () => {
  if (!token) return location.href = "/livee-beta/login.html";
  const res = await fetch(`${API}/portfolio/me`, { headers: { Authorization: `Bearer ${token}` } });
  if (res.ok) {
    const data = await res.json();
    if (data) {
      profileImageUrl = data.profileImage;
      backgroundImageUrl = data.backgroundImage;
      document.getElementById("name").value = data.name || "";
      document.getElementById("statusMessage").value = data.statusMessage || "";
      document.getElementById("jobTag").value = data.jobTag || "";
      document.getElementById("region").value = data.region || "";
      document.getElementById("experienceYears").value = data.experienceYears || "";
      document.getElementById("introText").value = data.introText || "";
      document.querySelector(".youtube-link").value = data.youtubeLinks?.[0] || "";
      document.getElementById("isPublic").checked = data.isPublic;
      document.getElementById("profilePreview").src = profileImageUrl || "";
      document.getElementById("profilePreview").style.display = "block";
      document.getElementById("backgroundPreview").src = backgroundImageUrl || "";
      document.getElementById("backgroundPreview").style.display = "block";
    }
  }
});

// 저장 버튼
document.getElementById("saveBtn").addEventListener("click", async () => {
  const payload = {
    profileImage: profileImageUrl,
    backgroundImage: backgroundImageUrl,
    name: document.getElementById("name").value,
    statusMessage: document.getElementById("statusMessage").value,
    jobTag: document.getElementById("jobTag").value,
    region: document.getElementById("region").value,
    experienceYears: parseInt(document.getElementById("experienceYears").value) || 0,
    introText: document.getElementById("introText").value,
    youtubeLinks: [document.querySelector(".youtube-link").value],
    isPublic: document.getElementById("isPublic").checked,
  };

  try {
    const res = await fetch(`${API}/portfolio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (!res.ok) return alert(result.message || "등록 실패");
    alert("저장되었습니다.");
    location.href = "/livee-beta/mypage.html";
  } catch (err) {
    console.error("저장 오류:", err);
  }
});