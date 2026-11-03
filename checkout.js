const checkoutItems = document.querySelector("#checkout-items");
const checkoutTotal = document.querySelector("#checkout-total");
const checkoutForm = document.querySelector("#checkout-form");
const orderMessage = document.querySelector("#order-message");

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    function displayOrder() {cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    checkoutItems.innerHTML = "";

    let total = 0;

    cartItems.forEach(function(item) {

        const price = Number(item.price.replace(/[₹,]/g, ""));
        const subtotal = price * item.quantity;

        total += subtotal;

        checkoutItems.innerHTML += `
            <div class="summary-item">
                <p>${item.name}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>₹${subtotal.toLocaleString("en-IN")}</p>
            </div>
        `;
    });

    checkoutTotal.textContent =
        `Total: ₹${total.toLocaleString("en-IN")}`;

    if (cartItems.length === 0) {
        checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
        checkoutForm.querySelector("button").disabled = true;
    }
}

checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (cartItems.length === 0) {
        orderMessage.textContent = "Your cart is empty.";
        return;
    }

    const customerName = document.querySelector("#name").value;

    orderMessage.textContent =
        `Thank you, ${customerName}! Your demo order has been placed.`;

    localStorage.setItem("cartItems", JSON.stringify([]));

    checkoutForm.querySelector("button").disabled = true;

    cartItems = [];
    displayOrder();

});

displayOrder();
