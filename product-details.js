const products = {

    blazer: {
        name: "Orange Blazer with Shirt",
        price: "₹3,999",
        image: "images/blazer.jpg",
        description: "A timeless blazer for a smart and elegant look."
    },

    shirt: {
        name: "Premium Casual Shirt",
        price: "₹1,499",
        image: "images/shirt.jpg",
        description: "A comfortable casual shirt for everyday style."
    },

    sneakers: {
        name: "Classic beige men's suit",
        price: "₹6,999",
        image: "images/beige.jpg",
        description: "Classic beige men's three piece suit"
    },

    jeans: {
        name: "Classic Blue Denim Jeans",
        price: "₹1,999",
        image: "images/jeans.jpg",
        description: "Classic blue denim jeans for a versatile look."
    },

    dress: {
        name: "Elegant Evening Dress",
        price: "₹4,499",
        image: "images/frock.jpg",
        description: "An elegant evening dress for special occasions."
    },

    handbag: {
        name: "Embellished Purple Anarkali Suit",
        price: "₹3,499",
        image: "images/dress.jpg",
        description: "Woman in purple Anarkali suit."
    },

    top: {
        name: "Premium Casual Top",
        price: "₹1,299",
        image: "images/top.jpg",
        description: "A comfortable and stylish casual top."
    },

    skirt: {
        name: "Classic Pleated Skirt",
        price: "₹1,899",
        image: "images/skirt.jpg",
        description: "A classic pleated skirt for a graceful look."
    },

    formal: {
        name: "Classic Formal Shoes",
        price: "₹3,499",
        image: "images/formal-shoes.jpg",
        description: "Classic formal shoes for a polished look."
    },

    sandals: {
        name: "Comfort Casual Sandals",
        price: "₹1,299",
        image: "images/sandals.jpg",
        description: "Comfortable sandals for everyday use."
    },

    heels: {
        name: "Elegant Party Heels",
        price: "₹2,499",
        image: "images/heels.jpg",
        description: "Elegant heels for special occasions."
    },

    watch: {
        name: "Classic Elegant Watch",
        price: "₹2,499",
        image: "images/watch.jpg",
        description: "A stylish watch for everyday use."
    },

    sunglasses: {
        name: "Premium Sunglasses",
        price: "₹1,499",
        image: "images/sunglasses.jpg",
        description: "Stylish sunglasses for a modern look."
    },

    wallet: {
        name: "Classic Leather Wallet",
        price: "₹999",
        image: "images/wallet.jpg",
        description: "A classic wallet with a simple and elegant design."
    }

};

const params = new URLSearchParams(window.location.search);

const productId = params.get("product");
const previousPage = params.get("from");

const product = products[productId];


const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productImage = document.querySelector("#product-image");
const productDescription = document.querySelector("#product-description");

const productSize = document.querySelector("#product-size");
const productQuantity = document.querySelector("#product-quantity");

const addButton = document.querySelector("#details-add-to-cart");
const continueButton = document.querySelector("#continue-shopping");

const cart = document.querySelector(".cart");


if (product) {

    productName.textContent = product.name;
    productPrice.textContent = product.price;
    productImage.src = product.image;
    productImage.alt = product.name;
    productDescription.textContent = product.description;

} else {

    productName.textContent = "Product not found";

    if (addButton) {
        addButton.disabled = true;
    }

}

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


function updateCartCount() {

    const totalItems = cartItems.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    if (cart) {
        const cartCount = cart.querySelector("span");

        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }

}


if (addButton) {

    addButton.addEventListener("click", function() {

        if (!product) return;

        const selectedSize = productSize ? productSize.value : "One Size";

        const selectedQuantity = Number(productQuantity.value);


        if (
            !Number.isInteger(selectedQuantity) ||
            selectedQuantity < 1 ||
            selectedQuantity > 10
        ) {

            alert("Please select a quantity between 1 and 10.");
            return;

        }



        const existingProduct = cartItems.find(function(item) {

            return item.name === product.name &&
                   item.size === selectedSize;

        });


        if (existingProduct) {

            if (existingProduct.quantity + selectedQuantity > 10) {

                alert("Maximum quantity allowed is 10.");
                return;

            }

            existingProduct.quantity += selectedQuantity;

        } else {

            cartItems.push({

                name: product.name,
                price: product.price,
                size: selectedSize,
                quantity: selectedQuantity

            });

        }


        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        updateCartCount();

        alert("Product added to cart!");

    });

}


if (continueButton) {

    continueButton.addEventListener("click", function() {

        const allowedPages = [
            "men.html",
            "women.html",
            "shoes.html",
            "accessories.html"
        ];

        if (allowedPages.includes(previousPage)) {

            window.location.href = previousPage;

        } else {

            window.location.href = "index.html";

        }

    });

}

updateCartCount();
