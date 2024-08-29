import { getProductById } from '../api/products.js';

document.addEventListener('DOMContentLoaded', () => {
	const cart = JSON.parse(localStorage.getItem('cart'));
	const cartItemsContainer = document.querySelector('.cart-items');
	const cartTotalContainer = document.querySelector('.cart-total');

	console.log(cart);

	function updateCart() {
		cartItemsContainer.innerHTML = '';
		let total = 0;

		for (let id in cart) {
			const product = cart[id];

			const productCard = document.createElement('div');
			productCard.className = 'product-card';
			const descreaseDisabled = product.quantity === 1 ? 'disabled' : '';
			productCard.innerHTML = `
			<a href="details.html?id=${id}">
			<img width="40px" src=${product.imageUrl} />
			</a>
				<div class="product-details">
            	<a href="details.html?id=${id}">
				<span>${product.name}</span>
				</a>
            	<div class="quantity-control">
					<button data-id=${id} ${descreaseDisabled} class="decrease">-</button>
					<span>${product.quantity}</span>
					<button data-id=${id} class="increase">+</button>
            	</div>
				</div>
				<span class="product-price">${(product.price * product.quantity).toFixed(2)} lei</span>
				<button data-id=${id} class="btn delete"><i class="fa-solid fa-trash"></i></button>
        	`;
			total = total + product.price * product.quantity;
			cartItemsContainer.appendChild(productCard);
		}
		cartTotalContainer.innerHTML =
			total === 0 ? 'Cosul de cumparaturi este gol' : `Total: ${total.toFixed(2)} lei`;
	}

	cartItemsContainer.addEventListener('click', (e) => {
		if (e.target.classList.contains('increase')) {
			const id = e.target.getAttribute('data-id');
			cart[id].quantity += 1;
		} else if (e.target.classList.contains('decrease')) {
			const id = e.target.getAttribute('data-id');
			cart[id].quantity -= 1;
		} else if (e.target.classList.contains('delete') || e.target.closest('.delete')) {
			const id = (e.target.classList.contains('delete')) 
            ? e.target.getAttribute('data-id') 
            : e.target.closest('.delete').getAttribute('data-id');
			delete cart[id];
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		updateCart();
	});

	updateCart();
});