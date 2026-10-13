/* =====================================================
   APP.JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();
    updateWishlistCount();

    renderCategories();

    renderPopularProducts();

    renderDealProducts();

    initializeSearch();

    initializeTheme();

    initializeModals();

    initializeLocation();

    initializeMobileMenu();

    initializeBackToTop();

    initializeNewsletter();

});


/* =====================================================
   LOCAL STORAGE
===================================================== */

function getCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


function getWishlist() {

    return JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

}


function saveWishlist(wishlist) {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}


/* =====================================================
   CART COUNT
===================================================== */

function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.textContent = count;

    }

}


/* =====================================================
   WISHLIST COUNT
===================================================== */

function updateWishlistCount() {

    const wishlist = getWishlist();

    const element =
        document.getElementById("wishlistCount");

    if (element) {

        element.textContent =
            wishlist.length;

    }

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) return;


    const cart = getCart();

    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;
        existing.price = product.price;
        existing.name = product.name;
        existing.emoji = product.emoji;

    } else {

        cart.push({

            id: product.id,
            quantity: 1,
            price: product.price,
            name: product.name,
            emoji: product.emoji

        });

    }


    saveCart(cart);

    updateCartCount();

    showToast(
        `${product.name} added to cart`
    );

}


/* =====================================================
   REMOVE FROM CART
===================================================== */

function removeFromCart(productId) {

    let cart = getCart();

    cart =
        cart.filter(
            item => item.id !== productId
        );

    saveCart(cart);

    updateCartCount();

}


/* =====================================================
   WISHLIST
===================================================== */
function toggleWishlist(productId) {

    let wishlist = getWishlist();

    productId = Number(productId);

    if (wishlist.includes(productId)) {

        wishlist = wishlist.filter(id => id !== productId);

        showToast("Removed from wishlist");

    } else {

        wishlist.push(productId);

        showToast("Added to wishlist");
    }

    saveWishlist(wishlist);

    updateWishlistCount();

    if (typeof loadWishlist === "function") {
        loadWishlist();
    }
}
/* =====================================================
   PRODUCT CARD
===================================================== */

function createProductCard(product) {

    const wishlist =
        getWishlist();

    const isWishlisted =
        wishlist.includes(product.id);


    return `

        <div
            class="product-card"
            data-id="${product.id}">

            <div class="product-image ${product.color}">

                <span class="discount-badge">
                    ${product.discount}% OFF
                </span>

                <button
                    class="wishlist-btn ${isWishlisted ? "active" : ""}"
                    onclick="toggleWishlist(${product.id})">

                    <i class="${isWishlisted
                        ? "fa-solid"
                        : "fa-regular"} fa-heart">
                    </i>

                </button>


                <div class="product-emoji">

                    ${product.emoji}

                </div>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-weight">
                    ${product.weight}
                </p>


                <div class="rating">

                    <span>
                        ★ ${product.rating}
                    </span>

                    <small>
                        (${product.reviews})
                    </small>

                </div>


                <div class="product-bottom">

                    <div>

                        <strong>
                            ₹${product.price}
                        </strong>

                        <del>
                            ₹${product.originalPrice}
                        </del>

                    </div>


                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})">

                        <i class="fa-solid fa-cart-plus"></i>

                        Add

                    </button>

                </div>

            </div>

        </div>

    `;

}


/* =====================================================
   CATEGORIES
===================================================== */

function renderCategories() {

    const container =
        document.getElementById(
            "categoryGrid"
        );

    if (!container) return;


    container.innerHTML =
        categories.map(category => `

            <a
                href="products.html?category=${encodeURIComponent(category.name)}"
                class="category-card">

                <div class="category-icon">

                    ${category.icon}

                </div>

                <h3>
                    ${category.name}
                </h3>

                <span>
                    Shop Now →
                </span>

            </a>

        `).join("");

}


/* =====================================================
   POPULAR PRODUCTS
===================================================== */

function renderPopularProducts() {

    const container =
        document.getElementById(
            "popularProducts"
        );

    if (!container) return;


    const popular =
        products.slice(0, 8);


    container.innerHTML =
        popular
            .map(createProductCard)
            .join("");

}


/* =====================================================
   DEAL PRODUCTS
===================================================== */

function renderDealProducts() {

    const container =
        document.getElementById(
            "dealProducts"
        );

    if (!container) return;


    const deals =
        [...products]
            .sort(
                (a, b) =>
                    b.discount - a.discount
            )
            .slice(0, 8);


    container.innerHTML =
        deals
            .map(createProductCard)
            .join("");

}


/* =====================================================
   SEARCH
===================================================== */

function initializeSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );

    const results =
        document.getElementById(
            "searchResults"
        );

    if (!input || !results) return;


    input.addEventListener(
        "input",
        () => {

            const value =
                input.value
                    .trim()
                    .toLowerCase();


            if (!value) {

                results.innerHTML = "";

                results.classList.remove(
                    "show"
                );

                return;

            }


            const matches =
                products
                    .filter(product =>
                        product.name
                            .toLowerCase()
                            .includes(value)
                    )
                    .slice(0, 6);


            if (!matches.length) {

                results.innerHTML = `
                    <div class="no-results">
                        No products found
                    </div>
                `;

            } else {

                results.innerHTML =
                    matches.map(product => `

                        <a
                            href="product-details.html?id=${product.id}"
                            class="search-result">

                            <span>
                                ${product.emoji}
                            </span>

                            <div>
                                <strong>
                                    ${product.name}
                                </strong>

                                <small>
                                    ₹${product.price}
                                </small>
                            </div>

                        </a>

                    `).join("");

            }


            results.classList.add("show");

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !input.contains(event.target) &&
                !results.contains(event.target)
            ) {

                results.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* =====================================================
   THEME
===================================================== */

function initializeTheme() {

    const button =
        document.getElementById(
            "themeBtn"
        );

    if (!button) return;


    const savedTheme =
        localStorage.getItem(
            "theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    }


    button.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            const dark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "theme",
                dark ? "dark" : "light"
            );

        }
    );

}


/* =====================================================
   MODALS
===================================================== */

function initializeModals() {

    const accountBtn =
        document.getElementById(
            "accountBtn"
        );

    const accountModal =
        document.getElementById(
            "accountModal"
        );


    if (accountBtn && accountModal) {

        accountBtn.addEventListener(
            "click",
            () => {

                accountModal.classList.add(
                    "show"
                );

            }
        );

    }


    document.querySelectorAll(
        "[data-close]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.close;

                document
                    .getElementById(id)
                    ?.classList.remove(
                        "show"
                    );

            }
        );

    });


    document.querySelectorAll(
        ".modal"
    ).forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    modal.classList.remove(
                        "show"
                    );

                }

            }
        );

    });


    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                showToast(
                    "Login successful!"
                );

                accountModal.classList.remove(
                    "show"
                );

            }
        );

    }

}


/* =====================================================
   LOCATION
===================================================== */

function initializeLocation() {

    const button =
        document.getElementById(
            "locationBtn"
        );

    const modal =
        document.getElementById(
            "locationModal"
        );

    const text =
        document.getElementById(
            "locationText"
        );


    if (!button || !modal) return;


    const savedLocation =
        localStorage.getItem(
            "location"
        );


    if (savedLocation && text) {

        text.textContent =
            savedLocation;

    }


    button.addEventListener(
        "click",
        () => {

            modal.classList.add(
                "show"
            );

        }
    );


    document.querySelectorAll(
        "[data-location]"
    ).forEach(option => {

        option.addEventListener(
            "click",
            () => {

                const location =
                    option.dataset.location;

                localStorage.setItem(
                    "location",
                    location
                );


                if (text) {

                    text.textContent =
                        location;

                }


                modal.classList.remove(
                    "show"
                );


                showToast(
                    `Delivery location: ${location}`
                );

            }
        );

    });

}


/* =====================================================
   MOBILE MENU
===================================================== */

function initializeMobileMenu() {

    const button =
        document.getElementById(
            "categoryMenuBtn"
        );

    const menu =
        document.getElementById(
            "mobileMenu"
        );


    if (!button || !menu) return;


    button.addEventListener(
        "click",
        () => {

            menu.classList.toggle(
                "show"
            );

        }
    );

}


/* =====================================================
   NEWSLETTER
===================================================== */

function initializeNewsletter() {

    const form =
        document.getElementById(
            "newsletterForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            showToast(
                "Successfully subscribed!"
            );

            form.reset();

        }
    );

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    const text =
        document.getElementById(
            "toastMessage"
        );


    if (!toast || !text) return;


    text.textContent = message;

    toast.classList.add("show");


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}


/* =====================================================
   BACK TO TOP
===================================================== */

function initializeBackToTop() {

    const button =
        document.getElementById(
            "backTop"
        );

    if (!button) return;


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =====================================================
   GLOBAL PRODUCT DETAILS
===================================================== */

document.addEventListener(
    "click",
    event => {

        const card =
            event.target.closest(
                ".product-card"
            );


        if (
            card &&
            !event.target.closest(
                "button"
            )
        ) {

            const id =
                card.dataset.id;

            window.location.href =
                `product-details.html?id=${id}`;

        }

    }
);