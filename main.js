//handle
let itemsAdded = [];
let cartTotal = 0;
let totalQuantity = 0;

const menuBtn = document.querySelector('.hamburger__btn');
const mobileNav = document.getElementById('navbar');
const mobileCartIcon = document.querySelector('.header__cart')
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  if (!menuOpen) {
    menuBtn.classList.add('close');
    menuOpen = true;
    mobileNav.style.display = 'flex';
    mobileNav.classList.add('active');
    mobileCartIcon.style.display = 'none'
    
   }else {
    menuBtn.classList.remove('close');
    menuOpen = false;
    mobileNav.style.display = 'flex';
    mobileNav.classList.remove('active');
    mobileCartIcon.style.display = "inline"
   }
})
;



//Cart Toggle 
const cartBtn = document.querySelector('.header__cart');
const cart = document.getElementById('cart__menu');
const closeBtn = document.querySelector('.close__cart');
// Declare cartContent once and use it in both event listeners gpt
const cartContent = document.querySelector('.cart__content');

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


// startcart
// Load the cart items and add event listeners
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadCartItems();
      addEvents();
    });
  } else {
    loadCartItems();
    addEvents();
  }

// Initialize the cart
start();

function start() {
  loadCartItems(); // Load items from localStorage
  update(); 
}
//update
function update(){
  addEvents();
  updateTotal();
  saveCartItems();
  loadCartItems();
  updateCartIconQuantity()
}


// Add event listeners
function addEvents() {
  // Add to cart button event listeners
  let addCartBtns = document.querySelectorAll('.add__cart');
  addCartBtns.forEach(btn => {
      btn.addEventListener('click', handleAddCartItem);
  });

  // Remove item from cart event listeners
  const cartContent = document.querySelector('.cart__content');
  cartContent.addEventListener('click', function (event) {
      if (event.target.classList.contains('item__remove')) {
          handleRemoveCartItems.call(event.target);
      }
      
  });

  // Change item quantity event listeners
  cartContent.addEventListener('input', function (event) {
      if (event.target.classList.contains('cart__quantity')) {
          handleChangeItemQuantity.call(event.target);
      }
  });

  // Checkout button event listener
  const buyBtn = document.querySelector('.checkout__btn');
  buyBtn.addEventListener('click', handleBuyOrder);
  }




function updateTotal() {
  let cartBoxes = document.querySelectorAll('.cart__box');
  const totalElement = document.querySelector('.total__price');
  let total = 0;

  cartBoxes.forEach((cartBox) => {
      let priceElement = cartBox.querySelector('.cart__item-price');
      let quantity = cartBox.querySelector('.cart__quantity').value;
      let price = parseFloat(priceElement.innerHTML.replace('$', ''));

      total += price * quantity;
  });

  total = total.toFixed(2);
  totalElement.innerHTML = '$' + total;
}

function handleAddCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".pro__name").innerHTML;
  let price = product.querySelector(".pro__price").innerHTML;
  let imgSrc = product.querySelector(".pro__img").src;
  let quantity = 1; // Default quantity for a new item

  // Check if the item is already in the cart
  const existingItem = itemsAdded.find((item) => item.title === title);
  if (existingItem) {
    // Increase the quantity if the item is already in the cart
    existingItem.quantity += 1;
    quantity = existingItem.quantity;
  } else {
    // Add the new item to itemsAdded
    itemsAdded.push({ title, price, imgSrc, quantity });
  }

  // Add to cart items
  let cartBoxElement = cartBoxComponent(title, price, imgSrc, quantity);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart__content");
  cartContent.appendChild(newNode);

  update();
  updateCartIconQuantity();
}

function handleRemoveCartItems() {
  this.parentElement.remove();
  const title = this.parentElement.querySelector(".cart__title-name").textContent;

  // Remove the item from itemsAdded
  itemsAdded = itemsAdded.filter((item) => item.title !== title);

  update();
  updateCartIconQuantity();
}


  function handleChangeItemQuantity() {
  const quantityInput = this;
  if (isNaN(quantityInput.value) || quantityInput.value < 1) {
    quantityInput.value = 1;
  } else if (quantityInput.value % 1 !== 0) {
    // Ensure the quantity is a whole number
    quantityInput.value = Math.floor(quantityInput.value);
  }

  // Find the cart box that contains the changed quantity input
  const cartBox = quantityInput.closest('.cart__box');
  if (!cartBox) return; // If cart box not found, exit

  const title = cartBox.querySelector('.cart__title-name').textContent;

  // Update the cart total
  updateTotal();

  // Find and update the item in the itemsAdded array
  const itemToUpdate = itemsAdded.find((item) => item.title === title);
  if (itemToUpdate) {
    itemToUpdate.quantity = quantityInput.value;
  }

  // Save the updated itemsAdded array to localStorage
  saveCartItems();
}


