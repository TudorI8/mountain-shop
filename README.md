# E-commerce Web Application

This project consists of four HTML pages, each incorporating JavaScript and CSS (in separate files), to implement the necessary functionalities for an e-commerce-like application. AJAX is used to communicate with the server, and the response is mapped to JavaScript classes.

## Pages Overview

### 1. `index.html` - Product Listing Page
- Displays a list of products fetched from a server in JSON format.
- The request to the server is made using the AJAX technique.
- In the gif below, there is an example of how the implementation of this page could look.
![Talcioc-index](https://github.com/user-attachments/assets/68b1b474-25ec-4728-8d7c-62192d608f65)

### 2. `details.html` - Product Details Page
- This page receives the product ID as a query parameter (e.g., `details.html?id=0`, where `0` is the product ID).
- It displays the product’s image, name, description, price, and available stock.
- A button labeled "Add to Cart" is included, which, when clicked, shows a message informing the user that the product has been added to the cart.
- Products added to the cart are stored using the browser’s `localStorage` functionality.
- In the gif below, there is an example of how the implementation of this page could look.
![Talcioc-details](https://github.com/user-attachments/assets/e0f73c7a-d7f9-44b0-8fc4-2d6ef43bd8d3)

### 3. `cart.html` - Shopping Cart Page
- This page reads all items stored in `localStorage` and displays them in a table format.
- Each row in the table represents an item added to the cart, with the following features:
  - The ability to adjust the quantity of each product (increase/decrease).
  - A "Remove" function to delete the product from the cart.
  - Each product name in the list contains a link to the product's details page.
- Whenever the cart contents are updated, the total and subtotals are recalculated automatically.
- In the gif below, there is an example of how the implementation of this page could look.
![Talcioc-cart](https://github.com/user-attachments/assets/c0f06837-ed7c-4a01-a1d8-0ea4cdf0e6e8)

### 4. `admin.html` - Product Management Page
- The admin page allows the management of the products displayed on `index.html` and `details.html`.
- This page is a graphical interface that communicates with a server using AJAX to handle CRUD operations (GET, POST, PUT, DELETE) for managing available products.
- The product table contains a column with product names. Clicking a product name will show a form to add or edit the product details.
- Each product consists of the following information: image, name, description, price, and available stock.
- Items in the product list can be deleted from the server using a "Remove" button.
![Talcioc-admin](https://github.com/user-attachments/assets/0a708cf1-fda9-4027-96cc-4f29690890f8)

## Technologies Used
- **HTML**: Structure of the application.
- **CSS**: Styling the pages.
- **JavaScript**: Handling the logic and functionality, including AJAX requests.
- **AJAX**: Asynchronous communication with the server.
- **LocalStorage**: Storing cart data in the browser.
