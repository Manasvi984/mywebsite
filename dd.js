// Open the SignIn Modal
function openSignInModal() {
    document.getElementById("signinModal").style.display = "block";
}

// Close the SignIn Modal
function closeSignInModal() {
    document.getElementById("signinModal").style.display = "none";
}

// Open the SignUp Modal
function openSignUpModal() {
    document.getElementById("signupModal").style.display = "block";
}

// Close the SignUp Modal
function closeSignUpModal() {
    document.getElementById("signupModal").style.display = "none";
}

// Close the modal if the user clicks anywhere outside of the modal content
window.onclick = function(event) {
    if (event.target == document.getElementById("signinModal")) {
        closeSignInModal();
    }
    if (event.target == document.getElementById("signupModal")) {
        closeSignUpModal();
    }
}
      function setActivePage(page) {
            // Remove the 'active' class from all links
            const links = document.querySelectorAll('nav a');
            links.forEach(link => link.classList.remove('active'));

            // Add the 'active' class to the clicked link
            const activeLink = document.getElementById(page);
            activeLink.classList.add('active');

            // You can also change the content dynamically if needed
            const content = document.getElementById('content');
            content.innerHTML = <h1>${page.charAt(0).toUpperCase() + page.slice(1)} Page</h1>;
        }



        document.addEventListener("DOMContentLoaded", function() {
            const profileIcon = document.getElementById('profileIcon');
            const profileContainer = document.getElementById('profileContainer');
            const logoutEmoji = document.getElementById('logoutEmoji');
            const profileLetter = document.getElementById('profileLetter');
            const userEmail = document.getElementById('userEmail');  // Target the email display
        
            // Ensure email is correctly retrieved
            console.log("User email in dropdown: ", userEmail.textContent);
        
            // Toggle dropdown when clicking on profile icon
            profileIcon.addEventListener('click', function(event) {
                event.stopPropagation();
                // Show/hide profile dropdown
                profileContainer.style.display = (profileContainer.style.display === 'none' || profileContainer.style.display === '') ? 'block' : 'none';
            });
        
            // Close dropdown when clicking outside
            document.addEventListener('click', function(event) {
                if (!profileContainer.contains(event.target) && event.target !== profileIcon) {
                    profileContainer.style.display = 'none';
                }
            });
        
            // Logout function
            window.logout = function() {
                fetch('logout.php')
                    .then(response => {
                        profileLetter.style.display = 'none'; // Hide initial letter
                        logoutEmoji.style.display = 'inline'; // Show logout emoji
                        profileContainer.style.display = 'none'; // Hide dropdown
                        setTimeout(() => {
                            window.location.href = "dd.php"; // Redirect after logout
                        }, 500);
                    });
            };
        });