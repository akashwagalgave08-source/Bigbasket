let products = [];

async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('Failed to fetch product catalog');
    const data = await response.json();
    products = data.products;
    
    // Call UI rendering function after data loads
    renderProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Call on DOM ready
document.addEventListener('DOMContentLoaded', fetchProducts);