document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const agree = document.getElementById("agree").checked;
  const errorMsg = document.getElementById("signupError");

  if (password !== confirmPassword) {
    errorMsg.textContent = "비밀번호가 일치하지 않습니다.";
    return;
  }

  if (!agree) {
    errorMsg.textContent = "이용약관에 동의해야 합니다.";
    return;
  }

  try {
    const response = await fetch("https://livee-server-dev.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("회원가입이 완료되었습니다!");
      window.location.href = "/livee-beta/login.html";
    } else {
      errorMsg.textContent = data.message || "회원가입 실패";
    }
  } catch (err) {
    console.error(err);
    errorMsg.textContent = "서버 연결에 실패했습니다.";
  }
});