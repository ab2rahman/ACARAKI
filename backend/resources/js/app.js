import "flowbite";

import './../../vendor/power-components/livewire-powergrid/dist/powergrid';
import './../../vendor/power-components/livewire-powergrid/dist/tailwind.css';

import { tns } from "tiny-slider";
const EVSliders = document.querySelectorAll(".ev-slider");

EVSliders.forEach(element => {
    const parent = `.ev-slider[data-id="${element.dataset.id}"]`;

    // console.log(parent);
    const sliderTop = new Swiper(`${parent} .swiper-img`, {
        // effect: "fade",
        loop: false,
        slideToClickedSlide: true,
    });

    const sliderBottom = new Swiper(`${parent} .swiper-text`, {
        // effect: "fade",
        centeredSlides: true,

        navigation: {
            nextEl: `${parent} .swiper-next`,
            prevEl: `${parent} .swiper-prev`
        },
        loop: false,
    });

    sliderTop.controller.control = sliderBottom;
    sliderBottom.controller.control = sliderTop;
});

const tags = document.querySelectorAll(".tag-slider");

tags.forEach(el => {
    const parent = `.tag-slider[data-id="${el.dataset.id}"]`;

    new Swiper(`${parent} .tag-container`, {
        slidesPerView: 'auto',
        spaceBetween: 4,
        navigation: {
            nextEl: `${parent} .swiper-next`,
            prevEl: `${parent} .swiper-prev`
        }
    });
});

const shareLinks = document.querySelectorAll('[data-share-popup]');

shareLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        sharePopup(link.getAttribute('href'));
    }, false);

})

function sharePopup(href) {
    const width = 555,
    height = 600,
    leftPosition = window.screen.width / 2 - (width / 2 + 10),
    topPosition = window.screen.height / 2 - (height / 2 + 50);

    let title = '';
    
    var windowFeatures =
        "status=no,height=" +
        height +
        ",width=" +
        width +
        ",left=" +
        leftPosition +
        ",top=" +
        topPosition +
        ",screenX=" +
        leftPosition +
        ",screenY=" +
        topPosition +
        ",,resizable=1toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";

    if (href.indexOf("twitter")) {
        title = "Share to Twitter";
    } else if (href.indexOf("facebook")) {
        title = "Share to Facebook";
    } else if (href.indexOf("linkedin")) {
        title = "Share to Linkedin";
    } else {
        title = "Share";
    }
    window.open(href, title, windowFeatures);
    return false;
}


// if (document.querySelectorAll('.tag-container').length > 0) {
//   const logoSlider = tns({
//     container: '.tag-container',
//     items: 5,
//     loop: false,
//     center: false,
//     edgePadding: 40,
//     swipeAngle: false,
//     prevButton: '.prev',
//     nextButton: '.next',
//   });
// }
if (document.querySelectorAll('.knowledge-slider').length > 0) {
    var slider = tns({
        container: '.knowledge-slider',
        items: 4,
        loop: false,
        fixedWidth: 260,
        gutter: 20,
    });
}

if (document.querySelectorAll('.silder-card').length > 0) {
    var sliderCard = tns({
        container: '.silder-card',
        items: 1,
        swipeAngle: false,
        autoplay: false,
        speed: 400,
        prevButton: '.prev',
        nextButton: '.next',
        mode: 'gallery'
    });
}

if (document.getElementById('toast-success')) {
    setTimeout(() => {
        var fadeTarget = document.getElementById('toast-success');
        var fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.1;
            } else {
                clearInterval(fadeEffect);
            }        
        }, 30);
        fadeTarget.style.display = 'none';
    }, 1000);

}

