let data_banner = {
    "dubai": {
        "title": "Dubai",
        "description": "Assalomu alakum biz bilan dubayga arzon narxlarda maroqli sayoxat qilishni istaysizmi unda darxol bizga murojat qiling",
        "url": "../images/banner_images/dubai.jpg",
        "swip_color": '#E6E6FA70'
    },
    "misr": {
        "title": "Misr",
        "description": "Assalomu alakum Misrga bilan dubayga arzon narxlarda maroqli sayoxat qilishni istaysizmi unda darxol bizga murojat qiling",
        "url": "../images/banner_images/misr.jpg",
        "swip_color": '#ef6c0070'
    },
    "antaliya": {
        "title": "Antaliya",
        "description": "Assalomu alakum biz bilan Antaliyaga arzon narxlarda maroqli sayoxat qilishni istaysizmi unda darxol bizga murojat qiling",
        "url": "../images/banner_images/antaliya.jpg",
        "swip_color": '#0F2C5470'
    },
    "balgariya": {
        "title": "Bolgariya",
        "description": "Assalomu alakum biz bilan Bolgariyaga arzon narxlarda maroqli sayoxat qilishni istaysizmi unda darxol bizga murojat qiling",
        "url": "../images/banner_images/balgariya.jpg",
        "swip_color": '#00808070'
    }
};

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

// Initialize banner after preloading images
function initBanner() {
    const urls = Object.values(data_banner).map(item => item.url);
    preloadImages(urls, function () {
        setInterval(set_image_to_banner, 5000);
        set_image_to_banner(); // Show the first banner immediately
    });
}

function set_image_to_banner() {
    const keys = Object.keys(data_banner);
    const key = keys[bg_image_index];
    const data = data_banner[key];

    // Create a new image element to ensure it's loaded before setting it as background
    const img = new Image();
    img.onload = function () {
        banner_wrapper.style.backgroundImage = `url(${data.url})`;
        banner_title.innerText = data.title;
        banner_subtitle.innerText = data.description;

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

        bg_image_index = (bg_image_index + 1) % keys.length;
    };
    img.src = data.url; // Trigger the load event
}

initBanner();

swip_anime.dataset.state = "right";
function add_class_name(class_name , element){
    element.classList.toggle(class_name);
}