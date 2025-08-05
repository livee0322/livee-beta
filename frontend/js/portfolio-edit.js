const previewImage = (input, targetId) => {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById(targetId).src = e.target.result;
  };
  reader.readAsDataURL(file);
};

document.getElementById("profileImage").addEventListener("change", function () {
  previewImage(this, "profilePreview");
});
document.getElementById("backgroundImage").addEventListener("change", function () {
  previewImage(this, "backgroundPreview");
});

document.getElementById("saveBtn").addEventListener("click", async () => {
  const cloudinaryURL = "https://api.cloudinary.com/v1_1/dis1og9uq/upload";
  const uploadPreset = "livee_unsigned";

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    const res = await fetch(cloudinaryURL, { method: "POST", body: data });
    const json = await res.json();
    return json.secure_url;
  };

  const profileImage = document.getElementById("profileImage").files[0];
  const backgroundImage = document.getElementById("backgroundImage").files[0];
  const profileUrl = profileImage ? await uploadImage(profileImage) : "";
  const backgroundUrl = backgroundImage ? await uploadImage(backgroundImage) : "";

  const payload = {
    name: document.getElementById("name").value,
    statusMessage: document.getElementById("statusMessage").value,
    jobTag: document.getElementById("jobTag").value,
    region: document.getElementById("region").value,
    experienceYears: document.getElementById("experienceYears").value,
    introText: document.getElementById("introText").value,
    youtubeLink: document.querySelector(".youtube-link").value,
    isPublic: document.getElementById("isPublic").checked,
    profileImageUrl: profileUrl,
    backgroundImageUrl: backgroundUrl,
  };

  console.log("✅ 최종 payload:", payload);
  alert("포트폴리오 저장 완료!");
});