import { updateCartBadge } from '../utils/helpers.js';
import { getCart,
		 saveCart,
		 getStock,
		 saveStock,
} from '../utils/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    updateCartBadge();
});

const cart = getCart();
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalContainer = document.querySelector('.cart-total');

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    const currentStock = getStock();

    if (Object.keys(cart).length === 0) {
        cartItemsContainer.innerHTML = `<p>Your shopping cart is empty!</p>`;
        cartTotalContainer.innerHTML = '';
        return;
    }

    const table = document.createElement('table');
    table.className = 'cart-table';

    const tbody = document.createElement('tbody');

    for (let id in cart) {
        const product = cart[id];

        const decreaseDisabled = product.quantity === 1 ? 'disabled' : '';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <a href="details.html?id=${id}">
                    <img width="50px" src="${product.imageUrl}" alt="${product.name}" />
                </a>
            </td>
            <td>
                <a href="details.html?id=${id}">${product.name}</a>
            </td>
            <td>${product.price.toFixed(2)} lei</td>
            <td>
                <div class="quantity-control">
                    <button data-id="${id}" ${decreaseDisabled} class="decrease">-</button>
                    <span>${product.quantity}</span>
                    <button data-id="${id}" class="increase">+</button>
                </div>
            </td>
            <td>${(product.price * product.quantity).toFixed(2)} lei</td>
            <td>
                <button data-id="${id}" class="btn delete">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);

        const buttonIncrease = row.querySelector('.increase');
        if (currentStock[id] <= 0) {
            buttonIncrease.setAttribute('disabled', true);
        } else {
            buttonIncrease.removeAttribute('disabled');
        }

        total += product.price * product.quantity;
    }

    table.appendChild(tbody);
    cartItemsContainer.appendChild(table);

    cartTotalContainer.innerHTML = `Total: ${total.toFixed(2)} lei`;
}

cartItemsContainer.addEventListener('click', (e) => {
    const button = e.target;
	const id = button.getAttribute('data-id') || button.closest('.delete')?.getAttribute('data-id');
    if (!id) return;
	let currentStock = getStock();

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

    saveCart(cart);
	saveStock(currentStock);
	
    updateCart();
    updateCartBadge();
});

updateCart();