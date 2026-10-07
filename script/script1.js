const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
        localStorage.setItem("theme", "light");
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
    } else {
        localStorage.setItem("theme", "dark");
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    }
});


// Load saved theme when page opens
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
}






document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector(".nav-menu");
    const menuIcon = menuToggle.querySelector("i");
    const navLinks = document.querySelectorAll(".nav-menu .links");


    // OPEN / CLOSE MENU
    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        if (navMenu.classList.contains("active")) {

            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-xmark");

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation"
            );

        } else {

            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        }

    });


    // CLOSE MENU WHEN A LINK IS CLICKED
    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        });

    });

});




const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn = document.getElementById('submit-btn');
const buttonText = document.getElementById('button-text');


if (contactForm) {

    contactForm.addEventListener('submit', async function (event) {

        event.preventDefault();

        submitBtn.disabled = true;
        buttonText.textContent = 'Sending...';
        formMessage.textContent = '';


        try {

            // Collect the form data, including the Web3Forms access key
            const formData = new FormData(contactForm);

            const response = await fetch('https://api.web3forms.com/submit', {

                method: 'POST',

                headers: {
                    'Accept': 'application/json'
                },

                body: formData

            });


            const data = await response.json();


            console.log('Web3Forms response:', data);


            if (response.ok && data.success) {

                formMessage.textContent =
                    'Message sent successfully!';

                contactForm.reset();

            } else {

                formMessage.textContent =
                    data.message ||
                    'Unable to send your message. Please try again.';

                console.error(
                    'Web3Forms error:',
                    data
                );

            }


        } catch (error) {

            console.error(
                'Contact form connection error:',
                error
            );

            formMessage.textContent =
                'Something went wrong. Please try again later.';

        }


        finally {

            submitBtn.disabled = false;
            buttonText.textContent = 'Send Message';

        }

    });

}