const images = ["images/auction.jpg", "images/newCar.jpg", "images/newBuild1.jpg"]; 
let index = 0;

function changeBackground() {
    const page1 = document.querySelector(".page1");
    page1.style.backgroundImage = `url(${images[index]})`;
    index = (index + 1) % images.length;
}
setInterval(changeBackground, 3000);
changeBackground();

const productCards = document.querySelectorAll('.product-card');
const cartCount = document.querySelector('.cart-count');
const cartItemsContainer = document.querySelector('.cart-items');

let cartItems = [];

productCards.forEach(card => {
    card.addEventListener('click', () => {
        const product = {
            name: card.querySelector('.card-title').textContent,
            price: card.querySelector('.price span').textContent,
            image: card.querySelector('img').src,
            quantity: 1, 
        };

        const existingProduct = cartItems.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity++; 
        } else {
            cartItems.push(product);
        }
        updateCartCount();
        updateCartDropdown();
    });
});


function updateCartCount() {
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalQuantity;
}

function updateCartDropdown() {
    cartItemsContainer.innerHTML = '';

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <p>${item.name}</p>
                <p>السعر: ${item.price}</p>
                <!-- أزرار التحكم في الكمية -->
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });
    addQuantityEvents();
}
function addQuantityEvents() {
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');

    minusButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity--; 
                updateCartCount();
                updateCartDropdown(); 
            }
        });
    });

    plusButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            cartItems[index].quantity++;
            updateCartCount(); 
            updateCartDropdown(); 
        });
    });
}
// burger menu
const burgerMenu = document.getElementById('burger-menu');
const burgerIcon = document.getElementById('burger-icon');
const navLinks = document.getElementById('nav-links');

burgerMenu.addEventListener('click', () => {
    if (burgerIcon.classList.contains('fa-bars')) {
        burgerIcon.classList.remove('fa-bars');
        burgerIcon.classList.add('fa-times');
    } else {
        burgerIcon.classList.remove('fa-times');
        burgerIcon.classList.add('fa-bars');
    }
    navLinks.classList.toggle('active');
});