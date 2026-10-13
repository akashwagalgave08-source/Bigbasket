/* =========================================================
   FRESHCART PAYMENT PAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializePaymentPage();

    }
);


/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [

    {
        id: 1,
        name: "Fresh Apples",
        price: 99,
        emoji: "🍎"
    },

    {
        id: 2,
        name: "Fresh Milk",
        price: 58,
        emoji: "🥛"
    },

    {
        id: 3,
        name: "Basmati Rice",
        price: 399,
        emoji: "🌾"
    },

    {
        id: 4,
        name: "Butter Biscuits",
        price: 42,
        emoji: "🍪"
    },

    {
        id: 5,
        name: "Cooking Oil",
        price: 145,
        emoji: "🫗"
    },

    {
        id: 6,
        name: "Potato Chips",
        price: 34,
        emoji: "🥔"
    }

];


/* =========================================================
   INITIALIZE
========================================================= */

function initializePaymentPage() {

    renderPaymentSummary();

    initializePaymentMethods();

    initializeUPI();

    initializeCard();

    initializeButtons();

}


/* =========================================================
   GET CART
========================================================= */

function getCart() {

    return JSON.parse(
        localStorage.getItem("freshcartCart")
    ) || [];

}


/* =========================================================
   GET PRODUCT
========================================================= */

function getProduct(productId) {

    return products.find(
        product =>
            product.id === Number(productId)
    );

}


/* =========================================================
   CALCULATE TOTALS
========================================================= */

function calculateTotals(cart) {

    let subtotal = 0;

    let itemCount = 0;


    cart.forEach(item => {

        const product =
            getProduct(item.id);

        if (!product) {
            return;
        }

        const quantity =
            Number(item.quantity) || 1;

        subtotal +=
            product.price * quantity;

        itemCount += quantity;

    });


    /*
       Free delivery above ₹499
    */

    const delivery =
        subtotal >= 499
            ? 0
            : subtotal === 0
                ? 0
                : 40;


    const discount =
        Number(
            localStorage.getItem(
                "couponDiscount"
            )
        ) || 0;


    const total =
        Math.max(
            0,
            subtotal + delivery - discount
        );


    return {
        subtotal,
        delivery,
        discount,
        total,
        itemCount
    };

}


/* =========================================================
   RENDER PAYMENT SUMMARY
========================================================= */

function renderPaymentSummary() {

    const cart =
        getCart();


    const itemsContainer =
        document.getElementById(
            "paymentItems"
        );


    if (!itemsContainer) {
        return;
    }


    /*
       Empty cart
    */

    if (cart.length === 0) {

        itemsContainer.innerHTML = `
            <div class="empty-payment-cart">

                <span>
                    🛒
                </span>

                <p>
                    Your cart is empty.
                </p>

            </div>
        `;

        updatePaymentTotals(
            calculateTotals(cart)
        );

        return;

    }


    /*
       Render items
    */

    itemsContainer.innerHTML =
        cart.map(item => {

            const product =
                getProduct(item.id);

            if (!product) {
                return "";
            }


            const quantity =
                Number(item.quantity) || 1;


            const itemTotal =
                product.price *
                quantity;


            return `

                <div class="payment-item">

                    <div class="payment-item-info">

                        <span class="payment-item-emoji">
                            ${product.emoji}
                        </span>

                        <div>

                            <strong>
                                ${product.name}
                            </strong>

                            <small>
                                Qty: ${quantity}
                            </small>

                        </div>

                    </div>

                    <strong>
                        ₹${itemTotal}
                    </strong>

                </div>

            `;

        }).join("");


    const totals =
        calculateTotals(cart);


    updatePaymentTotals(
        totals
    );

}


/* =========================================================
   UPDATE TOTALS
========================================================= */

function updatePaymentTotals(
    totals
) {

    const itemCount =
        document.getElementById(
            "paymentItemCount"
        );

    const subtotal =
        document.getElementById(
            "paymentSubtotal"
        );

    const delivery =
        document.getElementById(
            "paymentDelivery"
        );

    const discount =
        document.getElementById(
            "paymentDiscount"
        );

    const total =
        document.getElementById(
            "paymentTotal"
        );


    if (itemCount) {

        itemCount.textContent =
            `${totals.itemCount} item${
                totals.itemCount !== 1
                    ? "s"
                    : ""
            }`;

    }


    if (subtotal) {

        subtotal.textContent =
            `₹${totals.subtotal}`;

    }


    if (delivery) {

        delivery.textContent =
            totals.delivery === 0
                ? "FREE"
                : `₹${totals.delivery}`;

    }


    if (discount) {

        discount.textContent =
            `-₹${totals.discount}`;

    }


    if (total) {

        total.textContent =
            `₹${totals.total}`;

    }

}


