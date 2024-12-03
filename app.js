//filtering the data based on category wise
const latestProducts =  document.querySelector(".row")
const all = document.querySelector("#allButton")
const menCloth = document.querySelector("#men-button")
const womenCloth = document.querySelector("#women-button")
const jewelery = document.querySelector("#jewel-button")
const electronics = document.querySelector("#ele-button")
const container =  document.querySelector("#cartContainer")
const url =  new URLSearchParams(window.location.search)
const productId =  url.get('id')

let fetchedData = [];
let cart = []

//fun to display products
        const rltdProducts =  document.querySelector(".uml-productcontainer ")
        
        async function fetchData() {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                fetchedData = data
                console.log(fetchedData);
                
                displayProducts(fetchedData)
                slideProducts(fetchedData)
                productDetails(fetchedData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        function displayProducts(data){
            latestProducts.innerHTML = "";
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
                                <button class="btnTwo" data-id="${product.id}">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                `
                latestProducts.insertAdjacentHTML("beforeend",cards)
            })
        }
        function slideProducts(data){
            if(rltdProducts){
                data.forEach((product)=>{
                    let productSlider = `
                    <div class="prod">
                        <img src="${product.image}" class="sliderImg" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <div class="card-buttons">
                            <button class="btnOne" data-id="${product.id}">Details</button>
                            <button class="btnTwo" data-id="${product.id}">Add to cart</button>
                        </div>
                    </div>`
                    rltdProducts.insertAdjacentHTML("beforeend",productSlider);
                })
            }
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
            if(pdContainer){
                pdContainer.innerHTML = 
                `
                <div class="pd-part1">
                    <img src="${product.image}" class="pd-img" alt="${product.title}">
                </div>
                <div class="pd-part2">
                    <h5 class="pd-category">MEN'S CLOTHING</h5>
                    <h2 class="pd-title">${product.title}</h2>
                    <p class="pd-rating">${product.rating["rate"]}<sppan class="star">★</span></p>
                    <p class="pd-price">$${product.price}</p>
                    <p class="pd-desc">${product.description}</p>
                    <div class="pd-btns">
                        <button class="pd-btnTwo">Add to cart</button>
                        <a href="cart.html"><button class="go-cart">Go to cart</button></a>
                    </div>
                </div>`
            }
        }
        latestProducts.addEventListener("click",(e)=>{
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
        
            if(target.classList.contains("btnTwo")){
                const productId = target.dataset.id
                console.log("Add to Cart clicked. Product ID:", productId);
        
                const product = fetchedData.find((item) => item.id == productId)
                if(product){
                    addToCart(product)
                }
            }
        })   
        function addToCart(product){
            const existingProduct = cart.find((item)=>item.id == product.id)
            if(existingProduct){
                existingProduct.quantity += 1;
            }
            else{
                cart.push({...product,quantity:1})
            }
            updateCartCount();
            saveCartToLocalStorage();
        }
        
        function updateCartCount(){
            const cartCount = document.querySelector(".cart-count")
            if(cartCount){
                cartCount.textContent =  cart.length
            }
        }
        
        function saveCartToLocalStorage() {
            localStorage.setItem("cart",JSON.stringify(cart));
        }
        
        function loadCartFromStorage(){
            const savedCart = localStorage.getItem("cart")
            if(savedCart){
                cart =  JSON.parse(savedCart)
                updateCartCount()
            }
        }
        all?.addEventListener("click",()=> filterProducts("all"))
        menCloth?.addEventListener("click",()=> filterProducts("men's clothing"))
        womenCloth?.addEventListener("click",()=> filterProducts("women's clothing"))
        jewelery?.addEventListener("click",()=> filterProducts("jewelery"))
        electronics?.addEventListener("click",()=> filterProducts("electronics"))    
document.addEventListener("DOMContentLoaded",()=>{
    fetchData();
})
