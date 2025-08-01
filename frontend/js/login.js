document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorMsg = document.getElementById("loginError");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  // 🔒 비밀번호 보이기/숨기기 토글
  togglePassword?.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.classList.toggle("ri-eye-line");
    togglePassword.classList.toggle("ri-eye-off-line");
  });

  // 📨 로그인 처리
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const res = await fetch("https://main-server-ekgr.onrender.com/api/auth/login", {
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

      // ✅ 로그인 성공 → 마이페이지로 이동
      alert("로그인 성공!");
      window.location.href = "/livee-beta/frontend/mypage.html";
    } catch (err) {
      console.error("로그인 에러:", err);
      errorMsg.textContent = err.message || "로그인에 실패했습니다.";
    }
  });
});