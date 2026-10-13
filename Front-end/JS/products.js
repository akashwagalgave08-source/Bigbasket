/* =====================================================
    PRODUCT DATABASE & API INTEGRATION
===================================================== */

// Initialize empty products array that will hold server data
let products = [];
const PRODUCT_CACHE_KEY = "freshBasketProductCatalog";

/**
 * Fetches product catalog from backend API
 * @returns {Promise<Array>}
 */
async function loadProducts() {
    try {
        const response = await fetch("/api/products", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to load products: ${response.statusText}`);
        }

        const data = await response.json();
        products = data.products || [];
        localStorage.setItem(PRODUCT_CACHE_KEY, JSON.stringify(products));
        
        // Dispatch custom event so UI components know products are ready
        window.dispatchEvent(new CustomEvent("productsLoaded", { detail: products }));
        
        return products;
    } catch (error) {
        console.error("Error fetching products from backend:", error);
        try {
            products = JSON.parse(localStorage.getItem(PRODUCT_CACHE_KEY)) || [];
            if (products.length) {
                window.dispatchEvent(new CustomEvent("productsLoaded", { detail: products }));
            }
        } catch (cacheError) {
            products = [];
        }
        return [];
    }
}

// Automatically fetch products when script loads
document.addEventListener("DOMContentLoaded", loadProducts);

/* =====================================================
    CATEGORIES (Static metadata)
===================================================== */

const categories = [
    { name: "Fruits", icon: "🍎" },
    { name: "Vegetables", icon: "🥕" },
    { name: "Dairy", icon: "🥛" },
    { name: "Staples", icon: "🌾" },
    { name: "Snacks", icon: "🍪" },
    { name: "Beverages", icon: "🧃" },
    { name: "Household", icon: "🧴" },
    { name: "Personal Care", icon: "🧼" }
];