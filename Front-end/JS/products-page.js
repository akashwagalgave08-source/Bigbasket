/* =====================================================
   PRODUCTS PAGE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            !document.getElementById(
                "productsContainer"
            )
        ) return;


        initializeProductPage();

    }
);


let filteredProducts = [...products];

let selectedCategory = "all";

let selectedPrices = [];

window.addEventListener("productsLoaded", applyFilters);


/* =====================================================
   INITIALIZE
===================================================== */

function initializeProductPage() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const category =
        params.get("category");


    if (category) {

        selectedCategory = category;

        const radio =
            document.querySelector(
                `input[name="category"][value="${category}"]`
            );

        if (radio) {

            radio.checked = true;

        }

    }


    document
        .querySelectorAll(
            'input[name="category"]'
        )
        .forEach(input => {

            input.addEventListener(
                "change",
                () => {

                    selectedCategory =
                        input.value;

                    applyFilters();

                }
            );

        });


    document
        .querySelectorAll(
            ".price-filter"
        )
        .forEach(input => {

            input.addEventListener(
                "change",
                () => {

                    selectedPrices =
                        Array.from(
                            document.querySelectorAll(
                                ".price-filter:checked"
                            )
                        )
                        .map(
                            checkbox =>
                                checkbox.value
                        );

                    applyFilters();

                }
            );

        });


    document
        .getElementById(
            "sortProducts"
        )
        .addEventListener(
            "change",
            event => {

                sortProducts(
                    event.target.value
                );

            }
        );


    document
        .getElementById(
            "clearFilters"
        )
        .addEventListener(
            "click",
            clearFilters
        );


    applyFilters();

}


/* =====================================================
   FILTER
===================================================== */

function applyFilters() {

    filteredProducts =
        products.filter(product => {


            if (
                selectedCategory !== "all" &&
                product.category !== selectedCategory
            ) {

                return false;

            }


            if (
                selectedPrices.length > 0
            ) {

                const matchesPrice =
                    selectedPrices.some(
                        range => {

                            if (
                                range === "0-100"
                            ) {

                                return (
                                    product.price < 100
                                );

                            }

                            if (
                                range === "100-250"
                            ) {

                                return (
                                    product.price >= 100 &&
                                    product.price <= 250
                                );

                            }

                            if (
                                range === "250-500"
                            ) {

                                return (
                                    product.price > 250 &&
                                    product.price <= 500
                                );

                            }

                            if (
                                range === "500"
                            ) {

                                return (
                                    product.price > 500
                                );

                            }

                        }
                    );


                if (!matchesPrice) {

                    return false;

                }

            }


            return true;

        });


    renderFilteredProducts();

}


/* =====================================================
   RENDER
===================================================== */

function renderFilteredProducts() {

    const container =
        document.getElementById(
            "productsContainer"
        );

    const count =
        document.getElementById(
            "productCount"
        );

    const empty =
        document.getElementById(
            "emptyProducts"
        );


    if (!filteredProducts.length) {

        container.innerHTML = "";

        empty.style.display = "block";

    } else {

        empty.style.display = "none";

        container.innerHTML =
            filteredProducts
                .map(createProductCard)
                .join("");

    }


    count.textContent =
        `${filteredProducts.length} products`;

}


/* =====================================================
   SORT
===================================================== */

function sortProducts(type) {

    switch (type) {

        case "price-low":

            filteredProducts.sort(
                (a, b) =>
                    a.price - b.price
            );

            break;


        case "price-high":

            filteredProducts.sort(
                (a, b) =>
                    b.price - a.price
            );

            break;


        case "rating":

            filteredProducts.sort(
                (a, b) =>
                    b.rating - a.rating
            );

            break;


        case "discount":

            filteredProducts.sort(
                (a, b) =>
                    getDiscount(b) - getDiscount(a)
            );

            break;

    }


    renderFilteredProducts();

}


/* =====================================================
   CLEAR FILTERS
===================================================== */

