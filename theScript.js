fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        const titleElements = document.querySelectorAll(`.product-title`);
        titleElements.forEach((titleElement, index) => {
            if (data[index]) {
                titleElement.textContent = data[index].title;
            }
        });

        const priceElements = document.querySelectorAll(`.product-price`);
        priceElements.forEach((priceElement, index) => {
            if (data[index]) {
                priceElement.textContent = `$${data[index].price}`;
            }
        });

        data.forEach((product, index) => {
            const imgElement = document.getElementById(`product${index + 1}`);
            if (imgElement) {
                imgElement.src = product.image;
            }
        });
    });
document.querySelectorAll('.purchase-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.card');

        const productName = productCard.querySelector('.product-title').textContent.trim();
        window.location.href = `formular.html?product=${encodeURIComponent(productName)}`;
    });
});   

//fetch('https://fakestoreapi.com/products')
//   .then(data => console.log(data));