let order = [];
const clearCartButton = document.getElementById('clearCartButton');
const cartItems = document.getElementById('cartItems');
const checkoutButton = document.getElementById('checkoutButton');
const homeButton = document.getElementById('homeButton');
const totalPrice = document.getElementById('theTotalPrice');

function itemsInCart(){
    order = JSON.parse(localStorage.getItem('orders')) || [];
    if (!order.length) {
        cartItems.innerHTML = '';
        totalPrice.innerHTML = '';
        cartItems.innerHTML = '<h4 class="text-center">Varukorgen är tom!</h4>';
        console.log('Varukorgen är tom');
    } else {
        cartItems.innerHTML = order.map((item, index) => `
        <div class="cart-item">
        <hr>
        <img src="${item.image}" class="product-image img-fluid">
        <p>Product: ${item.title}, Price: $${item.price}</p>
        <div class="quantity-controls">
        <button class="btn btn-primary btn-sm" onclick="increaseQuantity(${index})">+</button>
        <p class="quantity-display" id="quantity-${index}">${item.antal}</p>
        <button class="btn btn-danger btn-sm" onclick="decreaseQuantity(${index})">-</button>
        <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove item</button>
        </div>
        </div>
        `).join('');
        
        const finalPrice = order.reduce((acc, item) => acc + (item.price * item.antal), 0).toFixed(2);
        totalPrice.innerHTML = `<br><h4 class="text-center">Totalt pris: $${finalPrice}</h4>`;
    }
}
    
function increaseQuantity(index) {
    const quantityDisplay = document.getElementById(`quantity-${index}`);
    if (quantityDisplay) {
        let quantity = parseInt(quantityDisplay.textContent, 10);
        quantity++;
        quantityDisplay.textContent = quantity;
        order[index].antal = quantity;
        localStorage.setItem('orders', JSON.stringify(order));
        itemsInCart();
    }
}

function decreaseQuantity(index) {
    const quantityDisplay = document.getElementById(`quantity-${index}`);
    if (quantityDisplay) {
        let quantity = parseInt(quantityDisplay.textContent, 10);
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
            order[index].antal = quantity;
            localStorage.setItem('orders', JSON.stringify(order));
            itemsInCart();
        } else {
            alert("Minst en produkt måste finnas i varukorgen.");
        }
    }
}

function removeItem(index) {
    const itemToRemove = order[index];
    if (itemToRemove) {
        order.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(order));
        totalPrice.innerHTML = '';
        itemsInCart();
        console.log(`Produkt borttagen: ${itemToRemove.title}`);
    }
}

itemsInCart();

checkoutButton.addEventListener('click', () => {
    if (!order.length) {
        alert("Varukorgen är tom!");
        return;
    }
    window.location.href = "formular.html";
});

clearCartButton.addEventListener('click', () => {
    if (!order.length) {
        alert("Varukorgen är redan tom!");
        return;
    }
    totalPrice.innerHTML = '';
    localStorage.clear();
    cartItems.innerHTML = '<h4 class="text-center">Varukorgen är tom!</h4>';
    console.log('Varukorg rensad!');
});

homeButton.addEventListener('click', () => {
    window.location.href = "index.html";
});