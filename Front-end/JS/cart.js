/* =========================================================
   FRESHCART - CART PAGE JAVASCRIPT
   =========================================================

   FEATURES
   ---------------------------------------------------------
   ✔ Load cart from LocalStorage
   ✔ Render cart products
   ✔ Increase / decrease quantity
   ✔ Remove products
   ✔ Update subtotal
   ✔ Delivery charge
   ✔ Coupon discount
   ✔ Grand total
   ✔ Cart item count
   ✔ Toast notifications
   ✔ Proceed to checkout
   ✔ Continue shopping
   ✔ Empty cart handling
   ✔ Safe DOM handling
   ✔ Works with freshcartCart LocalStorage key
========================================================= */


/* =========================================================
   GLOBAL CART STORAGE KEY
========================================================= */

const CART_STORAGE_KEY = "freshcartCart";

const COUPON_STORAGE_KEY = "couponDiscount";


/* =========================================================
   PAGE INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderCart();

        initializeCoupon();

        initializeCartButtons();

        updateCartCount();

    }
);


/* =========================================================
   GET CART
========================================================= */

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem(
                CART_STORAGE_KEY
            )
        ) || [];

    } catch (error) {

        console.error(
            "Unable to read cart:",
            error
        );

        return [];

    }

}


/* =========================================================
   SAVE CART
========================================================= */

function saveCart(cart) {

    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
    );

}


/* =========================================================
   GET PRODUCT
========================================================= */

