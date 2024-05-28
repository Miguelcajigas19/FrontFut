import config from './config.js'; // Asegúrate de que la ruta sea correcta según tu estructura de proyecto

async function loadProducts() {
    try {
        const response = await fetch(`${config.backendUrl}/api/almacenes`);
        if (!response.ok) throw new Error('Error en la solicitud: ' + response.statusText);

        const products = await response.json();
        console.log('Productos cargados:', products);

        const sections = {
            'Motor': document.getElementById('motor').querySelector('.product-list'),
            'Cuidado del Motor': document.getElementById('cuidado-del-motor').querySelector('.product-list'),
            'Extras': document.getElementById('extras').querySelector('.product-list')
        };

        products.forEach(product => {
            const price = parseFloat(product.precio);
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${product.nombre} - $${price.toFixed(2)}
                <button class="add-to-cart-btn" onclick="addToCart('${product.nombre}', ${price})">Agregar al carrito</button>
            `;
            sections[product.categoria].appendChild(listItem);
        });
    } catch (error) {
        console.error('Error cargando los productos:', error);
    }
}

function addToCart(productTitle, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ title: productTitle, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productTitle} ha sido agregado al carrito.`);
}

window.onload = loadProducts;
