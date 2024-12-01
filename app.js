//filtering the data based on category wise
let latestProducts =  document.querySelector(".row")
let all = document.querySelector("#allButton")
let menCloth = document.querySelector("#men-button")
let womenCloth = document.querySelector("#women-button")
let jewelery = document.querySelector("#jewel-button")
let electronics = document.querySelector("#ele-button")
let container =  document.querySelector("#cartContainer")
let fetchedData = [];


// fetching data into home page
fetch("https://fakestoreapi.com/products").then(res => res.json()).then((data)=>{
    fetchedData = data;  
    displayProducts(fetchedData)  
})
.catch((err)=>{
    console.log(err);
})

//fun to display products
function displayProducts(data){
    latestProducts.innerHTML = "";
    data.forEach((product)=>{
        let cards = `
        <div class="col-lg-4 col-md-6">
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="images">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <hr class="price-hr">
                    <p class="card-price">$ ${product.price}</p>
                    <hr class="price-hr">
                    <div class="card-buttons">
                        <a href=""><button class="btnOne">Details</button></a>
                        <a href="cart.html"><button class="btnTwo">Add to cart</button></a>
                    </div>
                </div>
            </div>
        </div>
        `
        latestProducts.insertAdjacentHTML("beforeend",cards)
        document.querySelectorAll(".card-title").forEach((title)=>{
            const maxLength = 11;
            if(title.textContent.length > maxLength){
                title.textContent = title.textContent.slice(0,maxLength)+ "...";
            }
        })
        document.querySelectorAll(".card-text").forEach((text)=>{
            const maxLength = 90;
            if(text.textContent.length > maxLength){
                text.textContent =  text.textContent.slice(0,maxLength)+"...";
            }
        })
    })
}

if(all){
    all.addEventListener("click",()=>{
        displayProducts(fetchedData)
    })
}
if(menCloth){
    menCloth.addEventListener("click",()=>{
        let filterMen = fetchedData.filter((ele)=>{
            return ele.category == "men's clothing"
        })
        displayProducts(filterMen)
    })    
}
if(womenCloth){
    womenCloth.addEventListener("click",()=>{
        let filterWomen = fetchedData.filter((ele)=> ele.category == "women's clothing")
        displayProducts(filterWomen)
    })
}
if(jewelery){
    jewelery.addEventListener("click",()=>{
        let filterJewelery = fetchedData.filter((ele)=> ele.category == "jewelery")
        displayProducts(filterJewelery)
    })
}
if(electronics){
    electronics.addEventListener("click",()=>{
        let filterElectronics = fetchedData.filter((ele)=> ele.category == "electronics")
        displayProducts(filterElectronics)
    })    
}

//adding to cart
let head = document.querySelector("#cardTitle");
document.querySelectorAll(".btnTwo").forEach((btn,i)=>{
    btn.addEventListener("click",()=>{
        const product = fetchedData[i];
        addToCart(product);
        updateCartDisplay();
    })
})
let cart = []
function addToCart(product){
    cart.push(product)    
}
function updateCartDisplay(){
    let cartCon = document.querySelector("#cartContainer")
    cartCon.innerHTML = "";
    head.innerHTML = "";
    if(cart.length == 0){
        cartCon,innerHTML = "<p>Your cart is empty</p>";
        return;
    }
    let cart = `
    <table>
        <thead>
            <tr>
                <th>Item<th>
                <th>Quantity<th>
                <th>Price<th>
                <th>Total<th>
            </tr>
        </thead>
    <tbody>
}`
let totalAmt = 0;
cart.forEach(item=>{
    const itemTotal = item.price*item.quantity;
    totalAmt += itemTotal;
    cart += `
    <tr>
        <td>${item.name}</td>
        <td>
            <button onclick = "decreaseQty("${item.name}")">-</button>
            ${item.quantity}
            <button onclick = "increaseQty("${item.name}")">+</button>
        </td>
        <td>$${item.price}</td>
        <td>$${itemTotal}</td>
    </tr>
`
})

cart += `</tbody>
    </table>
    <div>
        <p>Total Amount: $${totalAmt}</p>
        <button onclick="checkout()">Checkout</button>
    </div>`

    cartCon.innerHTML = cart;
}

function increaseQty(productName){
    const product = cart.find(item=>item.name == productName);
    if(product){
        product.quantity++;
        updateCartDisplay();
    }
}

function decreaseQty(productName){
    const product = cart.find(item=>item.name == productName);
    if(product && product.quantity>1){
        product.quantity--;
    }
    else{
        cart = cart.filter(item=>item.name != productName)
    }
    updateCartDisplay()
}

function saveCartToStorage(){
    localStorage.setItem("cart", JSON.stringify(cart));
}
function loadCartFromStorage() {
    const savedCart = localStorage.getItem("cart");
    if(savedCart){
        cart = JSON.parse(savedCart);
        updateCartDisplay()
    }    
}

window.onload = loadCartFromStorage