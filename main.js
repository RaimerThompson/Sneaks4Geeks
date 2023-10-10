const menuBtn = document.querySelector('.hamburger__btn');
const mobileNav = document.getElementById('navbar');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  if (!menuOpen) {
    menuBtn.classList.add('close');
    menuOpen = true;
    mobileNav.style.display = 'flex';
    mobileNav.classList.add('active');
    
   }else {
    menuBtn.classList.remove('close');
    menuOpen = false;
    mobileNav.style.display = 'flex';
    mobileNav.classList.remove('active');
   }
})
;



//Cart Toggle 
const cartBtn = document.querySelector('.header__cart');
const cart = document.getElementById('cart__menu');
const closeBtn = document.querySelector('.close__cart');


 if (cartBtn){
  cartBtn.addEventListener('click', () => {
    cart.classList.add('active')
  })  
}
if(closeBtn) {    
closeBtn.addEventListener('click', () => {
  cart.classList.remove('active');
})
}

// start cart
if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}

// start

function start(){

}

//update

function update(){
  addEvents();
  updateTotal();
  saveCartItems();
  loadCartItems();
}


//add events

function addEvents(){
  //remove item from cart
  let cartRemoveBtns = document.querySelectorAll('.item__remove');

  cartRemoveBtns.forEach(btn => {
    btn.addEventListener('click', handleRemoveCartItems);
  });

//item quantity
let cartQuantityInputs = document.querySelectorAll('.cart__quantity');
cartQuantityInputs.forEach(input => {
  input.addEventListener('change', handleChangeItemQuantity);
});

//add items to the cart
let addCartBtns = document.querySelectorAll('.add__cart');
addCartBtns.forEach(btn =>{
  btn.addEventListener('click', handleAddCartItem);
});
 

//buy order checkout
const buyBtn = document.querySelector('.checkout__btn');
buyBtn.addEventListener('click', handleBuyOrder);

}

//handle
let itemsAdded = [];

function handleAddCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".pro__name").innerHTML;
  let price = product.querySelector(".pro__price").innerHTML;
  let imgSrc = product.querySelector(".pro__img").src;

  let newToAdd = {
    title,
    price,
    imgSrc,
  };


//if item already in cart
  if(itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert('Item is already in your cart');
    return;
  }else {
    itemsAdded.push(newToAdd);
  }

//add to cart items
  let cartBoxElement = cartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement('div');
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector('.cart__content');
  cartContent.appendChild(newNode);

  
  update();
  // saveCartItems();
  
  
}


function handleRemoveCartItems(){
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(el => el.title != this.parentElement.querySelector('.cart__title-name').innerHTML
  );

  update();
  // saveCartItems();
}

function handleChangeItemQuantity(){
  if(isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value);

  update();
  // saveCartItems();
}

function handleBuyOrder(){
  if(itemsAdded.length <= 0){
    alert('Please add items before checking out. Thank You');
    return;
  }
}

//update function

function updateTotal(){
  let cartBoxes = document.querySelectorAll('.cart__box');
  const totalElement = cart.querySelector('.total__price');
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector('.cart__item-price');
    let price = parseFloat(priceElement.innerHTML.replace('$', ''));
    let quantity = cartBox.querySelector('.cart__quantity').value;
    total += price * quantity;
  });

total = total.toFixed(2); //keep the last 2 digits in price total
// total = Math.round(total * 100) / 100;

  totalElement.innerHTML = '$' + total;

//save total to local storage
localStorage.setItem('cartTotal', total);
}

//html show on cart
function cartBoxComponent(title, price, imgSrc){

  return  `
  <div class="cart__box">
    <img src=${imgSrc} alt="" class="cart__img">
    <div class="details__box">
      <div class="cart__title-name">${title}</div>
      <div class="cart__item-price">${price}</div>
      <input type="number" value="1" class="cart__quantity">
    </div>
    <i class="fa-solid fa-trash-can item__remove"></i>
  </div>`

  
}

