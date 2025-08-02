// ✅ /livee-beta/frontend/js/portfolio-edit.js

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("liveeToken");
  const saveBtn = document.getElementById("savePortfolioBtn");

  if (!token) {
    alert("로그인이 필요합니다.");
    window.location.href = "/livee-beta/login.html";
    return;
  }

  saveBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const experience = document.getElementById("career").value.trim();
    const region = document.getElementById("region").value.trim();
    const sns = document.getElementById("sns").value.trim();
    const tags = document.getElementById("tags").value.trim();
    const specialty = document.getElementById("specialty").value.trim();
    const isPublic = document.getElementById("isPublic").checked;

    // ✅ name 필수값 체크
    if (!name) {
      alert("이름을 입력해주세요.");
      return;
    }

    const payload = {
      name,
      age,
      experience,
      region,
      sns,
      tags,
      specialty,
      isPublic,
    };

    try {
      const res = await fetch("https://main-server-ekgr.onrender.com/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "저장 실패");
      }

      alert("포트폴리오가 저장되었습니다.");
      window.location.href = "/livee-beta/portfolio.html";
    } catch (err) {
      console.error("저장 오류:", err);
      alert(`저장 중 오류 발생: ${err.message}`);
    }
  });
});