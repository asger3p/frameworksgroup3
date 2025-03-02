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

  