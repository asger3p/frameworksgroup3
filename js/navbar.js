// navbar.js

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
  