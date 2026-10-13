document.addEventListener(
    "DOMContentLoaded",
    () => {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const id =
            Number(params.get("id"));


        const product =
            products.find(
                item => item.id === id
            );


        if (!product) {

            window.location.href =
                "products.html";

            return;

        }


        renderProductDetails(product);

        renderRelatedProducts(product);

    }
);


/* =====================================================
   PRODUCT DETAILS
===================================================== */

function renderProductDetails(product) {

    const container =
        document.getElementById(
            "productDetails"
        );


    const wishlist =
        getWishlist();


    const isWishlisted =
        wishlist.includes(product.id);


    container.innerHTML = `

        <div class="product-detail-wrapper">


            <div class="detail-image ${product.color}">

                <span class="discount-badge">

                    ${product.discount}% OFF

                </span>

                <div class="detail-emoji">

                    ${product.emoji}

                </div>

            </div>


            <div class="detail-content">

                <span class="product-category">

                    ${product.category}

                </span>


                <h1>

                    ${product.name}

                </h1>


                <div class="detail-rating">

                    <span>
                        ★ ${product.rating}
                    </span>

                    <small>
                        ${product.reviews} Reviews
                    </small>

                </div>


                <p class="detail-description">

                    Fresh and high-quality
                    ${product.name.toLowerCase()}
                    carefully selected for your
                    everyday grocery needs.

                </p>


                <div class="detail-price">

                    <strong>
                        ₹${product.price}
                    </strong>

                    <del>
                        ₹${product.originalPrice}
                    </del>

                    <span>
                        Save ₹${product.originalPrice - product.price}
                    </span>

                </div>


                <div class="detail-weight">

                    <strong>
                        Available Size
                    </strong>

                    <button class="size-option active">

                        ${product.weight}

                    </button>

                </div>


                <div class="detail-actions">

                    <button
                        class="primary-btn"
                        onclick="addToCart(${product.id})">

                        <i class="fa-solid fa-cart-shopping"></i>

                        Add to Cart

                    </button>

                    <button
        type="button"
        class="buy-now-btn"
        onclick="buyNow(${product.id})"
    >

        <i class="fa-solid fa-bolt"></i>

        Buy Now

    </button>


                    <button
                        class="wishlist-large ${isWishlisted ? "active" : ""}"
                        onclick="toggleWishlist(${product.id})">

                        <i class="${isWishlisted
                            ? "fa-solid"
                            : "fa-regular"} fa-heart">
                        </i>

                        Wishlist

                    </button>

                </div>


                <div class="delivery-info">

                    <div>

                        <i class="fa-solid fa-truck"></i>

                        <div>

                            <strong>
                                Free Delivery
                            </strong>

                            <span>
                                On orders above ₹499
                            </span>

                        </div>

                    </div>


                    <div>

                        <i class="fa-solid fa-rotate-left"></i>

                        <div>

                            <strong>
                                Easy Returns
                            </strong>

                            <span>
                                Hassle-free returns
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    `;

}


/* =====================================================
   RELATED PRODUCTS
===================================================== */

function renderRelatedProducts(product) {

    const container =
        document.getElementById(
            "relatedProducts"
        );


    const related =
        products
            .filter(
                item =>
                    item.category === product.category &&
                    item.id !== product.id
            )
            .slice(0, 4);


    container.innerHTML =
        related
            .map(createProductCard)
            .join("");

}