function clearFilters() {

    selectedCategory = "all";

    selectedPrices = [];


    document.querySelector(
        'input[name="category"][value="all"]'
    ).checked = true;


    document
        .querySelectorAll(
            ".price-filter"
        )
        .forEach(
            checkbox =>
                checkbox.checked = false
        );


    document.getElementById(
        "sortProducts"
    ).value = "default";


    applyFilters();

}

function getDiscount(product) {
    const originalPrice = Number(product.original_price ?? product.originalPrice ?? product.price);
    const price = Number(product.price);

    return originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;
}

function getProductImage(product) {
    const imageMap = {
        "apple.jpg": "../images/Fruits%20%26%20Vegetables/Red-Apples.jpg",
        "banana.jpg": "../images/Fruits%20%26%20Vegetables/Fresh-Bananas.jpg",
        "tomato.jpg": "../images/Fruits%20%26%20Vegetables/Tomatoes.jpg",
        "milk.jpg": "../images/Fruits%20%26%20Vegetables/milk.jpg",
        "butter.jpg": "../images/Dairy%20%26%20Bakery/Farm-Fresh-Butter.jpg",
        "bread.jpg": "../images/Dairy%20%26%20Bakery/Whole-Wheat-Bread.jpg",
        "rice.jpg": "../images/Staples/Wheat-Flour.png",
        "flour.jpg": "../images/Staples/Wheat-Flour.png",
        "oil.jpg": "../images/Staples/Sunflower%20Oil.jpg",
        "chips.jpg": "../images/Staples/Potato-Chips.png",
        "biscuits.jpg": "../images/Snacks/Oat%20Biscuits.jpg",
        "orange-juice.jpg": "../images/Beverages/Orange%20Juice.png",
        "handwash.jpg": "../images/products1/Hand%20Wash.png",
        "dishwash.jpg": "../images/products1/Dishwashing%20Liquid.png"
    };

    if (!product.image) return getFallbackImage(product);
    if (/^(https?:)?\//.test(product.image)) return product.image;

    return imageMap[product.image.toLowerCase()] ||
        `../images/${encodeURIComponent(product.category)}/${encodeURIComponent(product.image)}`;
}

function getFallbackImage(product) {
    const fallbackMap = {
        "Fruits & Vegetables": "../images/Fruits%20%26%20Vegetables/Red-Apples.jpg",
        "Dairy & Bakery": "../images/Dairy%20%26%20Bakery/Whole-Wheat-Bread.jpg",
        Staples: "../images/Staples/Wheat-Flour.png",
        Snacks: "../images/Snacks/Oat%20Biscuits.jpg",
        Beverages: "../images/Beverages/Orange%20Juice.png",
        "Personal Care": "../images/products1/Hand%20Wash.png",
        Household: "../images/products1/Dishwashing%20Liquid.png"
    };

    return fallbackMap[product.category] || "../images/Fruits%20%26%20Vegetables/Red-Apples.jpg";
}

function createProductCard(product) {
    const originalPrice = Number(product.original_price ?? product.originalPrice ?? product.price);
    const discount = getDiscount(product);
    const image = getProductImage(product);

    return `
        <article class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='${getFallbackImage(product)}'">
                ${discount ? `<span class="discount-badge">${discount}% OFF</span>` : ""}
                <button class="wishlist-btn" onclick="toggleWishlist(${product.id})" aria-label="Add ${product.name} to wishlist">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-weight">${product.unit || product.weight || ""}</p>
                <div class="rating">★ ${Number(product.rating).toFixed(1)} <small>(${product.review_count ?? product.reviews ?? 0})</small></div>
                <div class="product-bottom">
                    <div class="product-price">
                        <strong>₹${Number(product.price).toFixed(2)}</strong>
                        ${originalPrice > Number(product.price) ? `<del>₹${originalPrice.toFixed(2)}</del>` : ""}
                    </div>
                    <button class="add-cart-btn" onclick="addToCart(${product.id})">Add</button>
                </div>
            </div>
        </article>`;
}