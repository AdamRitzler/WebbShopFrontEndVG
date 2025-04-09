const order = JSON.parse(localStorage.getItem('orders')) || [];
const clearCartButton = document.getElementById('clearCartButton');
const cartItems = document.getElementById('cartItems');
const checkoutButton = document.getElementById('checkoutButton');
const homeButton = document.getElementById('homeButton');
if (!order.length) {
    cartItems.innerHTML = '';
    cartItems.innerHTML = '<h4 class="text-center">Varukorgen är tom!</h4>';
    console.log('Varukorgen är tom');
}else{

    cartItems.innerHTML = order.map(item => `<img src="${item.image}" class="product-image img-fluid"> Product: ${item.title}, Price: $${item.price}, Quantity: ${item.antal}`).join('<br>');
}

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
    localStorage.clear();
    cartItems.innerHTML = '<h4 class="text-center">Varukorgen är tom!</h4>';
    console.log('Varukorg rensad!');
});

homeButton.addEventListener('click', () => {
    window.location.href = "index.html";
}   );