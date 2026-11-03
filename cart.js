let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

let removedItem = null;
let removedIndex = null;

const cartContainer = document.querySelector("#cart-items");
const totalElement = document.querySelector("#cart-total");


function displayCart() {

    cartContainer.innerHTML = "";

    let total = 0;

    cartItems.forEach(function(item, index) {

        const price = Number(item.price.replace(/[₹,]/g, ""));
        const itemTotal = price * item.quantity;

        total += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Size: ${item.size || "Not selected"}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Subtotal: ₹${itemTotal.toLocaleString("en-IN")}</p>

                <button onclick="changeQuantity(${index}, -1)">-</button>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalElement.textContent =
        `Total: ₹${total.toLocaleString("en-IN")}`;

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty!</p>";
    }

    if (removedItem !== null) {

        const undoButton = document.createElement("button");

        undoButton.textContent = "Undo";
        undoButton.className = "undo-btn";
        undoButton.onclick = undoRemove;

        cartContainer.appendChild(undoButton);
    }

    updateCartCount();
}

function updateCartCount() {

    const totalItems = cartItems.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    const cartCount = document.querySelector(".cart span");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }

}


function changeQuantity(index, amount) {

    cartItems[index].quantity += amount;

    if (cartItems[index].quantity <= 0) {
        removeItem(index);
        return;
    }

    saveCart();
}


function removeItem(index) {
    removedItem = cartItems[index];
    removedIndex = index;

    cartItems.splice(index, 1);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    saveCart();
}


function undoRemove() {

    if (removedItem !== null) {

        cartItems.splice(removedIndex, 0, removedItem);

        removedItem = null;
        removedIndex = null;

        saveCart();
    }

}


function saveCart() {

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    displayCart();
}
function checkCheckoutButton() {

    const checkoutButton = document.querySelector(".checkout-btn");

    if (cartItems.length === 0) {
        checkoutButton.style.pointerEvents = "none";
        checkoutButton.style.opacity = "0.5";
        checkoutButton.style.cursor = "not-allowed";
        checkoutButton.removeAttribute("href");
    } else {
        checkoutButton.style.pointerEvents = "auto";
        checkoutButton.style.opacity = "1";
        checkoutButton.style.cursor = "pointer";
        checkoutButton.href = "checkout.html";
    }

}

displayCart();


window.addEventListener("pagehide", function() {

    removedItem = null;
    removedIndex = null;

});
window.addEventListener("pageshow", function(event) {
    if (event.persisted) {
        cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        removedItem = null;
        removedIndex = null;
        displayCart();
    }
});
checkCheckoutButton();
