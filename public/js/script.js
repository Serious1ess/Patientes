document.addEventListener("DOMContentLoaded", function () {
  const allButtons = document.querySelectorAll(".searchBtn");
  const searchBar = document.querySelector(".searchBar");
  const searchInput = document.getElementById("searchInput");
  // const searchClose = document.getElementById("searchClose");

  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function () {
      searchBar.style.visibility = "visible";
      searchBar.classList.add("open");
      this.setAttribute("aria-expanded", "true");
      searchInput.focus();
    });
  }

  // searchClose.addEventListener("click", function () {
  //   closeSearchBar();
  // });

  document.addEventListener("click", function (event) {
    if (
      !searchBar.contains(event.target) &&
      !event.target.classList.contains("searchBtn")
    ) {
      closeSearchBar();
    }
  });

  function closeSearchBar() {
    searchBar.style.visibility = "hidden";
    searchBar.classList.remove("open");
    searchClose.setAttribute("aria-expanded", "false");
  }

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
