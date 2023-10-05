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



//Cart Toggle //
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
buyBtn.addEventListener('click', handleBuyOrder)
}

//handle
let itemsAdded = [];

function handleAddCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".pro__name").innerHTML;
  let price = product.querySelector(".pro__price").innerHTML;
  let imgSrc = product.querySelector(".pro__img").src;
  console.log(title, price, imgSrc);

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
}


function handleRemoveCartItems(){
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(el => el.title != this.parentElement.querySelector('.cart__title-name').innerHTML
  );

  update();
}

function handleChangeItemQuantity(){
  if(isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value);

  update();
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
;


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

