let latestProducts = document.querySelector(".lp-row");
console.log(latestProducts);

fetch("https://fakestoreapi.com/products").then(res => res.json()).then((data)=>{
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
    })

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
.catch((err)=>{
    console.log(err)
})