/* =========================================================
   PAYMENT METHODS
========================================================= */

function initializePaymentMethods() {

    const methods =
        document.querySelectorAll(
            ".payment-method"
        );


    const forms = {

        upi:
            document.getElementById(
                "upiForm"
            ),

        card:
            document.getElementById(
                "cardForm"
            ),

        netbanking:
            document.getElementById(
                "netbankingForm"
            ),

        cod:
            document.getElementById(
                "codForm"
            )

    };


    methods.forEach(method => {

        method.addEventListener(
            "click",
            function () {

                const selectedMethod =
                    this.dataset.method;


                /*
                   Remove active
                */

                methods.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                    const radio =
                        item.querySelector(
                            ".method-radio"
                        );

                    if (radio) {
                        radio.textContent = "○";
                    }

                });


                /*
                   Add active
                */

                this.classList.add(
                    "active"
                );


                const selectedRadio =
                    this.querySelector(
                        ".method-radio"
                    );

                if (selectedRadio) {

                    selectedRadio.textContent =
                        "●";

                }


                /*
                   Hide all forms
                */

                Object.values(forms)
                    .forEach(form => {

                        if (form) {

                            form.classList.add(
                                "hidden"
                            );

                        }

                    });


                /*
                   Show selected form
                */

                if (
                    forms[selectedMethod]
                ) {

                    forms[
                        selectedMethod
                    ].classList.remove(
                        "hidden"
                    );

                }

            }
        );

    });

}


/* =========================================================
   UPI
========================================================= */

function initializeUPI() {

    const verifyButton =
        document.getElementById(
            "verifyUpi"
        );

    const upiInput =
        document.getElementById(
            "upiId"
        );

    const message =
        document.getElementById(
            "upiMessage"
        );


    if (
        !verifyButton ||
        !upiInput ||
        !message
    ) {
        return;
    }


    verifyButton.addEventListener(
        "click",
        function () {

            const value =
                upiInput.value.trim();


            if (!value) {

                message.textContent =
                    "Please enter your UPI ID.";

                message.className =
                    "payment-message error";

                return;

            }


            const pattern =
                /^[\w.-]+@[\w.-]+$/;


            if (!pattern.test(value)) {

                message.textContent =
                    "Please enter a valid UPI ID.";

                message.className =
                    "payment-message error";

                return;

            }


            message.textContent =
                "✓ UPI ID verified successfully.";

            message.className =
                "payment-message success";

        }
    );

}


/* =========================================================
   CARD FORMATTING
========================================================= */

function initializeCard() {

    const cardNumber =
        document.getElementById(
            "cardNumber"
        );

    const cardExpiry =
        document.getElementById(
            "cardExpiry"
        );


    /*
       Card number
    */

    if (cardNumber) {

        cardNumber.addEventListener(
            "input",
            function () {

                let value =
                    this.value.replace(
                        /\D/g,
                        ""
                    );


                value =
                    value.substring(
                        0,
                        16
                    );


                value =
                    value.replace(
                        /(.{4})/g,
                        "$1 "
                    )
                    .trim();


                this.value =
                    value;

            }
        );

    }


    /*
       Expiry date
    */

    if (cardExpiry) {

        cardExpiry.addEventListener(
            "input",
            function () {

                let value =
                    this.value.replace(
                        /\D/g,
                        ""
                    );


                value =
                    value.substring(
                        0,
                        4
                    );


                if (
                    value.length >= 3
                ) {

                    value =
                        value.substring(
                            0,
                            2
                        )
                        + "/"
                        +
                        value.substring(
                            2
                        );

                }


                this.value =
                    value;

            }
        );

    }

}


/* =========================================================
   BUTTONS
========================================================= */

function initializeButtons() {

    const placeOrderButton =
        document.getElementById(
            "placeOrderBtn"
        );


    const terms =
        document.getElementById(
            "paymentTerms"
        );


    const backToCart =
        document.getElementById(
            "backToCart"
        );


    const continueShopping =
        document.getElementById(
            "continueShopping"
        );


    /*
       BACK TO CART
    */

    if (backToCart) {

        backToCart.addEventListener(
            "click",
            function () {

                window.location.href =
                    "../index.html";

            }
        );

    }


    /*
       PLACE ORDER
    */

    if (placeOrderButton) {

        placeOrderButton.addEventListener(
            "click",
            function () {

                placeOrder();

            }
        );

    }


    /*
       CONTINUE SHOPPING
    */

    if (continueShopping) {

        continueShopping.addEventListener(
            "click",
            function () {

                window.location.href =
                    "../index.html";

            }
        );

    }

}


