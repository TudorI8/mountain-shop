import { getAllProducts } from './api/products.js';
import { mapProductToCard } from './utils/layout.js';
import { updateCartBadge,
		 handleAddToCart,
		 getProductStock,
		 updateAddToCartButtons,
} from './utils/helpers.js';

document.addEventListener('DOMContentLoaded', () => {
    displayAllProducts();
    updateCartBadge();
	updateAddToCartButtons();
});
const mainContainer = document.querySelector('.main');
const categoryFilterContainer = document.querySelector('.category');
const manufacturerFilterContainer = document.querySelector('.manufacturer');

async function displayAllProducts() {
	const products = await getAllProducts();

	let currentStock = JSON.parse(localStorage.getItem('stock')) || {};
    products.forEach((product) => {
        if (!(product.id in currentStock)) {
            currentStock[product.id] = Number(product.stock);
        }
    });
    localStorage.setItem('stock', JSON.stringify(currentStock));

	mainContainer.innerHTML = products.map(mapProductToCard).join(' ');
	updateAddToCartButtons();

	const addToCartButtons = document.querySelectorAll('.add-to-cart');
	addToCartButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const productId = button.getAttribute('data-id');
			const price = parseFloat(button.getAttribute('data-price'));
			const name = button.getAttribute('data-name');
			const imageUrl = button.getAttribute('data-image');

			handleAddToCart(productId, { price, name, imageUrl });

            const updatedStock = getProductStock(productId);
            if (updatedStock <= 0) {
                button.disabled = true;
                button.textContent = 'Out of Stock';
            }
		});
	});

	const category = products.map((product) => product.category);
	const uniqueCategory = Array.from(new Set(category));

	categoryFilterContainer.innerHTML = `
		<div class="filter-reset" data-category="all">All Categories</div>
		${uniqueCategory
			.map(
				(category) =>
					`
				<div class="category-filter" data-category="${category}">
					${category}
				</div>
			`
			)
			.join('')}
	`;

	categoryFilterContainer.addEventListener('click', (e) => {
		if (e.target.classList.contains('category-filter')) {
			const category = e.target.getAttribute('data-category');
			mainContainer.innerHTML = products
				.filter((product) => product.category == category)
				.map(mapProductToCard)
				.join(' ');
		} else if (e.target.classList.contains('filter-reset')) {
			mainContainer.innerHTML = products.map(mapProductToCard).join(' ');
		}
	});

	const manufacturer = products.map((product) => product.manufacturer);
	const uniqueManufacturer = Array.from(new Set(manufacturer));

	manufacturerFilterContainer.innerHTML = `
		<div class="filter-reset" data-manufacturer="all">All Manufacturers</div>
		${uniqueManufacturer
			.map(
				(manufacturer) =>
					`
				<div class="manufacturer-filter" data-manufacturer="${manufacturer}">
					${manufacturer}
				</div>
			`
			)
			.join('')}
	`;

	manufacturerFilterContainer.addEventListener('click', (e) => {
		if (e.target.classList.contains('manufacturer-filter')) {
			const manufacturer = e.target.getAttribute('data-manufacturer');
			mainContainer.innerHTML = products
				.filter((product) => product.manufacturer == manufacturer)
				.map(mapProductToCard)
				.join(' ');
		} else if (e.target.classList.contains('filter-reset')) {
			mainContainer.innerHTML = products.map(mapProductToCard).join(' ');
		}
	});
}