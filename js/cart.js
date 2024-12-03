import { updateCartBadge } from '../utils/helpers.js';

document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    updateCartBadge();
});

const cart = JSON.parse(localStorage.getItem('cart')) || {};
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalContainer = document.querySelector('.cart-total');

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

	const currentStock = JSON.parse(localStorage.getItem('stock')) || {};

    for (let id in cart) {
        const product = cart[id];

        const decreaseDisabled = product.quantity === 1 ? 'disabled' : '';
		const increaseDisabled = currentStock[id] && currentStock[id] <= 0 ? 'disabled' : '';

        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="details.html?id=${id}">
                <img width="40px" src="${product.imageUrl}" alt="${product.name}" />
            </a>
            <div class="product-details">
                <a href="details.html?id=${id}">
                    <span>${product.name}</span>
                </a>
                <div class="quantity-control">
                    <button data-id="${id}" ${decreaseDisabled} class="decrease">-</button>
                    <span>${product.quantity}</span>
                    <button data-id="${id}" ${increaseDisabled} class="increase">+</button>
                </div>
            </div>
            <span class="product-price">${(product.price * product.quantity).toFixed(2)} lei</span>
            <button data-id="${id}" class="btn delete"><i class="fa-solid fa-trash"></i></button>
        `;
        total += product.price * product.quantity;
        cartItemsContainer.appendChild(productCard);
		const buttonIncrease = productCard.querySelector('.increase');
        if (currentStock[id] <= 0) {
            buttonIncrease.setAttribute('disabled', true);
        } else {
            buttonIncrease.removeAttribute('disabled');
        }
    }

    cartTotalContainer.innerHTML =
        total === 0
            ? 'The shopping cart is empty!'
            : `Total: ${total.toFixed(2)} lei`;
}

cartItemsContainer.addEventListener('click', (e) => {
    const button = e.target;
	const id = button.getAttribute('data-id') || button.closest('.delete')?.getAttribute('data-id');
    if (!id) return;
	let currentStock = JSON.parse(localStorage.getItem('stock')) || {};

    if (button.classList.contains('increase')) {
        if (currentStock[id] && currentStock[id] > 0) {
            cart[id].quantity += 1;
            currentStock[id] -= 1;
        }
    } else if (button.classList.contains('decrease')) {
        cart[id].quantity -= 1;
        currentStock[id] = (currentStock[id] || 0) + 1;
        if (cart[id].quantity === 0) delete cart[id];
    } else if (button.classList.contains('delete') || button.closest('.delete')) {
        const quantity = cart[id]?.quantity || 0;
        currentStock[id] = (currentStock[id] || 0) + quantity;
        delete cart[id];
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('stock', JSON.stringify(currentStock));

    updateCart();
    updateCartBadge();
});

updateCart();