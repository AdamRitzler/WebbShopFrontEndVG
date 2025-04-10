document.addEventListener('DOMContentLoaded', function () {
    // Hämta produktens namn från URL:en
    const order = JSON.parse(localStorage.getItem('orders')) || [];
    const produkt = order.reduce((acc, item) => acc + (acc ? ', ' : '') + item.title, '') || null;
    const price = order.reduce((acc, item) => acc + (acc ? ', ' : '') + item.price, '') || null;
    const totalPrice = order.reduce((acc, item) => acc + (item.price * item.antal), 0).toFixed(2) || null;
    const image = order.reduce((acc, item) => acc + (acc ? ', ' : '') + item.image, '') || null;
    const antal = order.reduce((acc, item) => acc + (acc ? ', ' : '') + item.antal, '') || null;

    // Visa produktnamn om det finns
    const produktDisplay = document.getElementById('productInfo');
    const totalPriceDisplay = document.getElementById('totalPrice');
    if (produktDisplay && produkt) {
        produktDisplay.innerHTML = `Du beställer:<br>${produkt}`;
        totalPriceDisplay.textContent = `Totalt pris: $${totalPrice}`;
    } else {
        console.error('Produktnamn hittades inte i URL eller elementet för produktnamn hittades inte!');
        alert("Ingen product hittades, Vänligen välj en produkt.");
        return;
    }

    // Formulärvalidering
    const form = document.getElementById('checkoutForm');
    if (!form) {
        console.error('Formuläret hittades inte!');
        return;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const postal = document.getElementById('postal').value.trim();
        const city = document.getElementById('city').value.trim();

        let errors = [];

        if (name.length < 2 || name.length > 50) errors.push("Namn måste vara 2–50 tecken.");
        if (!email.includes('@') || email.length > 50) errors.push("Ogiltig e-post.");
        if (!/^[0-9\-\(\) ]+$/.test(phone) || phone.length > 50) errors.push("Ogiltigt telefonnummer, Max 50 tecken.");
        if (address.length < 2 || address.length > 50) errors.push("Ogiltig adress.");
        if (!/^\d{5}$/.test(postal)) errors.push("Postnummer måste vara exakt 5 siffror.");
        if (city.length < 2 || city.length > 50) errors.push("Ogiltig ort.");

        if (errors.length > 0) {
            alert("Formulärfel:\n" + errors.join("\n"));
        } else {
            const orderData = {
                orderNumber: Math.floor(Math.random() * 1000000), // Slumpmässigt ordernummer
                orderDate: new Date().toISOString(),
                customer: {
                    name: name,
                    email: email,
                    phone: phone,
                    address: {
                        street: address,
                        zip: postal,
                        city: city
                    }
                },
                product: {
                    title: produkt || 'Okänd produkt',
                    price: price || 'Okänt pris',
                    image: image || 'okänd bild',
                    antal: antal || 'Okänt antal'
                }

            };
            localStorage.setItem('currentOrder', JSON.stringify(orderData));

            window.location.href = "kvitto.html";
        }
    });
});
