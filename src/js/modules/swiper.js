import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';


function swiperFunc() {
    let slidesPerViewOption = 3;

    const swiper = new Swiper('.swiper', {
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
            500: {
                slidesPerView: 2,
            },
        },
        spaceBetween: 20,

        navigation: {
            nextEl: '#swiper-button-next',
            prevEl: '#swiper-button-prev',
        },
    });
}

export default swiperFunc;