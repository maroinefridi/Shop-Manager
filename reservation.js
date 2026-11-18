// const quantiteInput=document.getElementById('QuantiteInput')
const productCard = document.getElementById('product-Card')
const btnAddtoCard = document.getElementById('btn-AddtoCard')


// btnAddtoCard.addEventListener('click',(event)=>{
//     event.preventDefault();
// })

productsContainer.addEventListener('click', (event) => {
    event.preventDefault()

    const btnAddtoCard = event.target.closest('#btn-AddtoCard');

    if (!btnAddtoCard) return;
    const form = btnAddtoCard.parentElement;
    const input = form.querySelector('.QuantiteInput');
    const stock = form.querySelector('.stock')

    addToCardValidation(input, stock, btnAddtoCard)
    // input.value=""
})

function addToCardValidation(input, stock, btnAddtoCard) {
    const QuantityInput = Number(input.value)
    const aviableStock = Number(stock.dataset.stock)
    const productId = btnAddtoCard.dataset.id;

    if(aviableStock==0){
        Swal.fire({
            icon: "error",
            title: "Opps...",
            text: "This product is no longer available in stock!",
        });
        return;
    }
    if (input.value.length == 0) {
          Swal.fire({
            icon: "error",
            title: "Be careful...",
            text: "U forget to Put a Quantity number!",
        });
        return;
    }
    if (QuantityInput > aviableStock || QuantityInput < 1) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "this Quantity is not aviable!",
        });
        return;
    }


    console.log(QuantityInput)
    console.log(aviableStock);
    console.log(btnAddtoCard.dataset.id)
    const Url = new URLSearchParams()
    Url.set("reservation", productId)
    handleReseration(Url)

}

function handleReseration() {

}