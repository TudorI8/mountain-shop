export function mapProductToCard(product) {
	return `
				<div class="product-card flex-col gap-20 items-center justify-between">
					<h3 class="card-title">${product.name}</h3>
               <a href="pages/details.html?id=${product.id}">
                  <img src=${product.imageUrl} width="150px"/>
               </a>
					<p class="card-price">${product.price.toFixed(2)} lei</p>
               <button class="btn add-to-cart" 
                data-id="${product.id}"
                data-price="${product.price.toFixed(2)}"
                data-name="${product.name}"
                data-image="${product.imageUrl}">
               <i class="fa-solid fa-cart-shopping"></i>
               </button>
				</div>
      		`;
}

export function mapProductToAdminTableRow(product) {
	return `
            <tr>
               <td>${product.name}</td>
               <td>${product.price} lei</td>
               <td>
                  <a href="details.html?id=${product.id}">
                     <img src="${product.imageUrl}" width="50px" />
                  </a>
               </td>
               <td>
                  <button class="btn edit-${product.id}">
                     <i class="fa-solid fa-pen-to-square">
                     </i>
                  </button>
               </td>
               <td>
                  <button class="btn delete-${product.id}">
                     <i class="fa-solid fa-trash"></i>
                  </button>
               </td>
               
            </tr>
            `;
}