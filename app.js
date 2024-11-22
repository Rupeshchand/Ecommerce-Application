let latestProducts = document.querySelector(".row");
console.log(latestProducts);

fetch("https://fakestoreapi.com/products").then(res => res.json()).then((data)=>{
    data.forEach((ele,i)=>{
        let cards = `
        <div class="col">
            <div class="card">
                <img src="${ele.image}" class="card-img-top" alt="images">
                <div class="card-body">
                    <h5 class="card-title">${ele.title}</h5>
                    <p class="card-text">${ele.description}</p>
                    <p class="card-price">${ele.price}</p>
                    <div class="lp-buttons">
                        <a href="" class="btnOne"><button>Details</button></a>
                        <a href="" class="btnTwo"><button>Add to cart</button></a>
                    </div>
                </div>
            </div>
        </div>
        `
        latestProducts.insertAdjacentHTML("beforeend",cards)
    })
})
.catch((err)=>{
    console.log(err)
})
