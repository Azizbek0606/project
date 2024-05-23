import { data_banner } from './data.js';
import { about_card_content } from './data.js';
let banner_wrapper = document.querySelector(".banner_wrapper");
let banner_title = document.querySelector(".banner_title h1");
let banner_subtitle = document.querySelector(".banner_subtitle h2");
let bg_image_index = 0;
let swip_anime = document.querySelector('.swip_anime');

// Preload images and then initialize banner
function preloadImages(urls, callback) {
    let loadedImages = 0;
    let img;
    for (let i = 0; i < urls.length; i++) {
        img = new Image();
        img.onload = function () {
            loadedImages++;
            if (loadedImages === urls.length) {
                callback();
            }
        };
        img.src = urls[i];
    }
}

function initBanner() {
    const urls = Object.values(data_banner).map(item => item.url);
    preloadImages(urls, function () {
        setInterval(set_image_to_banner, 5000);
        set_image_to_banner();
    });
}

function set_image_to_banner() {
    const keys = Object.keys(data_banner);
    const key = keys[bg_image_index];
    const data = data_banner[key];
    const img = new Image();
    img.onload = function () {
        swip_anime.style.backgroundColor = data.swip_color;
        if (swip_anime.dataset.state === "right") {
            swip_anime.style.transform = "translateX(-100%)";
            swip_anime.dataset.state = "left";
            swip_anime.style.clipPath = "polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)";
        } else {
            swip_anime.style.transform = "translateX(100%)";
            swip_anime.style.clipPath = "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)";
            swip_anime.dataset.state = "right";
        }
        banner_wrapper.style.backgroundImage = `url(${data.url})`;
        banner_title.innerText = data.title;
        banner_subtitle.innerText = data.description;
        bg_image_index = (bg_image_index + 1) % keys.length;
    };
    img.src = data.url;
}

initBanner();

swip_anime.dataset.state = "right";
const cardWrapper = document.querySelector('.about_card_wrapper');
function createCard(data, parentElement) {
    const fragment = document.createDocumentFragment();
    let delay = 0;
    Object.keys(data).forEach(key => {
        const { title, description, url } = data[key];

        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", delay);

        const cardImgWrapper = document.createElement('div');
        cardImgWrapper.className = 'card_image';

        const cardImg = document.createElement('img');
        cardImg.src = url;
        cardImgWrapper.appendChild(cardImg);

        const cardTitle = document.createElement('div');
        cardTitle.className = 'card_title';

        const cardTitleH2 = document.createElement('h2');
        cardTitleH2.innerText = title;
        cardTitle.appendChild(cardTitleH2);

        const cardContent = document.createElement('div');
        cardContent.className = 'card_content';

        const cardContentP = document.createElement('p');
        cardContentP.innerText = description;
        cardContent.appendChild(cardContentP);

        card.appendChild(cardImgWrapper);
        card.appendChild(cardTitle);
        card.appendChild(cardContent);

        fragment.appendChild(card);
        delay += 100;
    });
    parentElement.appendChild(fragment);
}

createCard(about_card_content, cardWrapper);


function add_class_name(class_name , element){
    element.classList.toggle(class_name);
}