function getProduct(productId) {

    if (
        typeof products === "undefined" ||
        !Array.isArray(products)
    ) {

        console.error(
            "Product data not found."
        );

        return null;

    }


    return products.find(
        product =>
            Number(product.id) ===
            Number(productId)
    ) || null;

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    const cart =
        getCart();


    const container =
        document.getElementById(
            "cartItems"
        );


    const empty =
        document.getElementById(
            "emptyCart"
        );


    const layout =
        document.getElementById(
            "cartLayout"
        );


    /*
       SAFETY CHECK
    */

    if (!container) {

        return;

    }


    /*
       EMPTY CART
    */

    if (!cart.length) {

        container.innerHTML = "";


        if (layout) {

            layout.style.display =
                "none";

        }


        if (empty) {

            empty.style.display =
                "block";

        }


        updateCartSummary();

        updateCartCount();

        return;

    }


    /*
       SHOW CART
    */

    if (layout) {

        layout.style.display =
            "grid";

    }


    if (empty) {

        empty.style.display =
            "none";

    }


    /*
       CREATE CART ITEMS
    */

    container.innerHTML =

        cart.map(
            function (item) {

                const product =
                    getProduct(
                        item.id
                    );


                if (!product) {

                    return "";

                }


                const quantity =
                    Number(
                        item.quantity
                    ) || 1;


                const itemTotal =
                    product.price *
                    quantity;


                /*
                   PRODUCT IMAGE

                   If image exists use image.
                   Otherwise show emoji.
                */

                const productVisual =

                    product.image

                        ? `
                            <img
                                src="${product.image}"
                                alt="${product.name}"
                                class="cart-product-img"
                                onerror="
                                    this.style.display='none';
                                    this.nextElementSibling.style.display='flex';
                                "
                            >

                            <div
                                class="cart-product-emoji"
                                style="display:none;"
                            >
                                ${product.emoji || "🛒"}
                            </div>
                          `

                        : `
                            <div
                                class="cart-product-emoji"
                            >
                                ${product.emoji || "🛒"}
                            </div>
                          `;


                return `

                    <!-- =================================
                         CART ITEM
                    ================================== -->

                    <div
                        class="cart-item"
                        data-product-id="${product.id}"
                    >


                        <!-- PRODUCT IMAGE -->

                        <div
                            class="cart-product-image ${product.color || ""}"
                        >

                            ${productVisual}

                        </div>


                        <!-- PRODUCT INFORMATION -->

                        <div
                            class="cart-product-info"
                        >

                            <span class="cart-category">

                                ${product.category || "Grocery"}

                            </span>


                            <h3>

                                ${product.name}

                            </h3>


                            <p>

                                ${product.weight || ""}

                            </p>


                            ${
                                product.rating
                                    ? `
                                        <small class="cart-rating">
                                            ⭐ ${product.rating}
                                        </small>
                                      `
                                    : ""
                            }

                        </div>


                        <!-- PRICE -->

                        <div
                            class="cart-price"
                        >

                            ₹${product.price}

                            ${
                                product.originalPrice
                                    ? `
                                        <del>
                                            ₹${product.originalPrice}
                                        </del>
                                      `
                                    : ""
                            }

                        </div>


                        <!-- QUANTITY -->

                        <div
                            class="quantity-control"
                        >

                            <button
                                type="button"
                                class="quantity-btn"
                                aria-label="Decrease quantity"
                                onclick="
                                    changeQuantity(
                                        ${product.id},
                                        -1
                                    )
                                "
                            >

                                −

                            </button>


                            <span
                                class="quantity-value"
                            >

                                ${quantity}

                            </span>


                            <button
                                type="button"
                                class="quantity-btn"
                                aria-label="Increase quantity"
                                onclick="
                                    changeQuantity(
                                        ${product.id},
                                        1
                                    )
                                "
                            >

                                +

                            </button>

                        </div>


                        <!-- ITEM TOTAL -->

                        <strong
                            class="item-total"
                        >

                            ₹${itemTotal}

                        </strong>


                        <!-- REMOVE -->

                        <button
                            type="button"
                            class="remove-item"
                            aria-label="Remove ${product.name}"
                            onclick="
                                removeItem(
                                    ${product.id}
                                )
                            "
                        >

                            <i
                                class="fa-solid fa-trash"
                            ></i>

                        </button>

                    </div>

                `;

            }
        ).join("");


    /*
       UPDATE SUMMARY
    */

    updateCartSummary();


    /*
       UPDATE HEADER COUNT
    */

    updateCartCount();

}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(
    productId,
    change
) {

    const cart =
        getCart();


    const item =
        cart.find(
            cartItem =>
                Number(cartItem.id) ===
                Number(productId)
        );


    if (!item) {

        return;

    }


    /*
       CHANGE QUANTITY
    */

    item.quantity =
        Number(item.quantity) +
        Number(change);


    /*
       REMOVE WHEN QUANTITY REACHES ZERO
    */

    if (
        item.quantity <= 0
    ) {

        removeItem(
            productId
        );

        return;

    }


    /*
       SAVE
    */

    saveCart(cart);


    /*
       REFRESH UI
    */

    renderCart();


    updateCartCount();


    /*
       PRODUCT MESSAGE
    */

    const product =
        getProduct(
            productId
        );


    if (product) {

        if (change > 0) {

            showToast(
                `${product.name} quantity increased`
            );

        }

    }

}


/* =========================================================
   REMOVE ITEM
========================================================= */

function removeItem(
    productId
) {

    const cart =
        getCart();


    const product =
        getProduct(
            productId
        );


    const updatedCart =
        cart.filter(
            item =>
                Number(item.id) !==
                Number(productId)
        );


    saveCart(
        updatedCart
    );


    /*
       CLEAR COUPON IF CART EMPTY
    */

    if (!updatedCart.length) {

        localStorage.removeItem(
            COUPON_STORAGE_KEY
        );

    }


    /*
       REFRESH
    */

    renderCart();


    updateCartCount();


    /*
       NOTIFICATION
    */

    if (product) {

        showToast(
            `${product.name} removed from cart`
        );

    } else {

        showToast(
            "Product removed from cart"
        );

    }

}


/* =========================================================
   UPDATE CART SUMMARY
========================================================= */

