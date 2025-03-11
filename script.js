const images = ["images/build3.jpeg", "images/car4.jpeg", "images/phone.jpeg"]; 
let index = 0;

function changeBackground() {
    const page1 = document.querySelector(".page1");
    page1.style.backgroundImage = `url(${images[index]})`;
    index = (index + 1) % images.length;
}
setInterval(changeBackground, 3000);
changeBackground();
