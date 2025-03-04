const body = document.body;
const ota = document.querySelector("#list");
const input = document.querySelector("#input");
const toggleBtn = document.querySelector("#Toggle");
const shopSaveBtn = document.getElementById("shop");
const cartSidebar = document.getElementById("cart-sidebar");
const cartList = document.getElementById("cart-list");
const totalPriceElem = document.getElementById("total-price");
const closeCartBtn = document.getElementById("close-cart");
const payCart = document.getElementById("pay-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCart();

fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
        renderData(data);
    })
    .catch(error => console.log("Xato: ", error));

function renderData(products) {
    ota.innerHTML = "";
    products.forEach(product => {
        const box = document.createElement("li");
        box.className = "list";
        box.innerHTML = `
            <img src="${product.image}" width="200">
            <h3>${product.title}</h3>
            <p>${product.category}</p>
            <p>${product.price}$</p>
            <button class="buybtn">Buy</button>
        `;
        const buyBtn = box.querySelector(".buybtn");
        buyBtn.addEventListener("click", () => addToCart(product));
        ota.append(box);
    });
}

function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <span>${item.title.slice(0,10)}...</span>
            <span>${item.price}$</span>
            <button onclick="removeFromCart(${index})">❌</button>
        `;
        cartList.appendChild(li);
    });
    totalPriceElem.textContent = total.toFixed(2);
    payCart.style.display = total === 0 ? "none" : "block";
}



function toggleDarkMode() {
    body.classList.toggle("dark-mode");
    toggleBtn.textContent = body.classList.contains("dark-mode") ? "Och🔴 rang" : "Sovoq🔵 Rang";
    localStorage.setItem("mode", body.classList.contains("dark-mode") ? "dark" : "light");
}

toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleDarkMode();
});

window.addEventListener("load", () => {
    if (localStorage.getItem("mode") === "dark") {
        body.classList.add("dark-mode");
    }
});

function payme() {
    window.location.href = "https://t.me/Johon_1011";
}
