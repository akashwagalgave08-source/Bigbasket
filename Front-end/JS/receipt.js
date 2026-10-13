(async function () {
    const card = document.getElementById("receiptCard");
    const orderId = new URLSearchParams(window.location.search).get("order");
    if (!orderId) { card.innerHTML = '<p class="receipt-error">No receipt was selected.</p>'; return; }
    try {
        const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Receipt not found.");
        const order = result.order;
        const money = value => `₹${Number(value).toLocaleString("en-IN")}`;
        const date = new Date(order.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
        const items = order.items.map(item => `<div class="receipt-item"><span>${item.name} <small>× ${item.quantity}</small></span><strong>${money(item.total)}</strong></div>`).join("");
        card.innerHTML = `
            <div class="receipt-success"><i class="fa-solid fa-circle-check"></i><p>Order placed successfully</p></div>
            <div class="receipt-heading"><div><span>ORDER RECEIPT</span><h1>Thank you, ${escapeHtml(order.address.name)}!</h1></div><strong>${order.id}</strong></div>
            <p class="receipt-date">${date} · ${order.status}</p>
            <div class="receipt-columns"><div><h2>Deliver to</h2><p>${escapeHtml(order.address.name)}<br>${escapeHtml(order.address.line1)}<br>${escapeHtml(order.address.city)} – ${escapeHtml(order.address.pincode)}<br>${escapeHtml(order.address.phone)}</p></div><div><h2>Payment</h2><p>${order.paymentMethod}<br><strong>${order.paymentStatus}</strong></p></div></div>
            <div class="receipt-items"><h2>Items ordered</h2>${items}</div>
            <div class="receipt-totals"><div><span>Subtotal</span><strong>${money(order.subtotal)}</strong></div><div><span>Delivery</span><strong>${order.delivery ? money(order.delivery) : "FREE"}</strong></div><div class="receipt-grand"><span>Total paid</span><strong>${money(order.total)}</strong></div></div>
            <div class="receipt-actions"><button type="button" class="primary-btn" onclick="window.print()"><i class="fa-solid fa-print"></i> Print receipt</button><a href="../index.html" class="secondary-btn">Continue shopping</a></div>`;
    } catch (error) {
        const previewOrder = JSON.parse(localStorage.getItem("freshBasketPreviewReceipt") || "null");
        if (previewOrder && previewOrder.id === orderId) {
            const money = value => `₹${Number(value).toLocaleString("en-IN")}`;
            const items = previewOrder.items.map(item => `<div class="receipt-item"><span>${escapeHtml(item.name)} <small>× ${item.quantity}</small></span><strong>${money(item.total)}</strong></div>`).join("");
            card.innerHTML = `
                <div class="receipt-success"><i class="fa-solid fa-circle-check"></i><p>Order placed successfully</p></div>
                <div class="receipt-heading"><div><span>ORDER RECEIPT</span><h1>Thank you, ${escapeHtml(previewOrder.address.name)}!</h1></div><strong>${previewOrder.id}</strong></div>
                <p class="receipt-date">${new Date(previewOrder.createdAt).toLocaleString("en-IN")} · ${previewOrder.status}</p>
                <div class="receipt-columns"><div><h2>Deliver to</h2><p>${escapeHtml(previewOrder.address.name)}<br>${escapeHtml(previewOrder.address.line1)}<br>${escapeHtml(previewOrder.address.city)} – ${escapeHtml(previewOrder.address.pincode)}<br>${escapeHtml(previewOrder.address.phone)}</p></div><div><h2>Payment</h2><p>${previewOrder.paymentMethod}<br><strong>${previewOrder.paymentStatus}</strong></p></div></div>
                <div class="receipt-items"><h2>Items ordered</h2>${items}</div>
                <div class="receipt-totals"><div><span>Subtotal</span><strong>${money(previewOrder.subtotal)}</strong></div><div><span>Delivery</span><strong>${previewOrder.delivery ? money(previewOrder.delivery) : "FREE"}</strong></div><div class="receipt-grand"><span>Total paid</span><strong>${money(previewOrder.total)}</strong></div></div>
                <div class="receipt-actions"><button type="button" class="primary-btn" onclick="window.print()"><i class="fa-solid fa-print"></i> Print receipt</button><a href="../index.html" class="secondary-btn">Continue shopping</a></div>`;
        } else {
            card.innerHTML = `<p class="receipt-error">${escapeHtml(error.message)} Please return to your cart and try again.</p>`;
        }
    }
    function escapeHtml(value) { const node = document.createElement("span"); node.textContent = value || ""; return node.innerHTML; }
}());
