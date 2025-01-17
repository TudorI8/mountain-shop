import { getAllProducts,
		 getProductById,
		 deleteProduct,
		 addNewProduct,
		 updateProduct,
} from '../api/products.js';
import { mapProductToAdminTableRow } from '../utils/layout.js';
import { updateCartBadge } from '../utils/helpers.js';

// load products in table at page loading
const productsTableBody = document
	.getElementById('products-table')
	.querySelector('tbody');

document.addEventListener('DOMContentLoaded', () => {
    displayAllProducts();
    updateCartBadge();
});

async function displayAllProducts() {
		const products = await getAllProducts();

		productsTableBody.innerHTML = products
			.map(mapProductToAdminTableRow)
			.join('');
}

// save new product
const form = document.getElementById('product-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const imageUrlInput = document.getElementById('image-url');
const detailsInput = document.getElementById('details');
const categoryInput = document.getElementById('category');
const manufacturerInput = document.getElementById('manufacturer');
const stockInput = document.getElementById('stock');

const saveProductButton = document.getElementById('save-btn');
let editMode = false;
let currentEditableProductId;

saveProductButton.addEventListener('click', saveProduct);

async function saveProduct(event) {
	event.preventDefault();

	const product = {
		name: nameInput.value,
		price: Number(priceInput.value),
		imageUrl: imageUrlInput.value,
		stock: Number(stock.value),
		details: detailsInput.value,
		category: categoryInput.value,
        manufacturer: manufacturerInput.value,
	};
		if (editMode) {
		const editedProduct = await updateProduct(
			product,
			currentEditableProductId
		);
		if (editedProduct !== null) {
			form.reset();
			displayAllProducts();
			editMode = false;
		}
	} else {
		const newProduct = await addNewProduct(product);
		if (newProduct !== null) {
			form.reset();
			displayAllProducts();
		}
	}
}

// edit product
productsTableBody.addEventListener('click', handleActions);

async function handleActions(event) {
	const className = event.target.parentElement.className;
	if (className.includes('edit')) {
		const productId = className.split('-')[1];
		editProduct(productId);
	} else if (className.includes('delete')) {
		const productId = className.split('-')[1];
		await deleteProduct(productId);
		await displayAllProducts();
	}
}

function editProduct(id) {
	getProductById(id).then((product) => {
		editMode = true;
		nameInput.value = product.name;
		priceInput.value = product.price;
		imageUrlInput.value = product.imageUrl;
		stockInput.value = product.stock;
		detailsInput.value = product.details;
        categoryInput.value = product.category;
        manufacturerInput.value = product.manufacturer;

		currentEditableProductId = product.id;
	});
}