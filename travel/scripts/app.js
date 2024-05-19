let data_banner = {
    "dubai": {
        "title": "Dubai",
        "description": "Assalomu alakum biz bilan dubayga arzon narxlarda maroqli sayoxat qilishni istaysizmi unda darxol bizga murojat qiling",
        "url": "../images/videos/dubai.mp4"
    },
    "misr": {
        "title": "Misr",
        "description": "Assalomu alakum biz bilan dubayga arzon narxlarda maroqli sayoxat qilishni istaysizmi unda darxol bizga murojat qiling",
        "url": "../images/videos/misr.mp4"
    },
    "antaliya": {
        "title": "Antaliya",
        "description": "Assalomu alakum biz bilan dubayga arzon narxlarda maroqli sayoxat qilishni istaysizmi unda darxol bizga murojat qiling",
        "url": "../images/videos/antalia.mp4"
    }
}

let home_video_bg_element = document.querySelector(".video_bg video");
let banner_title = document.querySelector(".banner_title h1");
let banner_subtitle = document.querySelector(".banner_subtitle h2");
let video_index = 0;
let videos = Object.values(data_banner);
let total_videos = videos.length;

function playNextVideo() {
    home_video_bg_element.src = videos[video_index].url;
    banner_title.innerText = videos[video_index].title;
    banner_subtitle.innerText = videos[video_index].description;
    video_index = (video_index + 1) % total_videos;
    home_video_bg_element.play();
}

function playPreviousVideo() {
    if (video_index == 0) {
        video_index = total_videos - 1;
    } else {
        video_index = (video_index - 1) % total_videos;
    }
    home_video_bg_element.src = videos[video_index].url;
    banner_title.innerText = videos[video_index].title;
    banner_subtitle.innerText = videos[video_index].description;
    home_video_bg_element.play();
}

function playPauseVideo() {
    if (home_video_bg_element.paused) {
        home_video_bg_element.play();
    } else {
        home_video_bg_element.pause();
    }
}

playNextVideo();

document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowLeft") {
        playPreviousVideo();
    } else if (event.key === "ArrowRight") {
        playNextVideo();
    } else if (event.key === " ") {
        playPauseVideo();
    }
});

function add_class_name(class_name , element){
    element.classList.toggle(class_name);
}