document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission
  
    // Get user input
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Store data in localStorage
    localStorage.setItem("fname", fname);
    localStorage.setItem("lname", lname);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  
    // Redirect to login page
    window.location.href = "login.html";
  });
  