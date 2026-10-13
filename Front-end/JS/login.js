/* =====================================================
   FRESH CART
   LOGIN
===================================================== */


/* =====================================================
   GET ELEMENTS
===================================================== */

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const loginMessage =
    document.getElementById("loginMessage");


console.log("Login page loaded");


/* =====================================================
   SHOW / HIDE PASSWORD
===================================================== */

if (togglePassword) {

    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.textContent = "🙈";

        } else {

            passwordInput.type = "password";

            togglePassword.textContent = "👁";

        }

    });

}


/* =====================================================
   LOGIN FORM
===================================================== */

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* =============================================
           GET LOGIN VALUES
        ============================================= */

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        /* =============================================
           CLEAR MESSAGE
        ============================================= */

        loginMessage.textContent = "";


        /* =============================================
           GET REGISTERED USER
        ============================================= */

        const savedUser =
            JSON.parse(
                localStorage.getItem("freshCartUser")
            );


        /* =============================================
           CHECK WHETHER ACCOUNT EXISTS
        ============================================= */

        if (!savedUser) {

            loginMessage.textContent =
                "No account found. Please create an account first.";

            loginMessage.style.color =
                "#dc2626";

            return;

        }


        /* =============================================
           CHECK EMAIL & PASSWORD
        ============================================= */

        if (
            email.toLowerCase() ===
            savedUser.email.toLowerCase() &&

            password ===
            savedUser.password
        ) {


            /* =========================================
               LOGIN SUCCESS
            ========================================= */

            localStorage.setItem(
                "freshCartLoggedIn",
                "true"
            );


            /* =========================================
               SAVE CURRENT LOGGED-IN USER
            ========================================= */

            localStorage.setItem(
                "freshCartCurrentUser",
                JSON.stringify({
                    name: savedUser.name,
                    email: savedUser.email,
                    phone: savedUser.phone
                })
            );


            /* =========================================
               SUCCESS MESSAGE
            ========================================= */

            loginMessage.textContent =
                "Login successful! Redirecting...";

            loginMessage.style.color =
                "#4f9425";


            /* =========================================
               GO TO HOME
               (login.html lives inside /pages/, so we
               must go UP one folder with ../ to reach
               index.html at the project root)
            ========================================= */

            setTimeout(function () {

                window.location.href =
                    "../index.html";

            }, 700);


        } else {


            /* =========================================
               INVALID LOGIN
            ========================================= */

            loginMessage.textContent =
                "Invalid email or password.";

            loginMessage.style.color =
                "#dc2626";

        }

    });

}