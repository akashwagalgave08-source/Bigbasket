
/* =====================================================
   FRESH CART
   REGISTER / CREATE ACCOUNT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const registerForm =
        document.getElementById("registerForm");

    const passwordToggle =
        document.getElementById("passwordToggle");

    const confirmPasswordToggle =
        document.getElementById("confirmPasswordToggle");


    /* =================================================
       PASSWORD SHOW / HIDE
    ================================================= */

    if (passwordToggle) {

        passwordToggle.addEventListener("click", function () {

            const password =
                document.getElementById("registerPassword");

            if (password.type === "password") {

                password.type = "text";
                passwordToggle.textContent = "🙈";

            } else {

                password.type = "password";
                passwordToggle.textContent = "👁";

            }

        });

    }


    /* =================================================
       CONFIRM PASSWORD SHOW / HIDE
    ================================================= */

    if (confirmPasswordToggle) {

        confirmPasswordToggle.addEventListener("click", function () {

            const password =
                document.getElementById("confirmPassword");

            if (password.type === "password") {

                password.type = "text";
                confirmPasswordToggle.textContent = "🙈";

            } else {

                password.type = "password";
                confirmPasswordToggle.textContent = "👁";

            }

        });

    }


    /* =================================================
       REGISTER FORM
    ================================================= */

    if (!registerForm) {
        return;
    }


    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* =============================================
           GET VALUES
        ============================================= */

        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const phone =
            document.getElementById("registerPhone").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const terms =
            document.getElementById("terms").checked;


        /* =============================================
           ERROR ELEMENTS
        ============================================= */

        const nameError =
            document.getElementById("nameError");

        const emailError =
            document.getElementById("emailError");

        const phoneError =
            document.getElementById("phoneError");

        const passwordError =
            document.getElementById("passwordError");

        const confirmPasswordError =
            document.getElementById("confirmPasswordError");

        const termsError =
            document.getElementById("termsError");

        const message =
            document.getElementById("registerMessage");


        /* =============================================
           CLEAR OLD ERRORS
        ============================================= */

        nameError.textContent = "";
        emailError.textContent = "";
        phoneError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";
        termsError.textContent = "";
        message.textContent = "";


        let valid = true;


        /* =============================================
           NAME VALIDATION
        ============================================= */

        if (name.length < 3) {

            nameError.textContent =
                "Please enter your full name.";

            valid = false;

        }


        /* =============================================
           EMAIL VALIDATION
        ============================================= */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

            valid = false;

        }


        /* =============================================
           PHONE VALIDATION
        ============================================= */

        const phonePattern =
            /^[6-9]\d{9}$/;

        if (!phonePattern.test(phone)) {

            phoneError.textContent =
                "Enter a valid 10-digit mobile number.";

            valid = false;

        }


        /* =============================================
           PASSWORD VALIDATION
        ============================================= */

        if (password.length < 6) {

            passwordError.textContent =
                "Password must contain at least 6 characters.";

            valid = false;

        }


        /* =============================================
           CONFIRM PASSWORD
        ============================================= */

        if (password !== confirmPassword) {

            confirmPasswordError.textContent =
                "Passwords do not match.";

            valid = false;

        }


        /* =============================================
           TERMS & CONDITIONS
        ============================================= */

        if (!terms) {

            termsError.textContent =
                "Please accept the Terms & Conditions.";

            valid = false;

        }


        /* =============================================
           STOP IF INVALID
        ============================================= */

        if (!valid) {
            return;
        }


        /* =============================================
           CHECK EXISTING USER
        ============================================= */

        const existingUser =
            JSON.parse(
                localStorage.getItem("freshCartUser")
            );


        if (
            existingUser &&
            existingUser.email.toLowerCase() ===
            email.toLowerCase()
        ) {

            emailError.textContent =
                "An account with this email already exists.";

            return;

        }


        /* =============================================
           CREATE USER OBJECT
        ============================================= */

        const user = {

            name: name,

            email: email,

            phone: phone,

            password: password

        };


        /* =============================================
           SAVE USER
        ============================================= */

        localStorage.setItem(
            "freshCartUser",
            JSON.stringify(user)
        );


        /* =============================================
           IMPORTANT
           DO NOT LOGIN USER AUTOMATICALLY
        ============================================= */

        localStorage.removeItem(
            "freshCartLoggedIn"
        );


        /* =============================================
           SUCCESS MESSAGE
        ============================================= */

        message.textContent =
            "Account created successfully! Redirecting to login...";

        message.style.color =
            "#4b9228";


        /* =============================================
           REDIRECT TO LOGIN PAGE
        ============================================= */

        setTimeout(function () {

            window.location.href =
                "login.html";

        }, 1500);

    });

});