;

addEvents();
// saveCartItems();

;





//keep items in cart when refresh w/ local storage
function saveCartItems(){
  let cartContent = document.getElementsByClassName('cart__content')[0];
  let cartBoxes = cartContent.getElementsByClassName('cart__box');
  let cartItems = [] || JSON.parse(localStorage.getItem('cartItems'));

  for (let i = 0; i< cartBoxes.length; i++){
    cartBox = cartBoxes[i];
    let titleElement = cartBox.getElementsByClassName('cart__title-name')[0];
    let priceElement = cartBox.getElementsByClassName('cart__item-price')[0];
    let quantityElement = cartBox.getElementsByClassName('cart__quantity')[0];
    let productImg = cartBox.getElementsByClassName('cart__img')[0].src

    let item = {
      title: titleElement.innerText,
      price: priceElement.innerText,
      quantity: quantityElement.value,
      productImg: productImg,
    }
    cartItems.push(item);
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  
}

//loads in cart
function loadCartItems(){
  let cartItems = localStorage.getItem('cartItems');
  if (cartItems){
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < cartItems.length; i++){
      let item = cartItems[i];
      cartBoxComponent(item.title, item.price, item.productImg);

      let cartBoxes = document.getElementsByClassName('cart__box');
      let cartBox = cartBoxes[cartBoxes.length -1];
      let quantityElement = cartBox.getElementsByClassName('cart__quantity');
      quantityElement.value = item.quantity;
    }
  }
  let cartTotal = localStorage.getItem('cartTotal');
  if (cartTotal){
    document.getElementsByClassName('total__price')[0].innerText = '$' + cartTotal;
  }

}













// class cartItem{
//   constructor(name, img, price){
//     this.name = name
//     this.img = img
//     this.price = price
//     this.quantity = 1
//   }
// }

// class localCart{
//   static key = 'cartItems'

//   static getLocalCartItems(){
//       let cartMap = new Map()
//     const cartL = localStorage.getItem(localCart.key)
//     if(cartL === null || cartL.length === 0) return cartMap
//        return new Map(Object.entries(JSON.parse(cartL)))
//   }
//   static addItemToLocalCart(id, item){
//     let cartL = localCart.getLocalCartItems()
//     if(cartL.has(id)){
//       let mapItem = cartL.get(id)
//       mapItem.quantity +=1
//       cartL.set( id, mapItem)
//     }else
//     cartL.set(id, item)
//     localStorage.setItem(localCart.key, JSON.stringify(Object.fromEntries(cartL)))
//     updateCartUI()

//   } 

//   static removeItemFromCart(id){
//   let cartL = localCart.getLocalCartItems()
//   if (cartL.has(id)){
//     let mapItem = cartL.get(id)
//     if (mapItem.quantity >1){
//       mapItem.quantity -=1
//       cartL.set(id, mapItem)
      
//     }
//     else 
//     cartL.delete(id)
  
// }
// if (cartL.length === 0)
// localStorage.clear()
// else
// localStorage.setItem(localCart.key, JSON.stringify(Object.fromEntries(cartL)))
//     updateCartUI()
// }
// }

// //Cart Toggle //
// const cartBtn = document.querySelector('.header__cart');
// const cart = document.getElementById('cart__menu');
// const closeBtn = document.querySelector('.close__cart');
// const addToCartBtn = document.querySelectorAll('.add__cart');
// addToCartBtn.forEach( (btn) => {
//   btn.addEventListener('click', addItemFunction)
// })

// function addItemFunction(e){
//    let id = e.target.parentElement.getAttribute("data-id"); 
//    let img = e.target.parentElement.children[0].src;
//    let name =  e.target.parentElement.children[2].textContent;
//    let price =  e.target.parentElement.children[3].textContent;
//     price = price.replace("$", '');
//   const item = new cartItem(name, img, price);
//   localCart.addItemToLocalCart(id, item);
  
// }

