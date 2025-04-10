document.addEventListener('DOMContentLoaded', function () {
    // Hämta orderdata från localStorage
    const orderData = JSON.parse(localStorage.getItem('currentOrder')) || [];
    const productData = JSON.parse(localStorage.getItem('orders')) || [];
    const homeButton = document.getElementById('homeButton');

    if (orderData) {
        // Visa orderinformation
        document.getElementById('orderId').textContent = orderData.orderNumber;
        document.getElementById('orderDate').textContent = new Date(orderData.orderDate).toLocaleString('sv-SE');

        // Visa kundinformation
        document.getElementById('customerName').textContent = orderData.customer.name;
        document.getElementById('customerEmail').textContent = orderData.customer.email;
        document.getElementById('customerPhone').textContent = orderData.customer.phone;

        // Visa leveransadress
        const address = `Adress: ${orderData.customer.address.street}, Postnummer: ${orderData.customer.address.zip}, Postort: ${orderData.customer.address.city}`;
        document.getElementById('deliveryAddress').textContent = address;

        // Visa produktinformation
        displayProductDetails(productData);
    } else {
        // Visa felmeddelande om ingen order hittades
        document.querySelector('.receipt-container').innerHTML = `
            <div class="alert alert-warning">
                <h4>Ingen order hittades</h4>
                <p>Det verkar som att du kom hit direkt utan att göra en beställning.</p>
                <a href="index.html" class="btn btn-primary">Gå till startsidan</a>
            </div>
        `;
    }
    homeButton.addEventListener('click', () => {
        localStorage.clear();
        window.location.href = "index.html";
    });
});

function displayProductDetails(orderData) {
    const productDetails = document.getElementById('productInfo');
    const totalPrice = document.getElementById('totalPrice');

    if (!orderData || orderData.length === 0) {
        productDetails.innerHTML = '<h4 class="text-center">Inga produkter hittades!</h4>';
        return;
    } else {
        productDetails.innerHTML = orderData.map(item => `<img src="${item.image}" class="product-image img-fluid"> Product: ${item.title}, Price: $${item.price}, Quantity: ${item.antal}`).join('<br>');
const finalPrice = orderData.reduce((acc, item) => acc + (item.price * item.antal), 0).toFixed(2);
totalPrice.innerHTML = `<h4 class="text-center">Totalt pris: $${finalPrice}</h4>`;
    }
}