function updateCartSummary() {

    const cart =
        getCart();


    let subtotal = 0;


    /*
       CALCULATE SUBTOTAL
    */

    cart.forEach(
        function (item) {

            const product =
                getProduct(
                    item.id
                );


            if (!product) {

                return;

            }


            const quantity =
                Number(
                    item.quantity
                ) || 1;


            subtotal +=
                product.price *
                quantity;

        }
    );


    /*
       DELIVERY CHARGE

       ₹499 or more = FREE
       Below ₹499 = ₹40
    */

    const delivery =

        subtotal >= 499

            ? 0

            : subtotal === 0

                ? 0

                : 40;


    /*
       COUPON DISCOUNT
    */

    let discount =
        Number(
            localStorage.getItem(
                COUPON_STORAGE_KEY
            )
        ) || 0;


    /*
       NEVER ALLOW DISCOUNT
       GREATER THAN SUBTOTAL
    */

    discount =
        Math.min(
            discount,
            subtotal
        );


    /*
       GRAND TOTAL
    */

    const total =
        Math.max(
            0,
            subtotal +
            delivery -
            discount
        );


    /*
       UPDATE SUBTOTAL
    */

    const subtotalElement =
        document.getElementById(
            "subtotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            `₹${subtotal}`;

    }


    /*
       DELIVERY
    */

    const deliveryElement =
        document.getElementById(
            "deliveryCharge"
        );


    if (deliveryElement) {

        deliveryElement.textContent =

            delivery === 0

                ? "FREE"

                : `₹${delivery}`;

    }


    /*
       DISCOUNT
    */

    const discountElement =
        document.getElementById(
            "discount"
        );


    if (discountElement) {

        discountElement.textContent =
            `- ₹${discount}`;

    }


    /*
       GRAND TOTAL
    */

    const totalElement =
        document.getElementById(
            "grandTotal"
        );


    if (totalElement) {

        totalElement.textContent =
            `₹${total}`;

    }


    /*
       CART ITEM COUNT
    */

    const cartItemsCount =
        document.getElementById(
            "cartItemsCount"
        );


    if (cartItemsCount) {

        const itemCount =
            cart.reduce(
                function (
                    sum,
                    item
                ) {

                    return (
                        sum +
                        (
                            Number(
                                item.quantity
                            ) || 1
                        )
                    );

                },
                0
            );


        cartItemsCount.textContent =
            `${itemCount} ${
                itemCount === 1
                    ? "item"
                    : "items"
            }`;

    }

}


/* =========================================================
   UPDATE HEADER CART COUNT
========================================================= */

function updateCartCount() {

    const cart =
        getCart();


    const count =
        cart.reduce(
            function (
                total,
                item
            ) {

                return (
                    total +
                    (
                        Number(
                            item.quantity
                        ) || 1
                    )
                );

            },
            0
        );


    /*
       SUPPORT DIFFERENT
       HEADER COUNT IDS
    */

    const selectors = [

        "cartCount",

        "headerCartCount",

        "cartBadge",

        "basketCount"

    ];


    selectors.forEach(
        function (id) {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.textContent =
                    count;

                /*
                   Hide badge when empty
                */

                if (count === 0) {

                    element.style.display =
                        "none";

                } else {

                    element.style.display =
                        "flex";

                }

            }

        }
    );

}


/* =========================================================
   COUPON INITIALIZATION
========================================================= */