/* =========================================================
   VALIDATE PAYMENT
========================================================= */

function validatePayment() {

    const activeMethod =
        document.querySelector(
            ".payment-method.active"
        );


    if (!activeMethod) {

        showToast(
            "Please select a payment method."
        );

        return false;

    }


    const method =
        activeMethod.dataset.method;


    /*
       UPI
    */

    if (method === "upi") {

        const upi =
            document.getElementById(
                "upiId"
            ).value.trim();


        const pattern =
            /^[\w.-]+@[\w.-]+$/;


        if (!pattern.test(upi)) {

            showToast(
                "Please enter a valid UPI ID."
            );

            return false;

        }

    }


    /*
       CARD
    */

    if (method === "card") {

        const number =
            document.getElementById(
                "cardNumber"
            ).value
                .replace(/\s/g, "");


        const expiry =
            document.getElementById(
                "cardExpiry"
            ).value.trim();


        const cvv =
            document.getElementById(
                "cardCvv"
            ).value.trim();


        const name =
            document.getElementById(
                "cardName"
            ).value.trim();


        if (number.length !== 16) {

            showToast(
                "Please enter a valid 16-digit card number."
            );

            return false;

        }


        if (
            !/^\d{2}\/\d{2}$/.test(
                expiry
            )
        ) {

            showToast(
                "Please enter a valid expiry date."
            );

            return false;

        }


        if (
            !/^\d{3}$/.test(cvv)
        ) {

            showToast(
                "Please enter a valid CVV."
            );

            return false;

        }


        if (!name) {

            showToast(
                "Please enter the name on card."
            );

            return false;

        }

    }


    /*
       NET BANKING
    */

    if (
        method === "netbanking"
    ) {

        const bank =
            document.getElementById(
                "bankSelect"
            ).value;


        if (!bank) {

            showToast(
                "Please select your bank."
            );

            return false;

        }

    }


    return true;

}


/* =========================================================
   PLACE ORDER
========================================================= */

function placeOrder() {

    const cart =
        getCart();


    if (cart.length === 0) {

        showToast(
            "Your cart is empty."
        );

        return;

    }


    const terms =
        document.getElementById(
            "paymentTerms"
        );


    if (!terms.checked) {

        showToast(
            "Please agree to Terms & Conditions."
        );

        return;

    }


    /*
       Validate payment
    */

    if (!validatePayment()) {
        return;
    }


    const button =
        document.getElementById(
            "placeOrderBtn"
        );


    button.disabled =
        true;


    button.textContent =
        "Processing Order...";


    /*
       Get payment method
    */

    const activeMethod =
        document.querySelector(
            ".payment-method.active"
        );


    const paymentMethod =
        activeMethod.dataset.method;


    const totals =
        calculateTotals(cart);


    /*
       Generate Order ID
    */

    const orderId =
        "FB" +
        Date.now()
            .toString()
            .slice(-9);


    /*
       Create order
    */

    const order = {

        id: orderId,

        date:
            new Date()
                .toLocaleString(),

        status:
            "Order Confirmed",

        paymentMethod:
            paymentMethod,

        paymentStatus:
            paymentMethod === "cod"
                ? "Cash on Delivery"
                : "Paid",

        items:
            cart,

        subtotal:
            totals.subtotal,

        delivery:
            totals.delivery,

        discount:
            totals.discount,

        total:
            totals.total

    };


    /*
       Save order
    */

    const orders =
        JSON.parse(
            localStorage.getItem(
                "orders"
            )
        ) || [];


    orders.push(order);


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    /*
       Clear cart
    */

    localStorage.removeItem(
        "freshcartCart"
    );


    localStorage.removeItem(
        "couponDiscount"
    );


    /*
       Show success popup
    */

    setTimeout(
        function () {

            showOrderSuccess(
                orderId
            );

        },
        1000
    );

}


/* =========================================================
   ORDER SUCCESS
========================================================= */

function showOrderSuccess(
    orderId
) {

    const overlay =
        document.getElementById(
            "successOverlay"
        );


    const orderIdElement =
        document.getElementById(
            "successOrderId"
        );


    if (orderIdElement) {

        orderIdElement.textContent =
            orderId;

    }


    if (overlay) {

        overlay.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   TOAST
========================================================= */

function showToast(
    message
) {

    const toast =
        document.getElementById(
            "toast"
        );


    const toastMessage =
        document.getElementById(
            "toastMessage"
        );


    if (!toast) {
        alert(message);
        return;
    }


    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        3000
    );

}
