const productsContainer=document.getElementById('products-Container');
const searchInput=document.getElementById('Search-Input');

fetchProducts();
async function fetchProducts(){

    const response = await fetch("http://localhost:3000/api/products");
    console.log(response.status);
    
    if (!response.ok) {
      const problem = await response.json();
      console.log(problem.message);
      return;
    }

     let products = await response.json();
     displayProducts(products)
}

// const res= await fetch("http://localhost:3000/api/products/image")

// fetch

 function displayProducts(products){
    products.forEach(product => {
      productsContainer.innerHTML+=` <article class="card">
        <img 
          src=" http://127.0.0.1:3000${product.image}"
          class="cardImg"
          alt="product picture!!"
        />
        <p>category: ${product.categoryName}</p>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price : ${product.price}$</p>
        <strong>in stock:${product.stock}</strong>
        <button class="blue" data-id="${product.id}">
          <i class="fa-solid fa-cart-shopping"></i> add product
        </button>
      </article>`
    });
}

searchInput.addEventListener('input',(event)=>{

})