function initializeCoupon() {

    const button =
        document.getElementById(
            "applyCoupon"
        );


    const input =
        document.getElementById(
            "couponInput"
        );


    if (
        !button ||
        !input
    ) {

        return;

    }


    /*
       ALLOW ENTER KEY
    */

    input.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Enter"
            ) {

                event.preventDefault();

                button.click();

            }

        }
    );


    /*
       APPLY COUPON
    */

    button.addEventListener(
        "click",
        function () {

            const code =
                input.value
                    .trim()
                    .toUpperCase();


            const cart =
                getCart();


            /*
               EMPTY CART
            */

            if (!cart.length) {

                showToast(
                    "Add products before applying a coupon"
                );

                return;

            }


            /*
               CALCULATE SUBTOTAL
            */

            let subtotal = 0;


            cart.forEach(
                function (item) {

                    const product =
                        getProduct(
                            item.id
                        );


                    if (product) {

                        subtotal +=
                            product.price *
                            (
                                Number(
                                    item.quantity
                                ) || 1
                            );

                    }

                }
            );


            /*
               EMPTY COUPON
            */

            if (!code) {

                showToast(
                    "Please enter a coupon code"
                );

                return;

            }


            /*
               SAVE10
               10% DISCOUNT
            */

            if (
                code ===
                "SAVE10"
            ) {

                const discount =
                    Math.round(
                        subtotal *
                        0.10
                    );


                localStorage.setItem(
                    COUPON_STORAGE_KEY,
                    discount
                );


                updateCartSummary();


                showToast(
                    `Coupon applied! You saved ₹${discount}`
                );


                input.value =
                    "SAVE10";


                return;

            }


            /*
               SAVE100
               ₹100 DISCOUNT
               Minimum order ₹499
            */

            if (
                code ===
                "SAVE100"
            ) {

                if (
                    subtotal < 499
                ) {

                    showToast(
                        "SAVE100 requires a minimum order of ₹499"
                    );

                    return;

                }


                const discount =
                    Math.min(
                        100,
                        subtotal
                    );


                localStorage.setItem(
                    COUPON_STORAGE_KEY,
                    discount
                );


                updateCartSummary();


                showToast(
                    `Coupon applied! You saved ₹${discount}`
                );


                return;

            }


            /*
               INVALID COUPON
            */

            localStorage.removeItem(
                COUPON_STORAGE_KEY
            );


            updateCartSummary();


            showToast(
                "Invalid coupon code"
            );

        }
    );

}


/* =========================================================
   CART PAGE BUTTONS
========================================================= */

function initializeCartButtons() {

    /*
       CHECKOUT BUTTON
    */

    const checkoutButton =
        document.getElementById(
            "checkoutButton"
        );


    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            function () {

                const cart =
                    getCart();


                if (!cart.length) {

                    showToast(
                        "Your cart is empty"
                    );

                    return;

                }


                /*
                   GO TO CHECKOUT
                */

                window.location.href =
                    "checkout.html";

            }
        );

    }


    /*
       CONTINUE SHOPPING
    */

    const continueShopping =
        document.getElementById(
            "continueShopping"
        );


    if (continueShopping) {

        continueShopping.addEventListener(
            "click",
            function () {

                window.location.href =
                    "../index.html";

            }
        );

    }


    /*
       EMPTY CART SHOPPING BUTTON
    */

    const startShopping =
        document.getElementById(
            "startShopping"
        );


    if (startShopping) {

        startShopping.addEventListener(
            "click",
            function () {

                window.location.href =
                    "../index.html";

            }
        );

    }

}


/* =========================================================
   ADD TO CART
   USE THIS FUNCTION FROM PRODUCT CARDS
========================================================= */

function addToCart(
    productId,
    quantity = 1
) {

    const product =
        getProduct(
            productId
        );


    if (!product) {

        showToast(
            "Product not found"
        );

        return;

    }


    let cart =
        getCart();


    const existingItem =
        cart.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    /*
       IF PRODUCT ALREADY EXISTS
    */

    if (existingItem) {

        existingItem.quantity =
            (
                Number(
                    existingItem.quantity
                ) || 0
            ) +
            Number(quantity);


        showToast(
            `${product.name} quantity updated`
        );

    }


    /*
       NEW PRODUCT
    */

    else {

        cart.push({

            id:
                product.id,

            quantity:
                Number(quantity) || 1

        });


        showToast(
            `${product.name} added to cart 🛒`
        );

    }


    /*
       SAVE
    */

    saveCart(
        cart
    );


    /*
       UPDATE HEADER
    */

    updateCartCount();


    /*
       IF CART PAGE
    */

    if (
        document.getElementById(
            "cartItems"
        )
    ) {

        renderCart();

    }

}


