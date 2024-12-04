import { getCart,
         saveCart,
         getStock,
         saveStock,
} from './storage.js';

export function updateCartBadge() {
    const cart = getCart();
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-badge');

    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

export function handleAddToCart(productId, { price, name, imageUrl }) {
    let cart = getCart();
    let stock = getStock();

    stock[productId] = Number(stock[productId]);

    if (!stock[productId] || stock[productId] <= 0) {
        showNotification(`The product ${name} is out of stock!`);
        return;
    }

    if (cart[productId]) {
        cart[productId].quantity += 1;
    } else {
        cart[productId] = {
            quantity: 1,
            price,
            name,
            imageUrl,
        };
    }

    stock[productId] -= 1;

    saveCart(cart);
    saveStock(stock);

    updateAddToCartButtons();
    showNotification(`The product ${name} has been added to the cart!`);
    updateCartBadge();
}

export function getProductStock(productId) {
    const stock = getStock();
    return Number(stock[productId] || 0);
}

export function updateAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const currentStock = getStock();
    
    addToCartButtons.forEach((button) => {
        const productId = button.getAttribute('data-id');
        const updatedStock = Number(currentStock[productId] || 0);
        
        if (updatedStock <= 0) {
            button.disabled = true;
            button.textContent = 'Out of Stock';
            button.style.cursor = 'not-allowed';
        } else {
            button.disabled = false;
            button.style.cursor = 'pointer';
        }
    });
}