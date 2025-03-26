document.addEventListener("DOMContentLoaded", () => {
  const userName = localStorage.getItem("fname");
  const welcomeMessage = document.getElementById("welcomeMessage");

  if (userName) {
    welcomeMessage.textContent = `Welcome, ${userName}!`;
  } else {
    welcomeMessage.textContent = "Welcome!";
  }
});