//  if (cartBtn){
//   cartBtn.addEventListener('click', () => {
//     cart.classList.add('active')
//   })  
// }
// if(closeBtn) {    
// closeBtn.addEventListener('click', () => {
//   cart.classList.remove('active');
// })
// }

// // start cart
// if(document.readyState == 'loading'){
//   document.addEventListener('DOMContentLoaded', start);
// } else {
//   start();
// }

// // start

// function start(){

// }

// function updateCartUI(){
//   const cartContent = document.querySelector('.cart__content')
//   cartContent.innerHTML=""
//   const items = localCart.getLocalCartItems('cartItems')
//   if (items === null) return
//   let count = 0
//   let total = 0
//   for(const [key, value] of items.entries()){
//     const cartItem = document.createElement('div')
//     cartItem.classList.add('cart-item')
//     let price = value.price*value.quantity
//     price = Math.round(price*100)/100;
//     count+=1
//     total+= price
//     total = Math.round(total*100)/100
//     cartItem.innerHTML = `
//         <div class="cart__box">
//           <img src=${value.img} alt="" class="cart__img">
//           <div class="details__box">
//             <div class="cart__title-name">${value.name}</div>
//             <div class="cart__item-price">$${price}</div>
//             <input type="number" value="${value.quantity}" class="cart__quantity">
//           </div>
//           <i class="fa-solid fa-trash-can item__remove"></i>
//         </div>

//     `
//     cartItem.lastElementChild.addEventListener('click', ()=>{
//       localCart.removeItemFromCart(key)
//     })
//     cartContent.append(cartItem)
//   }

//   if(count > 0){
//     cartBtn.classList.add('cart__count')
//     let root = document.querySelector(':root')
//     root.style.setProperty('--after-content', `"${count}"`)
//     const subtotal = document.querySelector('.total__price')
//     subtotal.innerHTML = `$${total}`
//   }else
//     cartBtn.classList.remove('cart__count')

// }
 
// document.addEventListener('DOMContentLoaded', ()=>{updateCartUI()})


// //cart working
// if (document.readyState == 'loading') {
//   document.addEventListener('DOMContentLoaded', ready);
// } else {
//   ready();
// }

// //making function
// function ready() {

// // remove item from cart
// const removeCartButtons = document.getElementsByClassName('item__remove');
// for (let i = 0; i < removeCartButtons.length; i++) {
//   let button = removeCartButtons[i];
//   button.addEventListener('click', removeCartItem);
// } 

// //quantity change
// const quantityInputs = document.getElementsByClassName('cart__quantity');
// for (let i = 0; i < quantityInputs.length; i++) {
//   let input = quantityInputs[i];
//   input.addEventListener('change', quantityChanged);
// } 
// //add to cart
// const addCart = document.getElementsByClassName('add__cart');
// for (let i = 0; i < addCart.length; i++) {
//   let button = addCart[i];
//   button.addEventListener('click', addCartClicked);
// } 
// }

// //remove cart item
// function removeCartItem(event) {
//   const buttonClicked = event.target;
//   buttonClicked.parentElement.remove();
//   updateTotal();
// }

// //quantity change
// function quantityChanged(event){
//   let input = event.target;
//   if (isNaN(input.value) || input.value <= 0){
//     input.value = 1;
//   }
//   updateTotal();
// }

// //add cart function
// function addCartClicked(event){
//   let button = event.target;
//   let shopProducts = button.parentElement;
//   let title = shopProducts.getElementsByClassName('pro__name')[0].innerText;
//   let price = shopProducts.getElementsByClassName('pro__price')[0].innerText;
//   let productImg = shopProducts.getElementsByClassName('pro__img')[0].src;
//   addProductToCart(title, price, productImg);
//   updateTotal();
// }

