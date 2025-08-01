document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorMsg = document.getElementById("loginError");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const res = await fetch("https://main-server-ekgr.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "로그인에 실패했습니다.");
      }

      // ✅ 토큰 저장
      localStorage.setItem("liveeToken", data.token);

      // ✅ 로그인 후 이동
      alert("로그인 성공!");
      window.location.href = "/livee-beta/mypage.html";
    } catch (err) {
      console.error("로그인 에러:", err);
      errorMsg.textContent = err.message || "로그인에 실패했습니다.";
    }
  });
});