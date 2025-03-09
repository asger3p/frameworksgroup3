// Load Navbar
fetch('../pages/navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-container').innerHTML = data;
    updateNavbar(); // Call the function to update navbar after loading
  })
  .catch(error => console.error('Error loading the navbar:', error));

function updateNavbar() {
  const userName = localStorage.getItem("fname");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const loginNavItem = document.getElementById("loginNavItem");
  const logoutButton = document.getElementById("logoutButton");

  if (userName) {
    welcomeMessage.textContent = `Welcome, ${userName}`;
    loginNavItem.style.display = "none"; // Hide login link
    logoutButton.classList.remove("d-none"); // Show logout button
  } else {
    welcomeMessage.style.display = "none";
  }

  // Add logout functionality
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("fname"); // Remove user info from local storage
      window.location.reload(); // Reload the page to update the navbar
    });
  }
}
