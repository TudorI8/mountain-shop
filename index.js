document.addEventListener('DOMContentLoaded', displayAllProducts);
const mainContainer = document.querySelector('.main');

function getAllProducts() {
    const url = "https://668d7a88099db4c579f318c8.mockapi.io/products";
    return fetch(url).then(response => response.json());
}

function displayAllProducts() {
    getAllProducts().then((products) => {
        mainContainer.innerHTML = products
            .map(
                (product) => `
          <div class="product-card flex-col gap-20 items-center justify-between">
             <h3 class="card-title">${product.name}</h3>
             <img src="${product.imageUrl}" width="150px" class="product-image" data-id="${product.id}" />
             <p class="card-price">${product.price} lei</p>
          </div>   
          `
            )
            .join(' ');

        const images = document.querySelectorAll('.product-image');
        images.forEach((image) => {
            image.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                window.location.href = `pages/details.html?id=${productId}`;
            });
        });
    });
}