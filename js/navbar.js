// navbar.js
// Load Navbar
fetch('../pages/navbar.html')
  .then(response => response.text())
  .then(data => {
      document.getElementById('navbar-container').innerHTML = data;
  })
  .catch(error => console.error('Error loading the navbar:', error));

document.addEventListener("DOMContentLoaded", () => {
    const userName = localStorage.getItem("fname");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const loginNavItem = document.getElementById("loginNavItem");
    const signupNavItem = document.getElementById("signupNavItem");
  
    if (userName) {
      welcomeMessage.textContent = `Welcome, ${userName}`;
      loginNavItem.style.display = "none";
      signupNavItem.style.display = "none";
    } else {
      welcomeMessage.style.display = "none";
    }
  });
  