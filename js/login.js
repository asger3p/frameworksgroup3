document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  // Get values from form
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Get stored data from localStorage
  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");
  const firstName = localStorage.getItem("fname");

  // Check if credentials match
  if (email === storedEmail && password === storedPassword) {
    // Save login status & user name
    localStorage.setItem("isLoggedIn", "true");

    // Redirect to home page
    window.location.href = "home.html";
  } else {
    alert("Invalid email or password.");
  }
});

    // Password visibility toggle
const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("toggle-password");

togglePasswordButton.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePasswordButton.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    togglePasswordButton.textContent = "Show";
  }
});
