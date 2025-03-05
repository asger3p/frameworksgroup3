document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  const name = document.getElementById("name").value;
  localStorage.setItem("fname", name); // Save the name in local storage

  // Redirect or show success message
  window.location.href = "home.html"; // or whatever page they should land on
});

// Get references to the password input and toggle button
const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('toggle-password');

// Add event listener to the button
togglePasswordButton.addEventListener('click', () => {
// Toggle password visibility
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    togglePasswordButton.textContent = 'Hide';
  } else {
    passwordInput.type = 'password';
    togglePasswordButton.textContent = 'Show';
  }
});

  