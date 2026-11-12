let products=[];
const productsContainer=document.getElementById('products-Container');
const searchInput=document.getElementById('Search-Input');

fetchProducts();
 function fetchProducts(){
    spinerMessage();
     fetch("http://localhost:3000/api/products")
     .then(response=>response.json())
     .then(data=>{
      if(data==null){messageEmptyStock()}
      setTimeout(()=>{productsContainer.innerHTML=""},1500) 
       setTimeout(()=>{displayProducts(data)},1500) 
      })
      .catch(error=>{
        console.log("une erreur est survenue: " ,error)
        displayErorrServer()
      });
  }

    function messageEmptyStock(){
      productsContainer.innerHTML=`<p style="color:white;" >Aucun produit disponible pour le moment.</p`
    }

    function displayErorrServer(){
      productsContainer.innerHTML=`<p style="color:red;" >Impossible de charger les produits. Veuillez réessayer.</p`
    }
    function spinerMessage(){
      productsContainer.innerHTML=`<p style="color:green;" >Chargement des produits....</p`
    }
    

 function displayProducts(products){
    products.forEach(product => {
      productsContainer.innerHTML+=` <article class="card">
        <img 
          src="http://127.0.0.1:3000/${product.image}"
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








// searchInput.addEventListener('input',()=>{
//   let search=searchInput.value
//   handlesearchsByName(products,search)
//   // searchInput.value=""
// })

// function handlesearchsByName(products,search){
//   let productsSearchfor=products.filter(product=>product.name==search)
//   displayProducts(productsSearchfor);
// }