// function addProductToCart (title, price, productImg){
//   let cartShopBox = document.createElement('div');
//   cartShopBox.classList.add('cart__box');
//   let cartItems = document.getElementsByClassName('cart__content')[0];
//   let cartItemsNames = cartItems.getElementsByClassName('cart__title-name');
//   for (let i = 0; i < cartItemsNames.length; i++) {
//     if (cartItemsNames[i].innerText == title){
//       alert('You have already added this item to your cart');
//       return;
//     }
//   }
//   let cartBoxContent = `<img src="${productImg}" alt="" class="cart__img">
//   <div class="details__box">
//     <div class="cart__title-name">${title}</div>
//     <div class="cart__item-price">${price}</div>
//     <input type="number" value="1" class="cart__quantity">
//   </div>
//   <i class="fa-solid fa-trash-can item__remove"></i>`;
//   cartShopBox.innerHTML = cartBoxContent;
//   cartItems.append(cartShopBox);
//   cartShopBox.getElementsByClassName('cart__remove')[0].addEventListener('click', removeCartItem);
//   cartShopBox
//   .getElementsByClassName('cart__quantity')[0]
//   .addEventListener('change', quantityChanged);
// }



// //update total
// function updateTotal(){
//   let cartContent = document.getElementsByClassName('cart__content')[0];
//   let cartBoxes = cartContent.getElementsByClassName('cart__box');
//   let total = 0;
//   for(let i = 0; i < cartBoxes.length; i++){
//     let cartBox = cartBoxes[i];
//     let priceElement = cartBox.getElementsByClassName('cart__item-price')[0];
//     let quantityElement = cartBox.getElementsByClassName('cart__quantity')[0];
//     let price = parseFloat(priceElement.innerText.replace('$', ''));
//     let quantity = quantityElement.value;
//     total+= price * quantity;

   
//   }
//   // if price contain cents
//   total = Math.round(total*100)/100;
//  document.getElementsByClassName('total__price')[0].innerText = '$' + total;
// }











// const addToCartBtn = document.getElementsByClassName('add__cart');
// let items = [];
// for(let i = 0; i < addToCartBtn.length; i++ ){
//   addToCartBtn[i].addEventListener('click', function(e){
//     if (typeof (Storage) != 'undefined'){
//      let item = {
//         id:i+1,
//         name: e.target.parentElement.children[2].textContent,
//         price: e.target.parentElement.children[3].textContent,
//         no:1
//       }; 
//       if(JSON.parse(localStorage.getItem('items')) === null){
//         items.push(item);
//       localStorage.setItem('items',JSON.stringify(items));
//       window.location.reload();
//       }else{
//         const localItems = JSON.parse(localStorage.getItem('items'));
//         localItems.map(data =>{
//           if(item.id == data.id){
//             item.no = data.no + 1
//             console.log(item);
//           } else{
//              items.push(data);
//           }
//        });
//        items.push(item);
//        localStorage.setItem('items', JSON.stringify(items));      
//        window.location.reload();
//       }
//     }else {
//       alert('local storage is not working');
//     }
      
//   });
// }

// //adding data to shopping cart
// const iconShopping = document.querySelector('.header__cart-span');
//  no = 0;
// JSON.parse(localStorage.getItem('items')).map(data =>{
//   no = no+data.no
// });
// iconShopping.innerHTML = no;

// const cartBoxCart = cartBox.querySelector('.cart__box');
// console.log(cartBoxCart);






// //add to cart - local storage//
// let carts = document.querySelectorAll('.cart')
// let products = [
//   {
//     name: 'Nike Dunk Low',
//     price: 109.95,
//     inCart: 0  
//   },
//   {
//     name: 'Adidas Red Samba',
//     price: 99.95,
//     inCart: 0  
//   },
//   {
//     name: 'Nike Air Max 1',
//     price: 140.00,
//     inCart: 0  
//   },
//   {
//     name: 'New Balanca 580 v2',
//     price: 129.95,
//     inCart: 0  
//   },
//   {
//     name: 'Nike Blazer Low',
//     price: 89.95,
//     inCart: 0  
//   },
//   {
//     name: 'Nike Air Max 97 OG',
//     price: 185.00,
//     inCart: 0  
//   },
//   {
//     name: 'Nike Air Max 1',
//     price: 160.00,
//     inCart: 0  
//   },
//   {
//     name: 'Nike ACG Watercat Phantom',
//     price: 125.00,
//     inCart: 0  
//   },
//   {
//     name: 'Nike Air Max 1',
//     price: 159.95,
//     inCart: 0  
//   },
//   {
//     name: 'Nike Blazer mid 77',
//     price: 109.95,
//     inCart: 0  
//   }
// ];

