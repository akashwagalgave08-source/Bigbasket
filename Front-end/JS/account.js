/* =========================================================
   BIGBASKET ACCOUNT PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const loginPage =
        document.getElementById("loginPage");

    const signupPage =
        document.getElementById("signupPage");

    const dashboard =
        document.getElementById("dashboard");


    const loginForm =
        document.getElementById("loginForm");

    const signupForm =
        document.getElementById("signupForm");


    const showCreateAccount =
        document.getElementById("showCreateAccount");

    const backToLogin =
        document.getElementById("backToLogin");


    const loginMessage =
        document.getElementById("loginMessage");

    const signupMessage =
        document.getElementById("signupMessage");


    /* =====================================================
       GET USER
    ===================================================== */

    function getUser() {

        const savedUser =
            localStorage.getItem("bigbasketUser") ||
            localStorage.getItem("freshCartCurrentUser") ||
            localStorage.getItem("freshCartUser");

        if (!savedUser) {

            return null;

        }

        try {

            return JSON.parse(savedUser);

        } catch (error) {

            return null;

        }

    }


    /* =====================================================
       CHECK LOGIN
    ===================================================== */

    function checkLogin() {

        const loggedIn =
            localStorage.getItem(
                "bigbasketLoggedIn"
            );

        if (
            loggedIn === "true" ||
            localStorage.getItem("freshCartLoggedIn") === "true"
        ) {

            showDashboard();

        } else {

            showLogin();

        }

    }


    /* =====================================================
       SHOW LOGIN
    ===================================================== */

    function showLogin() {

        loginPage.classList.remove("hidden");

        signupPage.classList.add("hidden");

        dashboard.classList.add("hidden");

    }


    /* =====================================================
       SHOW SIGNUP
    ===================================================== */

    showCreateAccount.addEventListener(
        "click",
        function () {

            loginPage.classList.add("hidden");

            signupPage.classList.remove("hidden");

            dashboard.classList.add("hidden");

        }
    );


    /* =====================================================
       BACK TO LOGIN
    ===================================================== */

    backToLogin.addEventListener(
        "click",
        function () {

            signupPage.classList.add("hidden");

            loginPage.classList.remove("hidden");

            dashboard.classList.add("hidden");

        }
    );


    /* =====================================================
       CREATE ACCOUNT
    ===================================================== */

    signupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("signupName")
                    .value
                    .trim();


            const mobile =
                document
                    .getElementById("signupMobile")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("signupEmail")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("signupPassword")
                    .value;


            /* NAME */

            if (name.length < 2) {

                signupMessage.textContent =
                    "Please enter your full name.";

                signupMessage.style.color =
                    "red";

                return;

            }


            /* MOBILE */

            if (!/^[6-9]\d{9}$/.test(mobile)) {

                signupMessage.textContent =
                    "Please enter a valid 10 digit mobile number.";

                signupMessage.style.color =
                    "red";

                return;

            }


            /* EMAIL */

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ) {

                signupMessage.textContent =
                    "Please enter a valid email address.";

                signupMessage.style.color =
                    "red";

                return;

            }


            /* PASSWORD */

            if (password.length < 6) {

                signupMessage.textContent =
                    "Password must contain at least 6 characters.";

                signupMessage.style.color =
                    "red";

                return;

            }


            /* CREATE USER */

            const user = {

                name: name,

                mobile: mobile,

                email: email,

                password: password

            };


            localStorage.setItem(
                "bigbasketUser",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "bigbasketLoggedIn",
                "true"
            );


            signupMessage.textContent =
                "Account created successfully!";

            signupMessage.style.color =
                "green";


            setTimeout(
                function () {

                    signupForm.reset();

                    showDashboard();

                },
                700
            );

        }
    );


    /* =====================================================
       LOGIN
    ===================================================== */

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const mobile =
                document
                    .getElementById("loginMobile")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            const user =
                getUser();


            /* MOBILE */

            if (!/^[6-9]\d{9}$/.test(mobile)) {

                loginMessage.textContent =
                    "Enter a valid 10 digit mobile number.";

                loginMessage.style.color =
                    "red";

                return;

            }


            /* USER NOT FOUND */

            if (!user) {

                loginMessage.textContent =
                    "Account not found. Please create an account.";

                loginMessage.style.color =
                    "red";

                return;

            }


            /* CHECK DETAILS */

            if (
                user.mobile !== mobile ||
                user.password !== password
            ) {

                loginMessage.textContent =
                    "Incorrect mobile number or password.";

                loginMessage.style.color =
                    "red";

                return;

            }


            /* LOGIN SUCCESS */

            localStorage.setItem(
                "bigbasketLoggedIn",
                "true"
            );


            loginMessage.textContent =
                "Login successful!";

            loginMessage.style.color =
                "green";


            setTimeout(
                function () {

                    showDashboard();

                },
                500
            );

        }
    );


    /* =====================================================
       SHOW DASHBOARD
    ===================================================== */

    function showDashboard() {

        loginPage.classList.add("hidden");

        signupPage.classList.add("hidden");

        dashboard.classList.remove("hidden");


        const user =
            getUser();


        if (!user) {

            showLogin();

            return;

        }


        /* SIDEBAR */

        document.getElementById(
            "sidebarName"
        ).textContent =
            user.name;


        document.getElementById(
            "sidebarMobile"
        ).textContent =
            "+91 " + user.mobile;


        /* PROFILE */

        document.getElementById(
            "profileName"
        ).textContent =
            user.name;


        document.getElementById(
            "profileMobile"
        ).textContent =
            "+91 " + user.mobile;


        document.getElementById(
            "profileEmail"
        ).textContent =
            user.email;


        updateCartCount();
        updateProfileStats();

        const initial = user.name ? user.name.charAt(0).toUpperCase() : "A";
        document.querySelectorAll(".account-avatar, .large-avatar").forEach(function (avatar) {
            avatar.textContent = initial;
        });

    }


    /* =====================================================
       SIDEBAR NAVIGATION
    ===================================================== */

    const menuButtons =
        document.querySelectorAll(
            ".account-menu button"
        );


    const contentSections = {

        profile:
            document.getElementById(
                "profileSection"
            ),

        orders:
            document.getElementById(
                "ordersSection"
            ),

        wishlist:
            document.getElementById(
                "wishlistSection"
            ),

        cart:
            document.getElementById(
                "cartSection"
            ),

        addresses:
            document.getElementById(
                "addressesSection"
            ),

        offers:
            document.getElementById(
                "offersSection"
            ),

        settings:
            document.getElementById(
                "settingsSection"
            )

    };

    function getStoredList(primaryKey, fallbackKey) {
        try {
            const primary = localStorage.getItem(primaryKey);
            return JSON.parse(primary || localStorage.getItem(fallbackKey) || "[]");
        } catch (error) {
            return [];
        }
    }

    function productName(productId) {
        const catalog = typeof products !== "undefined" ? products : [];
        const product = catalog.find(item => Number(item.id) === Number(productId));
        return product ? product.name : "Product #" + productId;
    }

    function renderEmptyList(message, link, label) {
        return '<div class="empty-box"><h2>' + message + '</h2><p>Add products while shopping and they will appear here.</p><a href="' + link + '" class="green-btn" style="display:inline-flex;width:auto;padding:0 25px;text-decoration:none;">' + label + '</a></div>';
    }

    function renderWishlist() {
        const wishlist = getStoredList("freshcartWishlist", "wishlist");
        const section = contentSections.wishlist;
        if (!section) return;

        const items = wishlist.map(id =>
            '<div class="account-product-item"><div><h3>' + productName(id) + '</h3><p>Saved to your wishlist</p></div><a class="account-product-link" href="../index.html">View product</a></div>'
        ).join("");
        section.querySelector(".empty-box, .account-product-list")?.remove();
        section.insertAdjacentHTML("beforeend", items ? '<div class="account-product-list">' + items + '</div>' : renderEmptyList("Wishlist is Empty", "../index.html", "Explore Products"));
        updateProfileStats();
    }

    function renderCart() {
        const cart = getStoredList("freshcartCart", "cart");
        const section = contentSections.cart;
        if (!section) return;

        const items = cart.map(item => {
            const quantity = Number(item.quantity || 1);
            return '<div class="account-product-item"><div><h3>' + productName(item.id) + '</h3><p>Quantity: ' + quantity + '</p></div><a class="account-product-link" href="cart.html">View cart</a></div>';
        }).join("");
        section.querySelector(".empty-box, .account-product-list")?.remove();
        section.insertAdjacentHTML("beforeend", items ? '<div class="account-product-list">' + items + '</div>' : renderEmptyList("Your Cart is Empty", "../index.html", "Start Shopping"));
        updateCartCount();
    }

    function renderOrders() {
        const orders = getStoredList("orders", "freshcartOrders");
        const section = contentSections.orders;
        if (!section) return;

        section.querySelector(".empty-account-state, .account-order-list")?.remove();
        if (!orders.length) {
            section.insertAdjacentHTML("beforeend", renderEmptyList("No Orders Yet", "../index.html", "Start Shopping"));
            return;
        }

        const orderItems = orders.slice().reverse().map(order => {
            const subtotal = Number(order.subtotal) || (order.items || []).reduce((sum, item) => {
                const product = typeof products !== "undefined" && products.find(product => Number(product.id) === Number(item.id || item.productId));
                return sum + (Number(item.total) || (product ? product.price * Number(item.quantity || 1) : 0));
            }, 0);
            const delivery = Number(order.delivery) || 0;
            const total = Number(order.total) || subtotal + delivery;
            return '<div class="account-order-item"><div><h3>Order ' + order.id + '</h3><p>' + (order.date || order.createdAt || "") + '</p><p>Status: ' + (order.status || "Order Confirmed") + '</p></div><div class="account-order-total"><p>Subtotal: ₹' + subtotal + '</p><p>Delivery: ' + (delivery ? "₹" + delivery : "FREE") + '</p><strong>Total: ₹' + total + '</strong></div></div>';
        }).join("");

        section.insertAdjacentHTML("beforeend", '<div class="account-order-list">' + orderItems + '</div>');
    }

    function updateProfileStats() {
        const stats = document.querySelectorAll(".stat-box strong");
        const wishlist = getStoredList("freshcartWishlist", "wishlist");
        if (stats[1]) stats[1].textContent = wishlist.length;
    }

    function initialiseSettings() {
        const section = contentSections.settings;
        if (!section || section.dataset.ready) return;
        section.dataset.ready = "true";
        section.querySelector(".empty-box")?.remove();
        section.insertAdjacentHTML("beforeend", '<form id="settingsForm" class="settings-card"><label><input id="orderUpdates" type="checkbox"> Order updates by SMS</label><label><input id="offersUpdates" type="checkbox"> Offers and product updates by email</label><button class="green-btn" type="submit">Save settings</button><p id="settingsMessage" class="account-message" aria-live="polite"></p></form>');

        const saved = JSON.parse(localStorage.getItem("freshCartSettings") || "{}");
        document.getElementById("orderUpdates").checked = saved.orderUpdates !== false;
        document.getElementById("offersUpdates").checked = saved.offersUpdates === true;
        document.getElementById("settingsForm").addEventListener("submit", function (event) {
            event.preventDefault();
            localStorage.setItem("freshCartSettings", JSON.stringify({
                orderUpdates: document.getElementById("orderUpdates").checked,
                offersUpdates: document.getElementById("offersUpdates").checked
            }));
            const message = document.getElementById("settingsMessage");
            message.textContent = "Settings saved successfully.";
            message.style.color = "green";
        });
    }


    menuButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const section =
                        button.dataset.section;


                    /* HIDE ALL */

                    Object.values(
                        contentSections
                    ).forEach(
                        function (element) {

                            element.classList.add(
                                "hidden"
                            );

                        }
                    );


                    /* SHOW SELECTED */

                    contentSections[
                        section
                    ].classList.remove(
                        "hidden"
                    );

                    if (section === "wishlist") renderWishlist();
                    if (section === "cart") renderCart();
                    if (section === "orders") renderOrders();
                    if (section === "settings") initialiseSettings();


                    /* ACTIVE BUTTON */

                    menuButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    /* =====================================================
       LOGOUT
    ===================================================== */

    document
        .getElementById("logoutButton")
        .addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) {

                    return;

                }


                localStorage.removeItem(
                    "bigbasketLoggedIn"
                );

                localStorage.removeItem("freshCartLoggedIn");
                localStorage.removeItem("freshCartCurrentUser");


                showLogin();

            }
        );


    /* =====================================================
       CART COUNT
    ===================================================== */

    function updateCartCount() {

        const cart = getStoredList("freshcartCart", "cart");


        let total = 0;


        cart.forEach(
            function (item) {

                total += Number(
                    item.quantity || 1
                );

            }
        );


        const cartCount =
            document.getElementById(
                "accountCartCount"
            );


        if (cartCount) {

            cartCount.textContent =
                total;

        }

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById(
            "accountSearch"
        );


    const searchButton =
        document.getElementById(
            "accountSearchButton"
        );


    function searchProducts() {

        const value =
            searchInput.value.trim();


        if (value === "") {

            return;

        }


        window.location.href =
            "index.html?search=" +
            encodeURIComponent(value);

    }


    searchButton.addEventListener(
        "click",
        searchProducts
    );


    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                searchProducts();

            }

        }
    );


    /* =====================================================
       START
    ===================================================== */

    checkLogin();

    window.addEventListener("storage", function (event) {
        if (["freshcartWishlist", "wishlist"].includes(event.key)) renderWishlist();
        if (["freshcartCart", "cart"].includes(event.key)) renderCart();
    });

});
