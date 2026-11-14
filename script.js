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
      productsContainer.innerHTML="" 
       displayProducts(data)
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


searchInput.addEventListener('input',()=>{
  let searchFor=searchInput.value
  // const url = new URLSearchParams()
  // url.set(searchInput.dataset.name, searchFor)
  // console.log(url.toString())
  // handlesearchsByName(url)
handlesearchsByName(searchFor)
})



  
  function handlesearchsByName(searchFor){
  // console.log(`http://localhost:3000/api/products?${url}`)
  let valid=false;
  //
  fetch(`http://localhost:3000/api/products?search=${searchFor}`)
  .then(response=>response.json())
  .then(product=>{
  
        //   // console.log("hello")
        if(product.length==0){
           productsContainer.innerHTML="<p>the product you search for is not found pleas try again.</p>";
          valid=true
        }
    if(valid==false){
      productsContainer.innerHTML="";
   displayProducts(product)
    }
   
    
    
  })
  .catch(error=>{
        console.log("the error is : "+ error)
  });
}


