const CLOUD_NAME = "dis1og9uq";
const UPLOAD_PRESET = "livee_unsigned";

let profileImageUrl = "";
let backgroundImageUrl = "";

document.getElementById("profileImage").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (file) {
    profileImageUrl = await uploadToCloudinary(file);
    document.getElementById("profilePreview").src = profileImageUrl;
    document.getElementById("profilePreview").style.display = "block";
  }
});

document.getElementById("backgroundImage").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (file) {
    backgroundImageUrl = await uploadToCloudinary(file);
    document.getElementById("backgroundPreview").src = backgroundImageUrl;
    document.getElementById("backgroundPreview").style.display = "block";
  }
});

async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(url, { method: "POST", body: formData });
  const data = await res.json();
  return data.secure_url;
}

document.getElementById("saveBtn").addEventListener("click", async () => {
  const token = localStorage.getItem("liveeToken");
  if (!token) return location.href = "/livee-beta/login.html";

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

  const res = await fetch("https://main-server-ekgr.onrender.com/api/portfolio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  const result = await res.json();

  if (res.ok) {
    alert("포트폴리오가 등록되었습니다.");
    location.href = "/livee-beta/frontend/mypage.html";
  } else {
    alert(result.message || "등록 실패");
  }
});