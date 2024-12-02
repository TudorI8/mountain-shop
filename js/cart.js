import { getProductById } from '../api/products.js';
import { updateCartBadge } from '../utils/layout.js';

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

    for (let id in cart) {
        const product = cart[id];

        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        const decreaseDisabled = product.quantity === 1 ? 'disabled' : '';
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
                    <button data-id="${id}" class="increase">+</button>
                </div>
            </div>
            <span class="product-price">${(product.price * product.quantity).toFixed(2)} lei</span>
            <button data-id="${id}" class="btn delete"><i class="fa-solid fa-trash"></i></button>
        `;
        total += product.price * product.quantity;
        cartItemsContainer.appendChild(productCard);
    }

    cartTotalContainer.innerHTML =
        total === 0
            ? 'Coșul de cumpărături este gol'
            : `Total: ${total.toFixed(2)} lei`;
}

cartItemsContainer.addEventListener('click', (e) => {
    const button = e.target;
    if (button.classList.contains('increase')) {
        const id = button.getAttribute('data-id');
        cart[id].quantity += 1;
    } else if (button.classList.contains('decrease')) {
        const id = button.getAttribute('data-id');
        cart[id].quantity -= 1;
        if (cart[id].quantity === 0) delete cart[id];
    } else if (button.classList.contains('delete') || button.closest('.delete')) {
        const id = button.getAttribute('data-id') || button.closest('.delete').getAttribute('data-id');
        delete cart[id];
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCartBadge();
});

updateCart();
