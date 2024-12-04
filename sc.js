function addToCart(productId) {
    fetchProductById(productId).then((product) => {
        if (!product) return; 
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1; 
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart)); 
        updateCartCount(); 
    });
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartButton = document.querySelector('.cartCount');
    cartButton.innerHTML = `
        <i class="fa-solid fa-cart-shopping"></i> Cart 
        <span class="cartQtyCount text-black">(${totalQuantity})</span>
    `;
}



function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemListContainer = document.querySelector('.item-list');
    const totalItemsEl = document.getElementById('total-items');
    const subtotalEl = document.getElementById('subtotal');
    const totalAmountEl = document.getElementById('total-amount');
    const cartDataContainer = document.querySelector('.cartDataOfProducts');

    if (!itemListContainer || !cartDataContainer) return; 

    itemListContainer.innerHTML = ''; 

    if (cart.length === 0) {
        cartDataContainer.innerHTML = `
            <div class="text-center">
                <h3>Your Cart is Empty</h3>
                <a href="index.html" class="btn btn-dark mt-3">Continue Shopping</a>
            </div>`;
        return;
    }

    let subtotal = 0;
    cart.forEach((item) => {
        subtotal += item.price * item.quantity;

        const itemRow = document.createElement('div');
        itemRow.className = 'row mb-3';
        itemRow.innerHTML = `
            <div class="cart-list col-8 d-flex mb-3 ">
                <img src="${item.image}" class="ms-2">
                <h6 class="text-black  mt-5 ms-5 text-wrap ps-5">${item.title}</h6>
            </div>
            <div class="col-4 text-end  mb-3">
                <button class="btn btn-sm btn-outline-dark me-5  mt-4" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="me-5 mt-4 fs-5" >${item.quantity}</span>
                <button class="btn btn-sm btn-outline-dark  mt-4" onclick="updateQuantity(${item.id}, 1)">+</button>
                <p class="pt-5 fs-6 fw-medium pe-5">${item.quantity} x $${item.price}</p>
                </div>
            </div>
            <hr>
        `;
        itemListContainer.appendChild(itemRow);
    });

    totalItemsEl.textContent = cart.length;
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    totalAmountEl.textContent = `$${(subtotal + 30).toFixed(2)}`; 
}

function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find((item) => item.id === productId);

    if (product) {
        product.quantity += change;

        if (product.quantity <= 0) {
            cart = cart.filter((item) => item.id !== productId); 
        }

        localStorage.setItem('cart', JSON.stringify(cart)); 
        renderCartItems();
        updateCartCount(); 
    }
}


document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    
    const itemListContainer = document.querySelector('.item-list');
    if (itemListContainer) {
        renderCartItems();
    }
});