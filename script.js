// Toggle password visibility
document.getElementById("togglePassword").addEventListener("click", () => {
  const passwordInput = document.getElementById("password");
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
});

// Handle Login
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const messageBox = document.getElementById("message");

  if (!email || !password) {
    messageBox.style.color = "red";
    messageBox.textContent = "Please fill in all fields.";
    return;
  }

  // Secure API call (Replace with your backend API)
  fetch("https://your-backend-api.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("authToken", data.token);
      messageBox.style.color = "green";
      messageBox.textContent = "✅ Login successful!";
      setTimeout(() => {
        window.location.href = "/dashboard.html"; // redirect after login
      }, 1000);
    } else {
      messageBox.style.color = "red";
      messageBox.textContent = data.message || "Login failed.";
    }
  })
  .catch(err => {
    console.error("Error:", err);
    messageBox.style.color = "red";
    messageBox.textContent = "An error occurred.";
  });
}
