const CHECKOUT_CART_KEY = "cart";

document.addEventListener("DOMContentLoaded", () => {
    renderCheckout();
    initializePaymentMethods();
    initializeCheckout();
});

window.addEventListener("productsLoaded", renderCheckout);

function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    if (!toast || !toastMessage) {
        alert(message);
        return;
    }
    toastMessage.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 3000);
}

function getCheckoutCart() {
    try {
        const standardCart = JSON.parse(localStorage.getItem(CHECKOUT_CART_KEY)) || [];
        const homeCart = JSON.parse(localStorage.getItem("freshcartCart")) || [];
        const cart = homeCart.length ? homeCart : standardCart;
        if (cart.length && JSON.stringify(cart) !== JSON.stringify(standardCart)) {
            localStorage.setItem(CHECKOUT_CART_KEY, JSON.stringify(cart));
        }
        return cart;
    } catch (error) {
        return [];
    }
}

function getCheckoutTotals(cart) {
    const subtotal = cart.reduce((sum, item) => {
        const product = getCheckoutProduct(item);
        return sum + (product ? Number(product.price) * (Number(item.quantity) || 1) : 0);
    }, 0);
    const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 40;
    return { subtotal, delivery, total: subtotal + delivery };
}

function getCheckoutProduct(item) {
    let catalog = typeof products !== "undefined" ? products : [];
    if (!catalog.length) {
        try {
            catalog = JSON.parse(localStorage.getItem("freshBasketProductCatalog")) || [];
        } catch (error) {
            catalog = [];
        }
    }
    const product = catalog.find(itemProduct => Number(itemProduct.id) === Number(item.id));
    return product || (item.price ? { id: item.id, name: item.name || "Product", price: Number(item.price), emoji: item.emoji } : null);
}

function renderCheckout() {
    const container = document.getElementById("checkoutItems");
    if (!container) return;

    const cart = getCheckoutCart();
    const totals = getCheckoutTotals(cart);

    container.innerHTML = cart.map(item => {
        const product = getCheckoutProduct(item);
        if (!product) return "";
        const quantity = Number(item.quantity) || 1;
        return `<div class="checkout-item"><span>${product.emoji || "🛒"} ${product.name} × ${quantity}<small> ₹${product.price} each</small></span><strong>₹${product.price * quantity}</strong></div>`;
    }).join("") || (cart.length ? "<p>Loading product prices...</p>" : "<p>Your cart is empty. Add products before checkout.</p>");

    document.getElementById("checkoutSubtotal").textContent = `₹${totals.subtotal}`;
    document.getElementById("checkoutDelivery").textContent = totals.delivery ? `₹${totals.delivery}` : "FREE";
    document.getElementById("checkoutTotal").textContent = `₹${totals.total}`;
}

function initializePaymentMethods() {
    const methods = document.querySelectorAll(".payment-method");
    const detailSections = document.querySelectorAll(".payment-details");

    methods.forEach(method => {
        const radio = method.querySelector('input[name="payment"]');
        if (!radio) return;

        const selectMethod = () => {
            methods.forEach(item => item.classList.remove("active"));
            method.classList.add("active");
            radio.checked = true;

            detailSections.forEach(section => section.classList.add("hidden"));
            const selectedDetails = document.getElementById(`${radio.value}Details`);
            if (selectedDetails) selectedDetails.classList.remove("hidden");
        };

        method.addEventListener("click", selectMethod);
        radio.addEventListener("change", selectMethod);
    });

    const selected = document.querySelector('.payment-method input[name="payment"]:checked');
    if (selected) selected.closest(".payment-method").click();
}

function getSelectedPayment(form) {
    const selected = form.querySelector('input[name="payment"]:checked');
    return selected ? selected.value : "";
}

function validatePayment(form, paymentMethod) {
    if (paymentMethod === "upi") {
        const upiId = form.querySelector("#upiId").value.trim();
        if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
            showToast("Enter a valid UPI ID, for example phonepe@upi");
            return false;
        }
    }

    if (paymentMethod === "card") {
        const cardNumber = form.querySelector("#cardNumber").value.replace(/\s/g, "");
        const expiry = form.querySelector("#expiryDate").value.trim();
        const cvv = form.querySelector("#cvv").value.trim();
        if (cardNumber.length !== 16 || !/^\d{2}\/\d{2}$/.test(expiry) || cvv.length !== 3) {
            showToast("Enter valid card details before placing the order");
            return false;
        }
    }

    if (paymentMethod === "netbanking" && !form.querySelector("#bankSelect").value) {
        showToast("Select your bank before placing the order");
        return false;
    }

    return true;
}

function buildPreviewOrder(cart, formData, paymentMethod) {
    const totals = getCheckoutTotals(cart);
    return {
        id: `FB${Date.now().toString().slice(-9)}`,
        createdAt: new Date().toISOString(),
        status: "Confirmed",
        paymentStatus: paymentMethod === "cod" ? "Pay on delivery" : "Paid",
        paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Online payment",
        address: {
            name: formData.get("name"), phone: formData.get("phone"), line1: formData.get("line1"),
            city: formData.get("city"), pincode: formData.get("pincode")
        },
        items: cart.map(item => {
            const product = getCheckoutProduct(item);
            const quantity = Number(item.quantity) || 1;
            return { name: product.name, quantity, price: product.price, total: product.price * quantity };
        }),
        ...totals
    };
}

function finishOrder(order, preview = false) {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    if (preview) localStorage.setItem("freshBasketPreviewReceipt", JSON.stringify(order));
    localStorage.removeItem(CHECKOUT_CART_KEY);
    localStorage.removeItem("freshcartCart");
    localStorage.removeItem("couponDiscount");
    alert(`Order placed successfully!\nOrder ID: ${order.id}\nTotal paid: ₹${order.total}`);
    window.location.href = `receipt.html?order=${encodeURIComponent(order.id)}`;
}

function initializeCheckout() {
    const form = document.getElementById("checkoutForm");
    if (!form) return;

    form.addEventListener("submit", async event => {
        event.preventDefault();
        const cart = getCheckoutCart();
        if (!cart.length) return showToast("Your cart is empty");

        const paymentMethod = getSelectedPayment(form);
        if (!validatePayment(form, paymentMethod)) return;

        const formData = new FormData(form);
        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        button.textContent = "Processing order...";

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cart,
                    paymentMethod: paymentMethod === "cod" ? "cod" : "online",
                    address: Object.fromEntries(["name", "phone", "line1", "city", "pincode"].map(field => [field, formData.get(field)]))
                })
            });
            if (response.status === 404 || response.status === 405) {
                finishOrder(buildPreviewOrder(cart, formData, paymentMethod), true);
                return;
            }
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Unable to place your order.");
            finishOrder(result.order);
        } catch (error) {
            if (error instanceof TypeError) {
                finishOrder(buildPreviewOrder(cart, formData, paymentMethod), true);
                return;
            }
            showToast(error.message);
            button.disabled = false;
            button.textContent = "Place Order";
        }
    });
}
