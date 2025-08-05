// portfolio-edit.js

document.addEventListener("DOMContentLoaded", () => { const form = document.getElementById("portfolioForm"); const youtubeLinksContainer = document.getElementById("youtubeLinks"); const addLinkBtn = document.getElementById("addYoutubeLink");

addLinkBtn.addEventListener("click", () => { const input = document.createElement("input"); input.type = "url"; input.placeholder = "https://youtu.be/xxxx"; input.classList.add("youtube-link"); youtubeLinksContainer.appendChild(input); });

form.addEventListener("submit", async (e) => { e.preventDefault(); const token = localStorage.getItem("liveeToken"); const userId = localStorage.getItem("userId"); if (!token || !userId) return alert("로그인이 필요합니다");

const name = form.name.value.trim();
const jobTag = form.jobTag.value.trim();
const region = form.region.value.trim();
const introText = form.introText.value.trim();
const experienceYears = Number(form.experienceYears.value);
const isPublic = form.isPublic.checked;

const youtubeShorts = Array.from(
  document.querySelectorAll(".youtube-link")
)
  .map((el) => el.value.trim())
  .filter((v) => v);

const profileImageFile = form.profileImage.files[0];
const backgroundImageFile = form.backgroundImage.files[0];

let profileImageUrl = "";
let backgroundImageUrl = "";

try {
  if (profileImageFile) {
    const formData = new FormData();
    formData.append("file", profileImageFile);
    formData.append("upload_preset", "livee_unsigned");

    const res = await fetch("https://api.cloudinary.com/v1_1/dis1og9uq/image/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    profileImageUrl = data.secure_url;
  }

  if (backgroundImageFile) {
    const formData = new FormData();
    formData.append("file", backgroundImageFile);
    formData.append("upload_preset", "livee_unsigned");

    const res = await fetch("https://api.cloudinary.com/v1_1/dis1og9uq/image/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    backgroundImageUrl = data.secure_url;
  }

  const payload = {
    user: userId,
    name,
    jobTag,
    region,
    introText,
    experienceYears,
    isPublic,
    profileImage: profileImageUrl,
    backgroundImage: backgroundImageUrl,
    youtubeShorts,
  };

  const res = await fetch("https://main-server-ekgr.onrender.com/api/portfolio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);

  alert("포트폴리오가 저장되었습니다!");
  location.href = "/livee-beta/frontend/myportfolio.html";
} catch (err) {
  console.error("저장 실패:", err);
  alert("저장 중 오류 발생: " + err.message);
}

}); });

