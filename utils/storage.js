export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || {};
}

export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function getStock() {
    return JSON.parse(localStorage.getItem('stock')) || {};
}

export function saveStock(stock) {
    localStorage.setItem('stock', JSON.stringify(stock));
}