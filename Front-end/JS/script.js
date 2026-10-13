const freshCartPage = document.body.dataset.page || "home";

if (freshCartPage === "home") {

/* =====================================================
   FRESHCART
   MAIN JAVASCRIPT (HOME PAGE)
===================================================== */


/* =====================================================
   SECTION 1 → PRODUCT DATA
===================================================== */

let images = [
    "images/banners/images-11.jpg",
    "images/banners/images-12.jpg",
    "images/banners/images-10.jpg",
    "images/banners/images-4.jpg",
    "images/banners/image-5.jpg",
    "images/banners/images-6.jpg",
    "images/banners/images-7.jpg",
    "images/banners/images-8.jpg",
    "images/banners/images-9.jpg"
];

let i = 0;

setInterval(() => {
  i = (i + 1) % images.length;
  const sliderImage = document.getElementById("image");
  if (sliderImage) sliderImage.src = images[i];
}, 2000);


const products = [

    { id: 1, name: "Fresh Red Apples", category: "Fruits & Vegetables", weight: "1 kg", price: 99, originalPrice: 140, discount: 29, rating: 4.5,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx-ZyNfFC85LvZNklTNVr-NMEUWC0IYhFthVIFU06NmQ&s=10" },

    { id: 2, name: "Fresh Bananas", category: "Fruits & Vegetables", weight: "1 dozen", price: 59, originalPrice: 75, discount: 21, rating: 4.6,
      image: "https://png.pngtree.com/png-clipart/20220716/ourmid/pngtree-banana-yellow-fruit-banana-skewers-png-image_5944324.png" },

    { id: 3, name: "Fresh Tomatoes", category: "Fruits & Vegetables", weight: "1 kg", price: 49, originalPrice: 70, discount: 30, rating: 4.4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpJYdNPFlUEo5r_F7dVbbt3NtSEPnFri9dDkJdob3zKg&s=10" },

    { id: 4, name: "Fresh Milk", category: "Dairy & Bakery", weight: "1 litre", price: 58, originalPrice: 65, discount: 11, rating: 4.7,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS-RVjNRGss4euf4UngJ7L_05O-t9abFeJZHEW4pnNhQ&s=10" },

    { id: 5, name: "Whole Wheat Bread", category: "Dairy & Bakery", weight: "400 g", price: 45, originalPrice: 55, discount: 18, rating: 4.3,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz1Vc5tcdgbuHHsTwudtG_kZ4DKRMRL2ooMCf3EouWNw&s=10" },

    { id: 6, name: "Farm Fresh Butter", category: "Dairy & Bakery", weight: "500 g", price: 245, originalPrice: 280, discount: 13, rating: 4.5,
      image: "https://png.pngtree.com/png-vector/20240616/ourmid/pngtree-farm-fresh-flavor-organic-butter-delicacies-png-image_12748931.png" },

    { id: 7, name: "Premium Basmati Rice", category: "Staples", weight: "5 kg", price: 399, originalPrice: 520, discount: 23, rating: 4.6,
      image: "https://png.pngtree.com/png-vector/20250524/ourmid/pngtree-basmati-rice-pile-isolated-on-white-background-png-image_16366185.png" },

    { id: 8, name: "Toor Dal", category: "Staples", weight: "1 kg", price: 149, originalPrice: 190, discount: 22, rating: 4.5,
      image: "images/products1/Toor-daal.jpg" },

    { id: 9, name: "Wheat Flour", category: "Staples", weight: "5 kg", price: 265, originalPrice: 320, discount: 17, rating: 4.4,
      image: "https://png.pngtree.com/png-clipart/20240905/original/pngtree-wheat-flour-and-grains-png-image_15943858.png" },

    { id: 10, name: "Chocolate Cookies", category: "Snacks", weight: "200 g", price: 75, originalPrice: 95, discount: 21, rating: 4.7,
      image: "https://png.pngtree.com/png-clipart/20240327/original/pngtree-cute-chocolate-chip-cookie-png-image_14689318.png" },

    { id: 11, name: "Potato Chips", category: "Snacks", weight: "100 g", price: 35, originalPrice: 40, discount: 13, rating: 4.2,
      image: "https://png.pngtree.com/png-clipart/20240718/original/pngtree-a-bowl-of-potato-chips-on-transparent-background-png-image_15582709.png" },

    { id: 12, name: "Mixed Fruit Juice", category: "Beverages", weight: "1 litre", price: 110, originalPrice: 135, discount: 19, rating: 4.4,
      image: "images/Beverages/Mixed Fruit Juice.png" },

    { id: 13, name: "Orange Juice", category: "Beverages", weight: "1 litre", price: 125, originalPrice: 150, discount: 17, rating: 4.5,
      image: "images/Beverages/Orange Juice.png" },

    { id: 14, name: "Organic Honey", category: "Staples", weight: "500 g", price: 210, originalPrice: 280, discount: 25, rating: 4.8,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8oQBD21U9rI1BwkGVnZpMQ2S6q4fcnLR8SD0kMbrJBkVrOFpQ6ZZ88i8d&s=10" },

    { id: 15, name: "Hand Wash", category: "Personal Care", weight: "250 ml", price: 99, originalPrice: 130, discount: 24, rating: 4.3,
      image: "https://www.pngitem.com/pimgs/m/77-771924_transparent-soaps-washing-dettol-liquid-hand-wash-hd.png" },

    { id: 16, name: "Dishwashing Liquid", category: "Household", weight: "500 ml", price: 89, originalPrice: 110, discount: 19, rating: 4.4,
      image: "https://static.vecteezy.com/system/resources/thumbnails/066/666/036/small/dish-soap-bottle-with-lemon-scent-clear-plastic-container-no-background-clipping-path-png.png" },

    { id: 17, name: "Green Spinach", category: "Fruits & Vegetables", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Fruits & Vegetables/Green Spinach.png" },

    { id: 18, name: "Green Grapes", category: "Fruits & Vegetables", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Fruits & Vegetables/Green Grapes.jpg" },

    { id: 19, name: "Fresh Orange", category: "Fruits & Vegetables", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Fruits & Vegetables/Fresh Orange.png" },

    { id: 20, name: "Baby Potatoes", category: "Fruits & Vegetables", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Fruits & Vegetables/Baby-Potatoes.jpg" },

    { id: 21, name: "Crisp Carrots", category: "Fruits & Vegetables", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Fruits & Vegetables/Crisp-Carrots.jpg" },

    { id: 22, name: "Fresh Onions", category: "Fruits & Vegetables", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Fruits & Vegetables/Fresh-Onions.jpg" },

    { id: 50, name: "strawberry", category: "Fruits & Vegetables", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Fruits & Vegetables/strawberry.png" },

    { id: 51, name: "Kevi", category: "Fruits & Vegetables", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Fruits & Vegetables/kevi.png" },

    { id: 52, name: "Dragon", category: "Fruits & Vegetables", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Fruits & Vegetables/Dragon.jpg" },

    { id: 23, name: "Greek Yogurt", category: "Dairy & Bakery", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Dairy & Bakery/Greek Yogur.jpg" },

    { id: 24, name: "Paneer Cubes", category: "Dairy & Bakery", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Dairy & Bakery/Paneer Cubes1.png" },

    { id: 25, name: "Cheddar Cheese", category: "Dairy & Bakery", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Dairy & Bakery/Cheddar Cheese1.png" },

    { id: 26, name: "Brown Bread", category: "Dairy & Bakery", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Dairy & Bakery/Brown Bread.jpg" },

    { id: 27, name: "Eggs", category: "Dairy & Bakery", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Dairy & Bakery/Eggs.jpg" },

    { id: 28, name: "Chocolate Muffins", category: "Dairy & Bakery", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Dairy & Bakery/Chocolate Muffins1.png" },

    { id: 29, name: "Cheese Slices", category: "Dairy & Bakery", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Dairy & Bakery/Cheese Slices.jpg" },

    { id: 30, name: "Chana Dal", category: "Staples", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Staples/Chana Dal1.png" },

    { id: 31, name: "Moong Dal", category: "Staples", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Staples/Moong Dal1.png" },

    { id: 32, name: "Sugar", category: "Staples", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Staples/Sugar1.png" },

    { id: 33, name: "Iodized Salt", category: "Staples", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Staples/Iodized Salt1.png" },

    { id: 34, name: "Sunflower Oil", category: "Staples", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Staples/Sunflower Oil1.png" },

    { id: 34, name: "Poha", category: "Staples", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Staples/Poha1.png" },

    { id: 35, name: "Salted Peanuts", category: "Snacks", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Snacks/Salted Peanuts1.png" },

    { id: 36, name: "Masala Namkeen", category: "Snacks", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Snacks/Masala Namkeen.jpg" },

    { id: 37, name: "Roasted Makhana", category: "Snacks", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Snacks/Roasted Makhana.jpg" },

    { id: 38, name: "Nacho Chips", category: "Snacks", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Snacks/Nacho Chips1.png" },

    { id: 39, name: "Butter Popcorn", category: "Snacks", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Snacks/Butter Popcorn1.png" },

    { id: 40, name: "Oat Biscuits", category: "Snacks", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Snacks/Oat Biscuits.png" },

    { id: 41, name: "Choco Wafer", category: "Snacks", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Snacks/Choco Wafer.jpg" },

    { id: 42, name: "Trail Mix", category: "Snacks", weight: "500 g", price: 110, originalPrice: 145, discount: 24, rating: 4.5,
      image: "images/Snacks/Trail Mix.jpg" },

    /* BEVERAGES */
    { id: 43, name: "Mango Drink", category: "Beverages", weight: "1 litre", price: 99, originalPrice: 120, discount: 18, rating: 4.4,
      image: "images/Beverages/Mango Drink1.png" },

    { id: 44, name: "Lemon Soda", category: "Beverages", weight: "750 ml", price: 65, originalPrice: 80, discount: 19, rating: 4.3,
      image: "images/Beverages/Lemon Soda1.png" },

    { id: 45, name: "Cold Coffee", category: "Beverages", weight: "250 ml", price: 75, originalPrice: 95, discount: 21, rating: 4.5,
      image: "images/Beverages/Cold Coffee1.png" },

    { id: 46, name: "Green Tea", category: "Beverages", weight: "25 bags", price: 135, originalPrice: 170, discount: 21, rating: 4.6,
      image: "images/Beverages/Green Tea.jpg" },

    { id: 47, name: "Mineral Water", category: "Beverages", weight: "1 litre", price: 20, originalPrice: 25, discount: 20, rating: 4.3,
      image: "images/Beverages/Mineral Water1.png" },

    { id: 48, name: "Coconut Water", category: "Beverages", weight: "300 ml", price: 48, originalPrice: 60, discount: 20, rating: 4.5,
      image: "images/Beverages/Coconut Water.jpg" },

    { id: 49, name: "Cola Soft Drink", category: "Beverages", weight: "750 ml", price: 45, originalPrice: 55, discount: 18, rating: 4.2,
      image: "images/Beverages/Cola Soft Drink.png" },

    { id: 49, name: "Apple Juice", category: "Beverages", weight: "1 litre", price: 115, originalPrice: 140, discount: 18, rating: 4.5,
      image: "images/Beverages/Apple Juice1.png" }

];


/* =====================================================
   SECTION 2 → STATE
===================================================== */

const additionalProductDetails = [];

const categoryImages = {
    "Fruits & Vegetables": products[0].image, "Dairy & Bakery": products[3].image,
    "Snacks": products[9].image, "Beverages": products[11].image, "Staples": products[6].image
};

products.push(...additionalProductDetails.map((details, index) => ({
    id: products.length + index + 1, name: details[0], category: details[1], weight: details[2],
    price: details[3], originalPrice: details[4], discount: details[5], rating: details[6],
    image: categoryImages[details[1]]
})));


let cart = JSON.parse(localStorage.getItem("freshcartCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("freshcartWishlist")) || [];
let currentFilter = "All";
let currentSearch = "";
let isWishlistView = false;

/* Coupon is stored so it survives the trip to pages/checkout.html */
let couponDiscount = Number(localStorage.getItem("freshcartCoupon")) || 0;


/* =====================================================
   SECTION 3 → DOM ELEMENTS
===================================================== */

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchSuggestions = document.getElementById("searchSuggestions");
const searchResultInfo = document.getElementById("searchResultInfo");
const noProducts = document.getElementById("noProducts");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const wishlistCount = document.getElementById("wishlistCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");
const deliveryCharge = document.getElementById("deliveryCharge");
const emptyCart = document.getElementById("emptyCart");
const cartSummary = document.getElementById("cartSummary");


/* =====================================================
   SECTION 4 → FORMAT CURRENCY
===================================================== */

function formatPrice(price) {
    return "₹" + Number(price).toLocaleString("en-IN");
}


/* =====================================================
   SECTION 5 → SAVE DATA
===================================================== */

function saveCart() {
    const savedCart = JSON.stringify(cart);
    localStorage.setItem("freshcartCart", savedCart);
    localStorage.setItem("cart", savedCart);
}

function saveWishlist() {
    localStorage.setItem("freshcartWishlist", JSON.stringify(wishlist));
}

function saveCoupon() {
    localStorage.setItem("freshcartCoupon", String(couponDiscount));
}


/* =====================================================
   SECTION 6 → DISPLAY PRODUCTS
===================================================== */

function displayProducts() {

    localStorage.setItem(
        "freshBasketProductCatalog",
        JSON.stringify(products)
    );

    isWishlistView = false;

    let filteredProducts = products.filter(product => {

        const matchesFilter =
            currentFilter === "All" ||
            product.category === currentFilter;

        const term = currentSearch.toLowerCase().trim();

        const matchesSearch =
            !term ||
            product.name.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term);

        return matchesFilter && matchesSearch;
    });

    productGrid.innerHTML = "";

    if (filteredProducts.length === 0) {
        noProducts.style.display = "block";
        searchResultInfo.textContent = "No products found.";
        return;
    }

    noProducts.style.display = "none";

    searchResultInfo.textContent = currentSearch
        ? `${filteredProducts.length} product(s) found for "${currentSearch}"`
        : `${filteredProducts.length} products`;

    filteredProducts.forEach(product => {
        productGrid.innerHTML += createProductCard(product);
    });
}


/* =====================================================
   SECTION 7 → PRODUCT CARD
===================================================== */

function createProductCard(product) {

    const isWishlisted = wishlist.includes(product.id);

    return `
        <article class="product-card" data-id="${product.id}">

            <div class="product-image">

                <img src="${product.image}" alt="${product.name}" loading="lazy">

                <span class="discount-badge">${product.discount}% OFF</span>

                <button
                    class="wishlist-btn ${isWishlisted ? "active" : ""}"
                    onclick="toggleWishlist(${product.id})"
                >
                    ${isWishlisted ? "♥" : "♡"}
                </button>

                <button
                    class="quick-view-btn"
                    onclick="openProductModal(${product.id})"
                >
                    Quick View
                </button>

            </div>

            <div class="product-info">

                <span class="product-category">${product.category}</span>

                <h3 class="product-name">${product.name}</h3>

                <div class="product-rating">⭐ ${product.rating} · ${product.weight}</div>

                <div class="product-price">
                    <strong>${formatPrice(product.price)}</strong>
                    <del>${formatPrice(product.originalPrice)}</del>
                </div>

                <div class="product-card-actions">

                    <button class="add-cart-btn" onclick="addToCart(${product.id})">
                        + Add
                    </button>

                    <button class="buy-now-btn" onclick="buyNow(${product.id})">
                        Buy Now
                    </button>

                </div>

            </div>

        </article>
    `;
}


/* =====================================================
   SECTION 8 → SEARCH
===================================================== */

function performSearch() {

    currentSearch = searchInput.value;
    currentFilter = "All";

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.filter === "All") btn.classList.add("active");
    });

    displayProducts();

    searchSuggestions.style.display = "none";
}

searchButton.addEventListener("click", performSearch);

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") performSearch();
});


/* =====================================================
   SECTION 9 → LIVE SEARCH SUGGESTIONS
===================================================== */

searchInput.addEventListener("input", () => {

    const term = searchInput.value.toLowerCase().trim();

    if (!term) {
        searchSuggestions.style.display = "none";
        return;
    }

    const matches = products
        .filter(product => product.name.toLowerCase().includes(term))
        .slice(0, 5);

    if (!matches.length) {
        searchSuggestions.style.display = "none";
        return;
    }

    searchSuggestions.innerHTML = matches.map(product => `
        <div class="search-suggestion" onclick="selectSuggestion('${product.name}')">
            🔎 ${product.name}
        </div>
    `).join("");

    searchSuggestions.style.display = "block";
});

function selectSuggestion(name) {
    searchInput.value = name;
    performSearch();
}


/* =====================================================
   SECTION 10 → CATEGORY FILTER
===================================================== */

document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {

        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        currentFilter = button.dataset.filter;
        currentSearch = "";
        searchInput.value = "";

        displayProducts();
    });
});


/* =====================================================
   SECTION 11 → CATEGORY CARD
===================================================== */

document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {

        const category = card.dataset.category;

        currentFilter = category;
        currentSearch = "";
        searchInput.value = "";

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.remove("active");
            if (btn.dataset.filter === category) btn.classList.add("active");
        });

        document.getElementById("products").scrollIntoView({ behavior: "smooth" });

        displayProducts();
    });
});


/* =====================================================
   SECTION 12 → ADD TO CART
   Adds the product, shows a toast, AND opens the Quick
   View modal for that product with an "Added to cart"
   confirmation banner + full product details.
===================================================== */

function addToCart(productId) {

    const product = products.find(item => item.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);

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

    saveCart();
    updateCart();

    showToast(`✅ ${product.name} added to basket successfully!`);

    openProductModal(productId, true);
}


/* =====================================================
   BUY NOW
   Sets the basket to just this product and takes the
   shopper straight to the dedicated checkout page
   (pages/checkout.html), which contains BOTH the address
   form and the payment method selection.
===================================================== */
/* =====================================================
   BUY NOW
   Selected product -> Checkout page
===================================================== */

/* =====================================================
   BUY NOW
   PRODUCT → CHECKOUT
===================================================== */

function buyNow(productId) {

    // Convert ID to number so it matches product data
    productId = Number(productId);

    // Find selected product
    const product = products.find(
        item => Number(item.id) === productId
    );

    // Product not found
    if (!product) {
        alert("Product not found!");
        return;
    }

    // Create ONLY the selected product for Buy Now
    const buyNowItem = {
        id: product.id,
        quantity: 1,
        price: product.price,
        name: product.name,
        emoji: product.emoji
    };

    // Save Buy Now product separately
    localStorage.setItem(
        "freshcartBuyNow",
        JSON.stringify(buyNowItem)
    );

    // Also save it as cart so checkout can use it
    localStorage.setItem(
        "freshcartCart",
        JSON.stringify([buyNowItem])
    );

    localStorage.setItem(
        "cart",
        JSON.stringify([buyNowItem])
    );

    // Remove old order information
    localStorage.removeItem("currentOrder");

    // Remove old checkout mode
    localStorage.setItem(
        "freshcartCheckoutMode",
        "buyNow"
    );

    // IMPORTANT:
    // Works from both index.html and nested pages.
    const checkoutPath = window.location.pathname.includes("/pages/")
        ? "checkout.html"
        : "pages/checkout.html";

    window.location.href = checkoutPath;
}




/* =====================================================
   SECTION 13 → CART UPDATE
===================================================== */

function updateCart() {

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    cartCount.textContent = totalItems;

    renderCart();

    updateWishlistCount();
}


/* =====================================================
   SECTION 14 → RENDER CART
===================================================== */

function renderCart() {

    if (!cart.length) {
        emptyCart.style.display = "block";
        cartSummary.style.display = "none";
        cartItems.innerHTML = "";
        return;
    }

    emptyCart.style.display = "none";
    cartSummary.style.display = "block";

    cartItems.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item => {

        const product = products.find(p => p.id === item.id);
        if (!product) return;

        subtotal += product.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${product.image}" class="cart-item-image" alt="${product.name}">

                <div>

                    <h4>${product.name}</h4>

                    <span>${product.weight}</span>

                    <div class="cart-item-price">${formatPrice(product.price)}</div>

                    <div class="quantity-controls">

                        <button onclick="changeQuantity(${product.id}, -1)">−</button>

                        <strong>${item.quantity}</strong>

                        <button onclick="changeQuantity(${product.id}, 1)">+</button>

                    </div>

                </div>

                <button class="remove-item" onclick="removeFromCart(${product.id})">
                    Remove
                </button>

            </div>
        `;
    });

    cartSubtotal.textContent = formatPrice(subtotal);

    let delivery = 0;

    if (subtotal > 0 && subtotal < 999) {
        delivery = 40;
        deliveryCharge.textContent = formatPrice(delivery);
    } else {
        deliveryCharge.textContent = "FREE";
    }

    const total = Math.max(0, subtotal + delivery - couponDiscount);

    cartTotal.textContent = formatPrice(total);
}


/* =====================================================
   SECTION 15 → QUANTITY
===================================================== */

function changeQuantity(productId, amount) {

    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    saveCart();
    updateCart();
}


/* =====================================================
   SECTION 16 → REMOVE CART ITEM
===================================================== */

function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    saveCart();
    updateCart();

    showToast("Product removed from basket");
}


/* =====================================================
   SECTION 17 → OPEN / CLOSE CART SIDEBAR
===================================================== */

function openCart() {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
}

function closeCart() {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
}

document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);


/* =====================================================
   SECTION 18 → WISHLIST
===================================================== */

function toggleWishlist(productId) {

    const product = products.find(p => p.id === productId);

    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        showToast(`${product.name} removed from wishlist`);
    } else {
        wishlist.push(productId);
        showToast(`${product.name} added to wishlist`);
    }

    saveWishlist();
    updateWishlistCount();

    if (isWishlistView) {
        renderWishlistProducts();
    } else {
        displayProducts();
    }
}

function updateWishlistCount() {
    wishlistCount.textContent = wishlist.length;
}

function renderWishlistProducts() {

    isWishlistView = true;
    currentSearch = "";

    const wishlistProducts = products.filter(product => wishlist.includes(product.id));

    productGrid.innerHTML = wishlistProducts.map(createProductCard).join("");

    searchResultInfo.textContent = wishlistProducts.length
        ? `${wishlistProducts.length} wishlist product(s)`
        : "Your wishlist is empty.";

    noProducts.style.display = wishlistProducts.length ? "none" : "block";
}

document.getElementById("wishlistHeaderBtn").addEventListener("click", () => {
    renderWishlistProducts();
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});


/* =====================================================
   SECTION 19 → PRODUCT MODAL (QUICK VIEW)

   justAdded = true  → shows a green "Added to cart"
   confirmation banner at the top (used by addToCart()).
   justAdded = false → plain quick view (used by the
   "Quick View" button on each product card).
===================================================== */

const productModal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");

function openProductModal(productId, justAdded = false) {

    const product = products.find(p => p.id === productId);
    if (!product) return;

    const inCartQty =
        (cart.find(item => item.id === productId) || {}).quantity || 0;

    modalContent.innerHTML = `

        ${justAdded ? `
            <div style="
                display:flex;
                align-items:center;
                gap:10px;
                background:#eafaf0;
                border:1px solid #34c759;
                color:#1e7e34;
                font-weight:700;
                padding:12px 16px;
                border-radius:12px;
                margin-bottom:20px;
            ">
                <span style="font-size:20px;">✅</span>
                <span>${product.name} added to your basket successfully!</span>
            </div>
        ` : ""}

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:center;">

            <img
                src="${product.image}"
                alt="${product.name}"
                style="width:100%;height:350px;object-fit:cover;border-radius:15px;"
            >

            <div>

                <span style="color:#6b7280;font-size:12px;">${product.category}</span>

                <h2 style="margin:10px 0;font-size:30px;">${product.name}</h2>

                <p>⭐ ${product.rating}</p>

                <p style="color:#6b7280;margin:15px 0;">${product.weight}</p>

                <div style="font-size:25px;font-weight:800;">
                    ${formatPrice(product.price)}
                    <del style="color:#9ca3af;font-size:15px;margin-left:8px;">
                        ${formatPrice(product.originalPrice)}
                    </del>
                </div>

                <p style="margin:15px 0;color:#6b7280;">
                    Fresh, high-quality product selected for your everyday needs.
                </p>

                ${inCartQty > 0 ? `
                    <p style="margin:0 0 15px;color:#1e7e34;font-weight:600;">
                        🛒 ${inCartQty} in your basket
                    </p>
                ` : ""}

                <div style="display:flex;gap:10px;">

                    <button class="primary-btn" onclick="addToCart(${product.id})">
                        ${inCartQty > 0 ? "+ Add One More" : "Add to Basket"}
                    </button>

                    <button class="buy-now-btn" style="flex:1;" onclick="buyNow(${product.id})">
                        Buy Now
                    </button>

                </div>

            </div>

        </div>
    `;

    productModal.classList.add("active");
}

function closeProductModal() {
    productModal.classList.remove("active");
}

document.getElementById("modalClose").addEventListener("click", closeProductModal);

productModal.addEventListener("click", event => {
    if (event.target === productModal) closeProductModal();
});


/* =====================================================
   SECTION 20 → COUPON
===================================================== */

document.getElementById("applyCoupon").addEventListener("click", applyCoupon);

function applyCoupon() {

    const input = document.getElementById("couponInput");
    const message = document.getElementById("couponMessage");

    const coupon = input.value.trim().toUpperCase();

    const subtotal = cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);

    if (coupon === "SAVE100" && subtotal >= 499) {
        couponDiscount = 100;
        message.textContent = "✓ ₹100 discount applied";
        message.style.color = "#5c9215";
        saveCoupon();
        renderCart();
        showToast("Coupon applied successfully");
        return;
    }

    if (coupon === "FRESH50" && subtotal >= 299) {
        couponDiscount = 50;
        message.textContent = "✓ ₹50 discount applied";
        message.style.color = "#5c9215";
        saveCoupon();
        renderCart();
        showToast("Coupon applied successfully");
        return;
    }

    couponDiscount = 0;
    saveCoupon();
    message.textContent = "Invalid coupon or minimum order not reached";
    message.style.color = "#ef4444";
    renderCart();
}


/* =====================================================
   SECTION 21 → TOAST
===================================================== */

let toastTimer;

function showToast(message) {

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    toastMessage.textContent = message;

    toast.classList.add("active");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("active");
    }, 2500);
}


/* =====================================================
   SECTION 22 → DEAL TIMER
===================================================== */

let dealTime = 8 * 60 * 60;

function updateDealTimer() {

    const hours = Math.floor(dealTime / 3600);
    const minutes = Math.floor((dealTime % 3600) / 60);
    const seconds = dealTime % 60;

    document.getElementById("dealTimer").textContent =
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (dealTime > 0) dealTime--;
}

setInterval(updateDealTimer, 1000);
updateDealTimer();


/* =====================================================
   SECTION 23 → NEWSLETTER
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterEmail = document.getElementById("newsletterEmail");
    const newsletterButton = document.getElementById("newsletterButton");
    const newsletterMessage = document.getElementById("newsletterMessage");

    if (!newsletterForm) return;

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = newsletterEmail.value.trim().toLowerCase();

        if (newsletterMessage) {
            newsletterMessage.textContent = "";
            newsletterMessage.className = "newsletter-message";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            if (newsletterMessage) {
                newsletterMessage.textContent = "Please enter a valid email address.";
                newsletterMessage.classList.add("error");
            }
            newsletterEmail.focus();
            return;
        }

        if (newsletterButton) {
            newsletterButton.textContent = "Subscribing...";
            newsletterButton.classList.add("loading");
        }

        let subscribers = JSON.parse(localStorage.getItem("newsletterSubscribers")) || [];

        const alreadySubscribed = subscribers.includes(email);

        if (alreadySubscribed) {
            setTimeout(function () {
                if (newsletterButton) {
                    newsletterButton.textContent = "Subscribe";
                    newsletterButton.classList.remove("loading");
                }
                if (newsletterMessage) {
                    newsletterMessage.textContent = "You are already subscribed!";
                    newsletterMessage.classList.add("success");
                }
            }, 600);
            return;
        }

        subscribers.push(email);

        localStorage.setItem("newsletterSubscribers", JSON.stringify(subscribers));

        setTimeout(function () {
            if (newsletterButton) {
                newsletterButton.textContent = "Subscribed ✓";
                newsletterButton.classList.remove("loading");
            }
            if (newsletterMessage) {
                newsletterMessage.textContent = "Thank you! You have subscribed successfully.";
                newsletterMessage.classList.add("success");
            }
            newsletterEmail.value = "";
        }, 700);
    });
});


/* =====================================================
   SECTION 24 → LOCATION
===================================================== */

document.getElementById("locationBtn").addEventListener("click", () => {
    const city = localStorage.getItem("freshcartLocation") || "Bengaluru";
    document.getElementById("locationText").textContent = city;
    localStorage.setItem("freshcartLocation", city);
});

const savedLocation = localStorage.getItem("freshcartLocation");

if (savedLocation) {
    document.getElementById("locationText").textContent = savedLocation;
}


/* =====================================================
   SECTION 25 → MOBILE MENU
===================================================== */

document.getElementById("mobileMenuBtn").addEventListener("click", () => {
    document.getElementById("mainNav").classList.toggle("mobile-open");
});


/* =====================================================
   SECTION 26 → BACK TO TOP
===================================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTop.classList.add("active");
    } else {
        backToTop.classList.remove("active");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/* =====================================================
   SECTION 27 → SHOW ALL PRODUCTS
===================================================== */

document.getElementById("showAllProducts").addEventListener("click", () => {

    currentFilter = "All";
    currentSearch = "";
    searchInput.value = "";

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.filter === "All") btn.classList.add("active");
    });

    displayProducts();
});


/* =====================================================
   SECTION 28 → START SHOPPING
===================================================== */

document.getElementById("startShopping").addEventListener("click", () => {
    closeCart();
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});


/* =====================================================
   SECTION 29 → CHECKOUT (from cart sidebar)

   IMPORTANT FIX: this now goes to the EXACT SAME page as
   Buy Now (pages/checkout.html), which is the page that
   already contains both the address form and the payment
   method selection. Previously this pointed somewhere
   else, which is why clicking "Checkout" never showed the
   payment step.
===================================================== */

/* =====================================================
   CHECKOUT FROM CART SIDEBAR
   Cart → Checkout Sidebar
===================================================== */

const checkoutButton =
    document.getElementById("checkoutButton");


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function() {

            if (!cart.length) {

                showToast(
                    "Your basket is empty"
                );

                return;
            }


            saveCart();

            saveCoupon();

            closeCart();


            /* Open same checkout sidebar */

            openCheckoutSidebar();

        }
    );

}


/* =====================================================
   SECTION 30 → ACCOUNT
===================================================== */

document.getElementById("accountBtn").addEventListener("click", () => {
    window.location.href = "pages/account.html";
});


/* =====================================================
   SECTION 31 → DEAL BUTTON
===================================================== */

document.getElementById("dealShopButton").addEventListener("click", () => {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    showToast("Showing today's best deals");
});


/* =====================================================
   SECTION 32 → INITIALIZE
===================================================== */

displayProducts();
updateCart();
updateWishlistCount();

console.log("FreshCart website loaded successfully!");


/* =====================================================
   LOGIN / LOGOUT
===================================================== */

const loggedOutAccount = document.getElementById("loggedOutAccount");
const loggedInAccount = document.getElementById("loggedInAccount");
const loggedUserName = document.getElementById("loggedUserName");
const logoutButton = document.getElementById("logoutButton");

function checkLoginStatus() {

    const isLoggedIn = localStorage.getItem("freshCartLoggedIn");
    const user = JSON.parse(localStorage.getItem("freshCartUser"));

    if (isLoggedIn === "true" && user) {
        if (loggedOutAccount) loggedOutAccount.style.display = "none";
        if (loggedInAccount) loggedInAccount.style.display = "block";
        if (loggedUserName) loggedUserName.textContent = user.name;
    } else {
        if (loggedOutAccount) loggedOutAccount.style.display = "block";
        if (loggedInAccount) loggedInAccount.style.display = "none";
    }
}

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("freshCartLoggedIn");
        localStorage.removeItem("freshCartUser");
        window.location.href = "pages/login.html";
    });
}

checkLoginStatus();


/* =====================================================
   LOGIN / LOGOUT (header button text swap)
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const authButton = document.getElementById("headerAuthButton");
    const accountButton = document.getElementById("accountBtn");
    const accountAvatar = accountButton && accountButton.querySelector("span");
    const accountText = document.getElementById("accountText");

    if (!authButton) return;

    function updateAuthButton() {

        const loggedIn = localStorage.getItem("freshCartLoggedIn") === "true";

        if (loggedIn) {

            authButton.textContent = "Logout";
            authButton.href = "#";

            authButton.classList.remove("header-auth-btn");
            authButton.classList.add("header-logout-btn");

            if (accountButton) accountButton.hidden = false;

            let user = null;
            try {
                user = JSON.parse(localStorage.getItem("freshCartCurrentUser")) ||
                    JSON.parse(localStorage.getItem("freshCartUser"));
            } catch (error) {}

            const name = user && user.name ? user.name.trim() : "Account";
            if (accountAvatar) accountAvatar.textContent = name.charAt(0).toUpperCase();
            if (accountText) accountText.textContent = name;

        } else {

            authButton.textContent = "Sign in";
            authButton.href = "pages/login.html";

            authButton.classList.remove("header-logout-btn");
            authButton.classList.add("header-auth-btn");

            if (accountButton) accountButton.hidden = true;
        }
    }

    authButton.addEventListener("click", function (event) {

        const loggedIn = localStorage.getItem("freshCartLoggedIn");

        if (loggedIn === "true") {

            event.preventDefault();

            localStorage.removeItem("freshCartLoggedIn");
            localStorage.removeItem("freshCartCurrentUser");
            localStorage.removeItem("freshCartUserName");

            window.location.href = "pages/login.html";
        }
    });

    updateAuthButton();
});

}

/* One entry point: page features are loaded in dependency order. */
if (freshCartPage !== "home") {
    const pageScripts = {
        account: ["products.js", "account.js"],
        cart: ["products.js", "app.js", "cart.js"],
        checkout: ["products.js", "checkout.js"],
        login: ["login.js"],
        productDetails: ["products.js", "app.js", "product-details.js"],
        products: ["products.js", "app.js", "products-page.js"],
        register: ["register.js"],
        wishlist: ["products.js", "app.js"]
    };
    const scripts = pageScripts[freshCartPage] || [];
    const baseUrl = new URL(".", document.currentScript.src);

    document.querySelectorAll('a[href="index.html"]').forEach((link) => {
        link.href = new URL("../index.html", window.location.href).href;
    });

    const loadNext = (index) => {
        if (index >= scripts.length) {
            if (document.readyState !== "loading") {
                document.dispatchEvent(new Event("DOMContentLoaded"));
            }
            return;
        }
        const script = document.createElement("script");
        script.async = false;
        const scriptUrl = new URL(scripts[index], baseUrl);
        scriptUrl.searchParams.set("v", "20260917");
        script.src = scriptUrl.href;
        script.onload = () => loadNext(index + 1);
        document.head.appendChild(script);
    };
    loadNext(0);
}


