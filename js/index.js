document.addEventListener("DOMContentLoaded", function() {
    let products = []   

    let http = new XMLHttpRequest()
    http.open("get", "./json/products.json")
    http.send()

    http.onload = function(){
        if(this.readyState == 4 && this.status == 200){
            products = JSON.parse(this.responseText)
            render(products);
            calculateTotalPrice();
        }
    }
    function render(productList){
        let output = ""

            productList.forEach(product => {
                output+=`
                    <div class="product">
                        <img src="${product.image}">
                        <p class="title">${product.title}</p>
                        <p class="description">${product.price}  ${product.name}</p>
                    </div>
                `
            });

            document.querySelector(".products").innerHTML = output;
    }

    //add filters

    //filter by prices
    document.getElementById("low").addEventListener("click", function(){
        let lowPrice = products.filter(product => product.price < 100)
        render(lowPrice)
    })
    document.getElementById("medium").addEventListener("click", function(){
        let mediumPrice = products.filter(product => product.price > 100 && product.price < 150) 
        render(mediumPrice)
    })
    document.getElementById("expensive").addEventListener("click", function(){
        let expensivePrice = products.filter(product => product.price > 150)
        render(expensivePrice)
    })


    //filter by brands
    document.getElementById("adidas").addEventListener("click", function(){
        let adidasShoes = products.filter(product => product.brand === "adidas")
        render(adidasShoes)
    })
    document.getElementById("nike").addEventListener("click", function(){
        let nikeShoes = products.filter(product => product.brand === "nike")
        render(nikeShoes)
    })
    document.getElementById("puma").addEventListener("click", function(){
        let pumaShoes = products.filter(product => product.brand === "puma")
        render(pumaShoes)
    })


    //filter by colors
    document.getElementById("white").addEventListener("click", function(){
        let whiteProducts = products.filter(product => product.color === "white")
        render(whiteProducts)
    })
    document.getElementById("black").addEventListener("click", function(){
        let blackProducts = products.filter(product => product.color === "black")
        render(blackProducts)
    })
    document.getElementById("mixed").addEventListener("click", function(){
        let mixedProducts = products.filter(product => product.color === "mixed")
        render(mixedProducts)
    })


    // add map

    function discount(){
        const input = document.getElementById("input")
        const submitButton = document.getElementById("submit")
        
        submitButton.addEventListener("click", function(){
            if(input.value == "giorgi"){
                const discountProduct = products.map(product => {
                    return { ...product, price: product.price * 0.5 };
                })
                render(discountProduct)
            }else{
                alert("Incorrect code")
            }
        })
    }

    discount()


    //add reduce to get new value of brands or total price
    function calculateTotalPrice() {
        const totalPrice = products.reduce((prev, current) => {
            return prev + current.price;
        }, 0);

        console.log("Total Price: " + totalPrice);
    }

})




// if(input.value == "giorgi"){function}