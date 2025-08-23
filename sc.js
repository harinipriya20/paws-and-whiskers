// Load cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart buttons
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = {
      name: btn.dataset.name,
      price: parseInt(btn.dataset.price),
      img: btn.dataset.img,
      qty: 1
    };

    let existing = cart.find(p => p.name === item.name);
    if (existing) existing.qty++;
    else cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(item.name + " added to cart!");
    window.location.href = "cart.html"; // go to cart page
  });
});

// Render cart if cart page exists
if (document.querySelector(".cart-items")) {
  const cartItemsDiv = document.querySelector(".cart-items");
  const totalSpan = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkoutBtn");

  function renderCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;
      cartItemsDiv.innerHTML += `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}" width="100">
          <div class="item-details">
            <h3>${item.name}</h3>
            <p>Quantity: ${item.qty}</p>
            <p class="price">₹${item.price * item.qty}</p>
            <button class="remove" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
    });

    totalSpan.textContent = total;

    // Remove button
    document.querySelectorAll(".remove").forEach(btn => {
      btn.addEventListener("click", () => {
        cart.splice(btn.dataset.index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });
  }

  renderCart();

  // Place Order (WhatsApp)
  checkoutBtn.addEventListener("click", () => {
    if(cart.length === 0){
      alert("Your cart is empty!");
      return;
    }

    let orderMessage = "Order Details:%0A";
    cart.forEach(item => {
      orderMessage += `${item.name} - Qty: ${item.qty} - ₹${item.price * item.qty}%0A`;
    });
    orderMessage += `Total: ₹${cart.reduce((acc, item) => acc + item.price * item.qty, 0)}`;

    // WhatsApp link
    let whatsappNumber = "917904472396"; // replace with your number
    window.open(`https://wa.me/${whatsappNumber}?text=${orderMessage}`, "_blank");

    // Clear cart
    localStorage.removeItem("cart");
    cart = [];
    renderCart();
  });
}