// for(let i=0; i < carts.length; i++) {
//   carts[i].addEventListener('click', () => {
//     cartNumbers(products[i]);
//     totalCost(products[i])
//   })
// }

// function onLoadCartNumbers(){
//   let productNumbers = localStorage.getItem('cartNumbers');
//   if(productNumbers) {
//     document.querySelector('.header__cart span').textContent = productNumbers;
//   }
// }

// function cartNumbers(products) {
//   let productNumbers = localStorage.getItem('cartNumbers');

//   productNumbers = parseInt(productNumbers);

//   if (productNumbers){
//     localStorage.setItem('cartNumbers', productNumbers + 1);
//     document.querySelector('.header__cart span').textContent = productNumbers + 1;
//   } else {
//     localStorage.setItem('cartNumbers', 1);
//     document.querySelector('header__cart span')
//   } 
//   setItems (products);
// }

// function setItems(products){
//   let cartItems = localStorage.getItem('productsInCart');
//   cartItems = JSON.parse(cartItems);

//   if (cartItems != null) {
//     if (cartItems[products.name] == undefined){
//       cartItems = {
//         ...cartItems,
//         [products.name]: products
//       }
//     }
//     cartItems[products.name].inCart += 1;
//   } else {
//     products.inCart = 1;
//     cartItems = {
//      [products.name]: products
//     }
//   }
//   localStorage.setItem('productsInCart', JSON.stringify(cartItems));
// }

// function totalCost(products) {
//   // console.log('the product price is', products.price);
//   let cartCost = localStorage.getItem('totalCost');
 
//   console.log('my cart cost is ', cartCost);
//   console.log(typeof cartCost);

//   if (cartCost != null){
//     cartCost = parseInt(cartCost);
//     localStorage.setItem('totalCost', cartCost + products.price);
//   } else {
//     localStorage.setItem('totalCost', products.price);
//   }

  
// }

// function displayCart(){
//   let cartItems = localStorage.getItem('productsInCart');
//   cartItems = JSON.parse(cartItems);
//   let productContainer = document.querySelector('.products');

//   if(cartItems && productContainer) {
//     productContainer.innerHTML = '';
//   }
// }

// onLoadCartNumbers();
// displayCart();
// ;

//Search functionality//
// const search = () =>{
//   const searchBox = document.getElementById('search__item').value.toUpperCase();
//   const storeItems = document.getElementById('product__list')
//   const pro1 = document.querySelectorAll('.pro1')
//   const productName = document.getElementsByClassName('.pro__name')

//   for(var i=0; i < productName.length; i++){
//     let match = pro1[i].getElementsByClassName('.pro__name')[0];

//     if (match) {
//       let textValue = match.textContent || match.innerHTML

//       if (textValue.toUpperCase().indexOf(searchBox) > -1){
//         pro1[i].style.display = "";
//       }else {
//         pro1[i].style.display = "none";
//       }
//     }
//   }
// }
;

//Search Toggle //
const searchBtn = document.querySelector('.fa-magnifying-glass');
const searchCt = document.querySelector('.search__container');
const searchBtnClose = document.querySelector('.search__icon-close');


 if (searchBtn){
  searchBtn.addEventListener('click', () => {
    searchCt.classList.add('active')
  })  
}
if(searchBtnClose) {    
searchBtnClose.addEventListener('click', () => {
  searchCt.classList.remove('active');
})
}
;



let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
}
;