/* =========================================================
   BUY NOW
========================================================= */

function buyNow(
    productId
) {

    const product =
        getProduct(
            productId
        );


    if (!product) {

        showToast(
            "Product not found"
        );

        return;

    }


    /*
       REPLACE CART WITH
       SELECTED PRODUCT
    */

    const cart = [

        {

            id:
                product.id,

            quantity:
                1

        }

    ];


    saveCart(
        cart
    );


    updateCartCount();


    /*
       NOTIFICATION
    */

    showToast(
        `${product.name} selected. Going to checkout...`
    );


    /*
       DIRECT CHECKOUT

       Change this path if your
       checkout page is inside
       another folder.
    */

    setTimeout(
        function () {

            window.location.href =
                "checkout.html";

        },
        500
    );

}


/* =========================================================
   CLEAR ENTIRE CART
========================================================= */

function clearCart() {

    const cart =
        getCart();


    if (!cart.length) {

        showToast(
            "Your cart is already empty"
        );

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to remove all products from your cart?"
        );


    if (!confirmed) {

        return;

    }


    localStorage.removeItem(
        CART_STORAGE_KEY
    );


    localStorage.removeItem(
        COUPON_STORAGE_KEY
    );


    renderCart();


    updateCartCount();


    showToast(
        "All products removed from cart"
    );

}


/* =========================================================
   TOAST NOTIFICATION
========================================================= */

function showToast(
    message
) {

    /*
       FIND EXISTING TOAST
    */

    let toast =
        document.getElementById(
            "toast"
        );


    /*
       CREATE TOAST IF IT
       DOES NOT EXIST
    */

    if (!toast) {

        toast =
            document.createElement(
                "div"
            );


        toast.id =
            "toast";


        toast.innerHTML = `

            <span
                id="toastIcon"
                class="toast-icon"
            >
                ✓
            </span>

            <span
                id="toastMessage"
                class="toast-message"
            ></span>

            <button
                type="button"
                id="toastClose"
                class="toast-close"
                aria-label="Close notification"
            >
                ×
            </button>

        `;


        document.body.appendChild(
            toast
        );


        /*
           CLOSE BUTTON
        */

        const closeButton =
            toast.querySelector(
                "#toastClose"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function () {

                    toast.classList.remove(
                        "show"
                    );

                }
            );

        }

    }


    const messageElement =
        document.getElementById(
            "toastMessage"
        );


    if (messageElement) {

        messageElement.textContent =
            message;

    }


    /*
       SHOW
    */

    toast.classList.add(
        "show"
    );


    /*
       CLEAR PREVIOUS TIMER
    */

    if (
        window.cartToastTimer
    ) {

        clearTimeout(
            window.cartToastTimer
        );

    }


    /*
       HIDE AFTER 3 SECONDS
    */

    window.cartToastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =========================================================
   LISTEN FOR STORAGE CHANGES
========================================================= */

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key ===
            CART_STORAGE_KEY
        ) {

            renderCart();

            updateCartCount();

        }

    }
);


/* =========================================================
   MAKE FUNCTIONS AVAILABLE
   TO INLINE HTML BUTTONS
========================================================= */

window.getCart =
    getCart;

window.saveCart =
    saveCart;

window.addToCart =
    addToCart;

window.buyNow =
    buyNow;

window.changeQuantity =
    changeQuantity;

window.removeItem =
    removeItem;

window.clearCart =
    clearCart;

window.updateCartCount =
    updateCartCount;

window.showToast =
    showToast;