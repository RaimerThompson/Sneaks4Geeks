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
;


//add to cart - local storage//
let carts = document.querySelectorAll('.cart')
let products = [
  {
    name: 'Nike Dunk Low',
    price: 109.95,
    inCart: 0  
  },
  {
    name: 'Adidas Red Samba',
    price: 99.95,
    inCart: 0  
  },
  {
    name: 'Nike Air Max 1',
    price: 140.00,
    inCart: 0  
  },
  {
    name: 'New Balanca 580 v2',
    price: 129.95,
    inCart: 0  
  },
  {
    name: 'Nike Blazer Low',
    price: 89.95,
    inCart: 0  
  },
  {
    name: 'Nike Air Max 97 OG',
    price: 185.00,
    inCart: 0  
  },
  {
    name: 'Nike Air Max 1',
    price: 160.00,
    inCart: 0  
  },
  {
    name: 'Nike ACG Watercat Phantom',
    price: 125.00,
    inCart: 0  
  },
  {
    name: 'Nike Air Max 1',
    price: 159.95,
    inCart: 0  
  },
  {
    name: 'Nike Blazer mid 77',
    price: 109.95,
    inCart: 0  
  }
];

for(let i=0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i])
  })
}

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');
  if(productNumbers) {
    document.querySelector('.header__cart span').textContent = productNumbers;
  }
}

function cartNumbers(products) {
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if (productNumbers){
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.header__cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('header__cart span')
  } 
  setItems (products);
}

function setItems(products){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[products.name] == undefined){
      cartItems = {
        ...cartItems,
        [products.name]: products
      }
    }
    cartItems[products.name].inCart += 1;
  } else {
    products.inCart = 1;
    cartItems = {
     [products.name]: products
    }
  }
  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(products) {
  // console.log('the product price is', products.price);
  let cartCost = localStorage.getItem('totalCost');
 
  console.log('my cart cost is ', cartCost);
  console.log(typeof cartCost);

  if (cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + products.price);
  } else {
    localStorage.setItem('totalCost', products.price);
  }

  
}


onLoadCartNumbers();

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


