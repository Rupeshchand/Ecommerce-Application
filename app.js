// fetching data into home page
let latestProducts = document.querySelector(".lp-row");
let fetchedData = [];

fetch("https://fakestoreapi.com/products").then(res => res.json()).then((data)=>{
    fetchedData = data;  
    displayProducts(fetchedData)  
})
.catch((err)=>{
    console.log(err);
})

function displayProducts(data){
    latestProducts.innerHTML = "";
    data.forEach((ele,i)=>{
        let cards = `
            <div class="card">
                <div class="card-body">
                <img src="${ele.image}" class="card-img-top" alt="images">
                    <h5 class="card-title">${ele.title}</h5>
                    <p class="card-text">${ele.description}</p>
                    <hr>
                    <p class="card-price">$ ${ele.price}</p>
                    <hr>
                    <div class="card-buttons">
                        <a href="" class="btnOne"><button>Details</button></a>
                        <a href="cart.html" class="btnTwo"><button>Add to cart</button></a>
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


//filtering the data based on category wise
const all = document.querySelector("#all-button")
const menCloth = document.querySelector("#men-button")
const womenCloth = document.querySelector("#women-button")
const jewelery = document.querySelector("#jewel-button")
const electronics = document.querySelector("#ele-button")

// all.addEventListener("click",()=>{
//     displayProducts(fetchedData)
// })
// menCloth.addEventListener("click",()=>{
//     let filterMen = fetchedData.filter((ele)=>{
//         return ele.category == "men's clothing"
//     })
//     displayProducts(filterMen)
// })
// womenCloth.addEventListener("click",()=>{
//     let filterWomen = fetchedData.filter((ele)=> ele.category == "women's clothing")
//     displayProducts(filterWomen)
// })
// jewelery.addEventListener("click",()=>{
//     let filterJewelery = fetchedData.filter((ele)=> ele.category == "jewelery")
//     displayProducts(filterJewelery)
// })
// electronics.addEventListener("click",()=>{
//     const filterElectronics = fetchedData.filter((ele)=> ele.category == "electronics")
//     displayProducts(filterElectronics)
// })

//toggle between login and register page
const loginPage = document.querySelector("#login-page");
const regstPage = document.querySelector("#register-page")
console.log(loginPage);
console.log(regstPage);


