fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.container');
        if (!container) {
            console.error('Container-elementet hittades inte!');
            return;
        }
        container.innerHTML = '';

        let row;
        data.forEach((product, index) => {
            if (index % 5 === 0) {
                row = document.createElement('div');
                row.className = 'row justify-content-center';
                container.appendChild(row);
            }

            const col = document.createElement('div');
            col.className = 'col-6 col-sm-4 col-md3 col-lg-2 g-5';

            col.innerHTML = `
            <div class="card">
             <h4 class="product-title text-center fs-5">${product.title}</h4>
            <img src="${product.image}" alt="${product.title}" class="img-fluid">
            <p class="text-center product-price">$${product.price}</p>
            <button class="btn btn-primary purchase-btn" data-id="product${index + 1}">Lägg i varukorg</button>
            </div>
            `;


            row.appendChild(col);
        });



        document.querySelectorAll('.purchase-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const product = data[index];
                if (!product) {
                    console.error('Produkten hittades inte!');
                    return;
                }

                let orders = JSON.parse(localStorage.getItem('orders')) || [];
                let existingOrder = orders.find(order => order.title === product.title);
                let antal = existingOrder ? existingOrder.antal + 1 : 1;

                const order = {
                    title: product.title || 'Okänd produkt',
                    price: product.price || 'Okänt pris',
                    image: product.image || 'okänd bild',
                    antal: antal
                };
                saveProductOrder(order);
                console.log(order);

            });
        });
        function saveProductOrder(order) {
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            const existingIndex = orders.findIndex(o => o.title === order.title);

            if (existingIndex !== -1) {
                orders[existingIndex].antal = order.antal;
            } else {
                orders.push(order);
            }

            localStorage.setItem('orders', JSON.stringify(orders));
            updateCartCount();
        }

        function updateCartCount() {
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            const numberOfItemsInCart = orders.length;
            document.getElementById("varukorg-btn").innerHTML = "Varukorg (" + numberOfItemsInCart + ")";
        }
        updateCartCount();
    })
    .catch(error => console.error('Fel vid hämtning av produkter:', error));
