document.addEventListener("DOMContentLoaded", () => {
  let role = "brand"; // 기본값

  // 탭 전환
  const brandTab = document.getElementById("tab-brand");
  const showhostTab = document.getElementById("tab-showhost");

  brandTab.addEventListener("click", () => {
    brandTab.classList.add("active");
    showhostTab.classList.remove("active");
    role = "brand";
  });

  showhostTab.addEventListener("click", () => {
    showhostTab.classList.add("active");
    brandTab.classList.remove("active");
    role = "showhost";
  });

  // 자동 로그인
  const autoLoginCheckbox = document.getElementById("autoLogin");
  const savedEmail = localStorage.getItem("liveeAutoLoginEmail");
  if (savedEmail) {
    document.getElementById("email").value = savedEmail;
    autoLoginCheckbox.checked = true;
  }

  // 로그인 처리
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const res = await fetch("https://main-server-ekgr.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }) // role은 전송 안 함
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "로그인 실패");

      // 저장
      localStorage.setItem("liveeToken", data.token);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("userRole", role);

      if (autoLoginCheckbox.checked) {
        localStorage.setItem("liveeAutoLoginEmail", email);
      } else {
        localStorage.removeItem("liveeAutoLoginEmail");
      }

      alert("로그인 성공!");
      location.href = "/livee-beta/frontend/mypage.html";
    } catch (err) {
      alert(err.message);
    }
  });

  // 비밀번호 보기
  document.querySelectorAll(".toggle-password").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      if (target.type === "password") {
        target.type = "text";
      } else {
        target.type = "password";
      }
    });
  });
});