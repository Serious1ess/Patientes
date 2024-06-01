document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");
  if (!loginForm) return;
  // Initially display the login form
  loginForm.style.display = "block";

  registerBtn.addEventListener("click", function () {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });

  loginBtn.addEventListener("click", function () {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });
});
