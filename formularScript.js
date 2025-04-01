document.addEventListener('DOMContentLoaded', function() {
    // Hämta produktens namn från URL:en
    const urlParams = new URLSearchParams(window.location.search);
    const produkt = urlParams.get('product');
    console.log('Produkt från URL:', produkt); // Korrigerad loggning
    
    // Fyll i det dolda fältet med produktens namn
    if (produkt) {
        const formElement = document.querySelector('form');
        console.log('Form hittad:', formElement);

        if (formElement) {
            // Visa produktnamnet för användaren (valfritt)
            const produktDisplay = document.createElement('p');
            produktDisplay.textContent = `Du beställer: ${produkt}`;
            formElement.prepend(produktDisplay);
        } else {
            console.error('Formuläret kunde inte hittas på sidan.');
        }
    } else {
        console.error('Ingen produkt hittades i URL:en.');
    }
});