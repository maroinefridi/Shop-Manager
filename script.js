
const productsContainer=document.getElementById('products-Container');
const searchesContainer=document.getElementById('searches-Container');
const filtreByCategory=document.getElementById('category-filter');

fetchProducts();
 function fetchProducts(){
    spinerMessage();
     fetch("http://localhost:3000/api/products")
     .then(response=>response.json())
     .then(data=>{
      console.log(data)
      if(data.length==0){messageEmptyStock()}
      productsContainer.innerHTML="" 
       displayProducts(data);
      })
      .catch(error=>{
        console.log("une erreur est survenue: " ,error)
        displayErorrServer()
      });
  }

fetchCategory();
 function fetchCategory(){
    spinerMessage();
     fetch("http://localhost:3000/api/categories")
     .then(response=>response.json())
     .then(data=>{
      displayCategoryOptions(data)
       }) 
      .catch(error=>{
        console.log("une erreur est survenue: " ,error)
      });
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
  
  function displayCategoryOptions(category){
    console.log(category);
    
    filtreByCategory.innerHTML=`<option>Toutes les catégories</option>`
    for(let cat of category){
         filtreByCategory.innerHTML+=`<option value="${cat.id}">${cat.name}</option>
  `
    }

    // let box=[];
    // let newbox=[];
    // let objet={};
    // let i = 0;
    // let category = {
    //   cat_id : 0,
    //   cat : ""
    // };
    // let cat =[];
    // while(i < products.length){
    //   cat.push(products[i].categoryName)
    //   i++;
    // }
    // for(let _ in products){
    //     if(category['cat'].includes(cat[_])){
    //       continue
    //     }
    //     else{
    //       category['cat'] = (products[_].categoryName)
    //       category['cat_id'] = (products[_].categoryId)
    //     }
    // }
    // console.log(category['cat']);
    
//  for(let product of products){
//    let objet={
//       category:product.categoryName,
//       categoryId:product.categoryId
//     }
//     box.push(objet)
//  }
// console.log(box);


//  for(let bx of box){
//   for(let x of newbox){
//     if(!x.category.includes(bx.category)){
//         newbox.push()
//     }
//   }
//  }

// console.log(newbox)
// for(let cat in box){
//   if(cat.category.includes(cat.))
// }


  //   for(let ){
  //             filtreByCategory.innerHTML+=`
  // <option value="${category.cat_id}">${category.cat}</option>`
  //   }
    

    // for(let product of products){

// }
// console.log(box)
// box=box.filter((product)=>{product.categoryName!=product.categoryName})
// console.log(box);

// filtreByCategory.innerHTML+=`<option value="${product.categoryId}">${product.categoryName}</option>
//   `
//   console.log(product.categoryName)


}



searchesContainer.addEventListener('input',(event)=>{
  const search= event.target.dataset.name // search = search, maxprice = maxPrice, category = categoryId, instock = inStock
  
  const searchFor = event.target.value
  
  if(searchFor) {
    const url = new URLSearchParams()
    url.set(search, searchFor)
    handleSearchs(url)
  }
  else {
    handleSearchs()
  }
  
})

function handleSearchs(url = ""){
  // console.log(`http://localhost:3000/api/products?${url}`)
  let valid=true;
  fetch(`http://localhost:3000/api/products?${url}`)
  .then(response=> {
    if(!response.ok) throw new Error(response.statusText)
      return response.json()
  })
  .then(product=>{
    if(product.length == 0){
      productsContainer.innerHTML="<p>the product you search for is not found pleas try again.</p>";
      valid=false
    }
    if(valid){
      productsContainer.textContent="";
      displayProducts(product)
    }
  })
  .catch((error) => console.log("the error is : "+ error));
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