// Function to handle the checkout process
function handleBuyOrder() {
  if (itemsAdded.length <= 0) {
      alert('Please add items to your cart before checking out.');
  } else {
      // Handle the checkout process
      // You can add your own logic for the checkout here
  }
}


//update function total
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
function cartBoxComponent(title, price, imgSrc, quantity) {
  return `
    <div class="cart__box">
      <img src=${imgSrc} alt="" class="cart__img">
      <div class="details__box">
        <div class="cart__title-name">${title}</div>
        <div class="cart__item-price">${price}</div>
        <input type="number" value="${quantity}" class="cart__quantity">
      </div>
      <i class="fa-solid fa-trash-can item__remove"></i>
    </div>`;
}
addEvents();


// Function to update the cart icon quantity and visibility
function updateCartIconQuantity() {
  const cartQuantity = document.querySelector('.cart__icon-quantity');
  totalQuantity = itemsAdded.reduce((total, item) => total + parseInt(item.quantity), 0);
  cartQuantity.textContent = totalQuantity;

  if (totalQuantity > 0) {
    cartQuantity.style.display = 'inline'; 
  } else {
    cartQuantity.style.display = 'none'; 
  }
}



 // Save cart items and quantities when changes occur
 function saveCartItems() {
  let cartContent = document.querySelector('.cart__content');
  let cartBoxes = cartContent.querySelectorAll('.cart__box');
  let cartItems = [] || JSON.parse(localStorage.getItem('cartItems'));

  cartBoxes.forEach(cartBox => {
    let titleElement = cartBox.querySelector('.cart__title-name');
    let priceElement = cartBox.querySelector('.cart__item-price');
    let quantityElement = cartBox.querySelector('.cart__quantity');
    let productImg = cartBox.querySelector('.cart__img').src;

    let item = {
      title: titleElement.innerText,
      price: priceElement.innerText,
      quantity: quantityElement.value,
      productImg: productImg,
    };

    cartItems.push(item);
  });

    // Save cartItems to local storage
    localStorage.setItem('cartItems', JSON.stringify(itemsAdded));
  
  }
 // Function to load cart items from local storage
 function loadCartItems() {
  const storedItems = localStorage.getItem('cartItems');
  if (storedItems) {
    itemsAdded = JSON.parse(storedItems);

    // Create cart box elements for each item
    const cartContent = document.querySelector('.cart__content');
    cartContent.innerHTML = '';

    itemsAdded.forEach(item => {
      const cartBoxElement = cartBoxComponent(item.title, item.price, item.imgSrc, item.quantity);
      const newNode = document.createElement('div');
      newNode.innerHTML = cartBoxElement;
      cartContent.appendChild(newNode);
    });

    updateTotal();
  }
}




// Load and update cart items when the page loads
window.addEventListener('load', function () {
    loadCartItems();
    addEvents();
    updateTotal();
    updateCartIconQuantity();
});


const bigImg = document.getElementById('mainImg');
const smlImg = document.getElementsByClassName('small__img');

smlImg[0].onclick = function(){
  bigImg.src = smlImg[0].src;
  
}

smlImg[1].onclick = function(){
  bigImg.src = smlImg[1].src;
}

smlImg[2].onclick = function(){
  bigImg.src = smlImg[2].src;
}

smlImg[3].onclick = function(){
  bigImg.src = smlImg[3].src;
}
;

//Search functionality//
const search = () =>{
  const searchBox = document.getElementById('search__item').value.toUpperCase();
  const storeItems = document.getElementById('product__list')
  const pro1 = document.querySelectorAll('.pro1')
  const productName = document.getElementsByClassName('.pro__name')

  for(var i=0; i < productName.length; i++){
    let match = pro1[i].getElementsByClassName('.pro__name')[0];

    if (match) {
      let textValue = match.textContent || match.innerHTML

      if (textValue.toUpperCase().indexOf(searchBox) > -1){
        pro1[i].style.display = "";
      }else {
        pro1[i].style.display = "none";
      }
    }
  }
}
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



