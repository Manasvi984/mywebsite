document.querySelector("#login-form").addEventListener("submit", function (event) {
    const adminID = document.getElementById("admin-id").value;
    const password = document.getElementById("password").value;

    // Simple validation
    if (adminID !== "admin" || password !== "12345") {
        event.preventDefault(); // Stop form submission
        alert("Invalid Admin ID or Password!");
    }
});