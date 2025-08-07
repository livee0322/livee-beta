// 📍 /frontend/js/portfolio-edit.js

const CLOUD_NAME = "dis1og9uq";
const UPLOAD_PRESET = "livee_unsigned";

let profileImageUrl = "";
let backgroundImageUrl = "";

const profileInput = document.getElementById("profileImage");
const backgroundInput = document.getElementById("backgroundImage");
const profilePreview = document.getElementById("profilePreview");
const backgroundPreview = document.getElementById("backgroundPreview");

const token = localStorage.getItem("liveeToken");
if (!token) {
  alert("로그인이 필요합니다.");
  location.href = "/livee-beta/login.html";
}

const existingData = JSON.parse(localStorage.getItem("portfolioData"));

// ✅ 기존 포트폴리오 값 입력 (수정 모드)
if (existingData) {
  document.getElementById("name").value = existingData.name || "";
  document.getElementById("statusMessage").value = existingData.statusMessage || "";
  document.getElementById("jobTag").value = existingData.jobTag || "";
  document.getElementById("region").value = existingData.region || "";
  document.getElementById("experienceYears").value = existingData.experienceYears || "";
  document.getElementById("introText").value = existingData.introText || "";
  document.querySelector(".youtube-link").value = existingData.youtubeLinks?.[0] || "";
  document.getElementById("isPublic").checked = existingData.isPublic !== false;

  // 이미지 미리보기
  if (existingData.profileImage) {
    profilePreview.src = existingData.profileImage;
    profilePreview.style.display = "block";
    profileImageUrl = existingData.profileImage;
  }
  if (existingData.backgroundImage) {
    backgroundPreview.src = existingData.backgroundImage;
    backgroundPreview.style.display = "block";
    backgroundImageUrl = existingData.backgroundImage;
  }
}

// ✅ 이미지 업로드 및 미리보기
profileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (file) {
    profileImageUrl = await uploadToCloudinary(file);
    profilePreview.src = profileImageUrl;
    profilePreview.style.display = "block";
  }
});

backgroundInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (file) {
    backgroundImageUrl = await uploadToCloudinary(file);
    backgroundPreview.src = backgroundImageUrl;
    backgroundPreview.style.display = "block";
  }
});

// ✅ Cloudinary 업로드
async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await fetch(url, { method: "POST", body: formData });
    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    alert("이미지 업로드 실패");
    console.error("Cloudinary Error:", err);
    return "";
  }
}

// ✅ 저장 버튼 클릭
document.getElementById("saveBtn").addEventListener("click", async () => {
  const payload = {
    profileImage: profileImageUrl,
    backgroundImage: backgroundImageUrl,
    name: document.getElementById("name").value,
    statusMessage: document.getElementById("statusMessage").value,
    jobTag: document.getElementById("jobTag").value,
    region: document.getElementById("region").value,
    experienceYears: document.getElementById("experienceYears").value,
    introText: document.getElementById("introText").value,
    youtubeLinks: [document.querySelector(".youtube-link").value],
    isPublic: document.getElementById("isPublic").checked,
  };

  try {
    let response;
    if (existingData && existingData._id) {
      // 수정
      response = await fetch(`https://main-server-ekgr.onrender.com/api/portfolio/${existingData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    } else {
      // 새 등록
      response = await fetch("https://main-server-ekgr.onrender.com/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    }

    const result = await response.json();

    if (!response.ok) {
      alert("실패: " + result.message);
    } else {
      alert("포트폴리오가 저장되었습니다.");
      localStorage.removeItem("portfolioData");
      window.location.href = "/livee-beta/frontend/mypage.html";
    }
  } catch (err) {
    console.error("❌ 저장 오류:", err);
    alert("등록 중 오류 발생");
  }
});