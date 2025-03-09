// navbar.js
// Load Navbar
fetch('../pages/navbar.html')
  .then(response => response.text())
  .then(data => {
      document.getElementById('navbar-container').innerHTML = data;

      setupBurgerMenu(); // attach burger-menu-event-listener AFTER the navbar is loaded
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
  
  // Function to handle the burger menu toggle
  function setupBurgerMenu() {
    setTimeout(() => {  // wait for a slight delay to ensure navbar is loaded
        const burgerMenu = document.querySelector(".burger-menu");
        const mobileMenu = document.querySelector(".mobile-menu");

        if (burgerMenu && mobileMenu) {
            console.log("Burger menu found! Adding event listener...");
            burgerMenu.addEventListener("click", function () {
                mobileMenu.classList.toggle("show-menu");
            });
        } else {
            console.error("Burger menu elements not found!");
        }
    }, 100); // Short delay to ensure navbar is fully loaded
}
