// portfolio-edit.js

const CLOUD_NAME = "dis1og9uq";
const UPLOAD_PRESET = "livee_unsigned";

let profileImageUrl = "";
let backgroundImageUrl = "";

const profileInput = document.getElementById("profileImage");
const backgroundInput = document.getElementById("backgroundImage");
const profilePreview = document.getElementById("profilePreview");
const backgroundPreview = document.getElementById("backgroundPreview");

// 🔼 이미지 선택 시 미리보기 및 업로드
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

// 🔼 Cloudinary 업로드 함수
async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    alert("이미지 업로드 실패 😢");
    console.error("Cloudinary Error:", err);
    return "";
  }
}

// 🔼 저장 버튼
document.getElementById("saveBtn").addEventListener("click", async () => {
  const token = localStorage.getItem("liveeToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    return (window.location.href = "/livee-beta/login.html");
  }

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
    const response = await fetch("https://main-server-ekgr.onrender.com/api/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("포트폴리오가 등록되었습니다!");
      window.location.href = "/livee-beta/frontend/mypage.html";
    } else {
      const err = await response.json();
      alert("등록 실패: " + err.message);
    }
  } catch (err) {
    console.error("서버 오류:", err);
    alert("등록 중 문제가 발생했습니다.");
  }
});