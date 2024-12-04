//filtering the data based on category wise
const latestProducts =  document.querySelector(".fetchProducts")
const all = document.querySelector("#allButton")
const menCloth = document.querySelector("#men-button")
const womenCloth = document.querySelector("#women-button")
const jewelery = document.querySelector("#jewel-button")
const electronics = document.querySelector("#ele-button")
const url =  new URLSearchParams(window.location.search)
const productId =  url.get('id')
const rltdProducts =  document.querySelector(".uml-productcontainer ")

let fetchedData = [];
// let cart = []

//fun to display products
        async function fetchData() {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                fetchedData = data
                const url = new URLSearchParams(window.location.search);
                const productId = url.get('id')
                if(productId){
                    const product = data.find((item)=>item.id == productId);
                    if(product){
                        productDetails(product)
                    }
                    else{
                        console.log("Product not found", productId);
                        
                    }
                }
                if(latestProducts){
                    displayProducts(data)

                }
                if(rltdProducts){
                    slideProducts(data)

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        function displayProducts(data){
            latestProducts.innerHTML = ""
            data.forEach((product)=> {
                const truncateTitle =  truncateText(product.title,11)
                const truncateDes = truncateText(product.description,90)
                let cards = `
                <div class="col-lg-4 col-md-6">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${truncateTitle}</h5>
                            <p class="card-text">${truncateDes}</p>
                            <hr class="price-hr">
                            <p class="card-price">$ ${product.price}</p>
                            <hr class="price-hr">
                            <div class="card-buttons">
                                <button class="btnOne" data-id="${product.id}" onclick="window.location.href='product-details.html?id=${product.id}'">Details</button>
                                <button class="btnTwo" data-id= "${product.id}">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                `
                latestProducts.insertAdjacentHTML("beforeend",cards)

            })
            document.querySelectorAll(".btnTwo").forEach((button)=>{
                button.addEventListener('click', (e) => {
                    const productId =  parseInt(e.target.dataset.id,10)
                    addToCart(productId);
                });        
            
            })
        }
        function filterProducts(category){
            let filteredData = []
            if(category == "all"){
                filteredData = fetchedData;
            }
            else{
                filteredData =  fetchedData.filter((product)=> product.category == category)
            }
            displayProducts(filteredData)
        }
        function truncateText(text,maxLength){
            return text.length > maxLength ? text.slice(0,maxLength)+ "...":text
        }
        function productDetails(product){
            let pdContainer = document.querySelector(".product-details");
            console.log(pdContainer);
            if(pdContainer){
                    pdContainer.innerHTML = 
                    `
                    <div class="pd-part1">
                        <img src="${product.image}" class="pd-img" alt="${product.title}">
                    </div>
                    <div class="pd-part2">
                        <h5 class="pd-category">MEN'S CLOTHING</h5>
                        <h2 class="pd-title">${product.title}</h2>
                        <p class="pd-rating">${product.rating["rate"]}<span class="star">★</span></p>
                        <p class="pd-price">$${product.price}</p>
                        <p class="pd-desc">${product.description}</p>
                        <div class="pd-btns">
                            <button class="pd-btnTwo">Add to cart</button>
                            <a href="cart.html"><button class="go-cart">Go to cart</button></a>
                        </div>
                    </div>`
            }
            pdContainer.addEventListener("click",(e)=>{
                const target = e.target
                if(target.classList.contains("btnOne")){
                    const productId = target.dataset.id;
                    const product =  fetchedData.find((item)=>item.id == productId)
                    if(product){
                        window.location.href=`product-details.html?id=${productId}`
                    }
                    else{
                        console.error("Product not found")
                    }
                }
            }) 
        }
        function slideProducts(data){
            if(rltdProducts){
                rltdProducts.innerHTML="";
                data.forEach((product)=>{
                    let productSlider = `
                    <div class="prod">
                        <div class="prod-items">
                            <img src="${product.image}" class="sliderImg" alt="${product.title}">
                            <h3 class="slider-title">${product.title}</h3>
                            <div class="card-buttons">
                                <button class="btnOne" data-id="${product.id}">Details</button>
                                <button class="btnTwo" data-id="${product.id}">Add to cart</button>
                            </div>
                        </div>
                    </div>`
                    rltdProducts.insertAdjacentHTML("beforeend",productSlider);
                })
            }
        }
        all?.addEventListener("click",()=> filterProducts("all"))
        menCloth?.addEventListener("click",()=> filterProducts("men's clothing"))
        womenCloth?.addEventListener("click",()=> filterProducts("women's clothing"))
        jewelery?.addEventListener("click",()=> filterProducts("jewelery"))
        electronics?.addEventListener("click",()=> filterProducts("electronics"))        
    fetchData();

    async function fetchProductById(productId) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            if (!response.ok) {
                throw new Error(`Error fetching product with ID: ${productId}`);
            }
            const product = await response.json();
            return product;
        } catch (error) {
            console.error('Error fetching product:', error);
        }
      }
      async function addToCart(productId) {
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
          console.log(cart);
          
          const itemListContainer = document.querySelector('.item-list');
          const totalItemsEl = document.getElementById('total-items');
          const subtotalEl = document.getElementById('subtotal');
          const totalAmountEl = document.getElementById('total-amount');
          const cartDataContainer = document.querySelector('.cartDataOfProducts');

          if (!itemListContainer || !cartDataContainer) return; 

          itemListContainer.innerHTML = ''; 

          if (cart.length === 0) {
              cartDataContainer.innerHTML = `
                  <div class="container">
                      <h3 class="cart-login-title">Your Cart is Empty</h3>
                      <a href="products.html" class="btn continue-shop"><i class="fa-solid fa-arrow-left"></i>Continue Shopping</a>
                  </div>`;
              return;
          }

          let subtotal = 0;
          cart.forEach((item) => {
              subtotal += item.price * item.quantity;

              const itemRow = document.createElement('div');
              itemRow.className = 'row mb-3 seperate';
              itemRow.innerHTML = `
                  <div class="cart-list col-8 d-flex mb-3 ">
                      <img src="${item.image}" class="ms-2">
                      <h6 class="text-black  mt-5 ms-5 text-wrap ps-5">${item.title}</h6>
                  </div>
                  <div class="col-4 text-end  mb-3">
                      <button class="btn btn-sm btn-outline-dark me-5  c-btns mt-4" onclick="updateQuantity(${item.id}, -1)">-</button>
                      <span class="me-5 mt-4 fs-5 quantity" >${item.quantity}</span>
                      <button class="btn btn-sm btn-outline-dark  mt-4 c-btns" onclick="updateQuantity(${item.id}, 1)">+</button>
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