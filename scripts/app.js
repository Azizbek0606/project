import { about_card_content, data_banner, prices_card_data } from './data.js';

let banner_wrapper = document.querySelector(".banner_wrapper");
let banner_title = document.querySelector(".banner_title");
let banner_subtitle = document.querySelector(".banner_subtitle");
let bg_image_index = 0;
let swip_anime = document.querySelector('.swip_anime');
let menu_toggler = document.querySelectorAll(".menu_toggler");
let nav_context = document.querySelector('#nav_context');

for (let i = 0; i < menu_toggler.length; i++) {
    menu_toggler[i].addEventListener("click", () => {
        nav_context.classList.toggle("active_nav_context");
    });
}
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
        setInterval(set_image_to_banner, 7000);
        set_image_to_banner();
    });
}
let check_direction = "right";

function set_image_to_banner() {
    const keys = Object.keys(data_banner);
    const key = keys[bg_image_index];
    const data = data_banner[key];
    banner_title.removeChild(banner_title.firstElementChild);
    banner_subtitle.removeChild(banner_subtitle.firstElementChild);
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
        let title_content = document.createElement("h1");
        let subtitle_content = document.createElement("h2");
        if (check_direction == "right") {
            check_direction = "left";
            title_content.setAttribute("data-aos", "flip-right");
            subtitle_content.setAttribute("data-aos", `fade-up-right`);
        } else {
            check_direction = "right";
            title_content.setAttribute("data-aos", "flip-left");
            subtitle_content.setAttribute("data-aos", `fade-up-left`);
        }
        subtitle_content.setAttribute("data-aos-delay", 200);
        title_content.textContent = data.title;
        subtitle_content.textContent = data.description;
        banner_title.append(title_content);
        banner_subtitle.append(subtitle_content);
        bg_image_index = (bg_image_index + 1) % keys.length;
    };
    img.src = data.url;
}

initBanner();

swip_anime.dataset.state = "right";
function createCard(data, parentElement, type = 'default') {
    const fragment = document.createDocumentFragment();
    let delay = 0;

    Object.keys(data).forEach(key => {
        const { title, description, url } = data[key];
        let card;

        if (type === 'default') {
            card = createDefaultCard(title, description, url, delay);
        } else if (type === 'prices') {
            card = createPricesCard(title, description, url, delay);
        }

        fragment.appendChild(card);
        delay += 100;
    });

    parentElement.appendChild(fragment);
}

function createDefaultCard(title, description, url, delay) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', delay);

    card.appendChild(createElement('div', 'card_image', createImage(url)));
    card.appendChild(createElement('div', 'card_title', createElement('h2', '', title)));
    card.appendChild(createElement('div', 'card_content', createElement('p', '', description)));

    return card;
}

function createPricesCard(title, description, url, delay) {
    const pricesCardWrapper = document.createElement('div');
    pricesCardWrapper.className = 'prices_card';
    pricesCardWrapper.setAttribute('data-aos', 'fade-up');
    pricesCardWrapper.setAttribute('data-aos-delay', delay);
    let img = createElement('div', 'prices_image', createImage(url));
    pricesCardWrapper.appendChild(img);
    const pricesCard = createElement('div', 'prices_card_content_block',
        createElement('div', 'prices_title', createElement('h1', '', title)),
        createElement('div', 'prices_content', createElement('p', '', description)),
        createElement('div', 'prices_button', createElement('a', 'add_href_to_btn', createElement('button', '', 'Batafsil')))
    );

    pricesCardWrapper.appendChild(pricesCard);
    return pricesCardWrapper;
}
function createElement(tag, className, ...children) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    children.forEach(child => {
        if (typeof child === 'string') {
            element.innerText = child;
        } else {
            element.appendChild(child);
        }
    });
    return element;
}

function createImage(url) {
    const img = document.createElement('img');
    img.src = url;
    return img;
}

const cardWrapper = document.querySelector('.about_card_wrapper');
const prices_card_wrapper = document.querySelector('.prices_card_wrapper');
createCard(about_card_content, cardWrapper, 'default');
createCard(prices_card_data, prices_card_wrapper, 'prices');

document.querySelector(".footer_location_box").addEventListener("mouseover", () => {
    document.querySelector(".loaction_icon_content_wrapper").style.transform = "translateY(0)";
})
document.querySelector(".footer_location_box").addEventListener("mouseleave", () => {
    document.querySelector(".loaction_icon_content_wrapper").style.transform = "translateY(-100%)";
})

let add_href_to_btn = document.querySelectorAll('.add_href_to_btn')
for (let i = 0; i < add_href_to_btn.length; i++) {
    add_href_to_btn[i].href = "https://t.me/DILMUROD040404";
}