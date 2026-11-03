const cartButtons = document.querySelectorAll(".add-to-cart");

const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const priceSort = document.querySelector("#price-sort");

const productCards = document.querySelectorAll(".product-card");
const productContainer = document.querySelector(".product-container");

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

function updateCartCount() {

    cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const totalItems = cartItems.reduce(function(total, item) {
        return total + Number(item.quantity);
    }, 0);

    const cartCount = document.querySelector(".cart span");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

cartButtons.forEach(function(button) {

    button.addEventListener("click", function(event) {

        event.stopPropagation();

        const productCard = button.closest(".product-card");

        const productName = productCard.querySelector("h3").textContent;
        const productPrice = productCard.querySelector("p").textContent;

        cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        const existingProduct = cartItems.find(function(item) {
            return item.name === productName;
        });

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cartItems.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });

        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        updateCartCount();

        alert("Product added to cart!");

    });

});

window.addEventListener("pageshow", updateCartCount);

window.addEventListener("focus", updateCartCount);

document.addEventListener("visibilitychange", function() {

    if (!document.hidden) {
        updateCartCount();
    }

});


function filterProducts() {

    if (!searchInput || !categoryFilter) return;

    const searchText = searchInput.value.toLowerCase().trim();

    const selectedCategory = categoryFilter.value;

    productCards.forEach(function(card) {

        const productName =
            card.querySelector("h3").textContent.toLowerCase();

        const productCategory = card.dataset.category;

        const matchesSearch = productName.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            selectedCategory === productCategory;

        card.style.display =
            matchesSearch && matchesCategory ? "" : "none";

    });

}


if (searchInput) {

    searchInput.addEventListener("input", function() {
        filterProducts();
    });

}

if (categoryFilter) {

    categoryFilter.addEventListener("change", function() {
        filterProducts();
    });

}

function sortProducts() {

    if (!priceSort || !productContainer) return;

    const selectedSort = priceSort.value;

    const products = Array.from(
        productContainer.querySelectorAll(".product-card")
    );

    if (selectedSort === "low-high") {

        products.sort(function(a, b) {

            const priceA = Number(
                a.querySelector("p").textContent.replace(/[₹,]/g, "")
            );

            const priceB = Number(
                b.querySelector("p").textContent.replace(/[₹,]/g, "")
            );

            return priceA - priceB;

        });

    } else if (selectedSort === "high-low") {

        products.sort(function(a, b) {

            const priceA = Number(
                a.querySelector("p").textContent.replace(/[₹,]/g, "")
            );

            const priceB = Number(
                b.querySelector("p").textContent.replace(/[₹,]/g, "")
            );

            return priceB - priceA;

        });

    }

    products.forEach(function(product) {
        productContainer.appendChild(product);
    });

    filterProducts();

}


if (priceSort) {

    priceSort.addEventListener("change", function() {
        sortProducts();
    });

}

if (productContainer) {

    productContainer.addEventListener("click", function(event) {

        if (event.target.closest(".add-to-cart")) {
            return;
        }

        const card = event.target.closest(".product-card");

        if (card && card.dataset.link) {
            window.location.href = card.dataset.link;
        }

    });

}
updateCartCount();
