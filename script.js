const images = ["images/build3.jpeg", "images/car4.jpeg", "images/phone.jpeg"]; 
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
        };
        cartItems.push(product);
        cartCount.textContent = cartItems.length;
        updateCartDropdown();
    });
});

function updateCartDropdown() {
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <p>${item.name}</p>
                <p>السعر: ${item.price}</p>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });
}const cartIcon = document.querySelector('.cart-icon');
cartIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    const cartDropdown = cartIcon.querySelector('.cart-dropdown');
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});
document.addEventListener('click', () => {
    const cartDropdown = cartIcon.querySelector('.cart-dropdown');
    cartDropdown.style.display = 'none';
});
