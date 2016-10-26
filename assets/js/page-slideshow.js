/* Slideshow Page ****************** */

const slideElements = Array.from( document.querySelectorAll('[data-slide]') );
const slideshowBackground = document.querySelector('.slideshow-background');

function initialiseSlideshow() {

    slideElements.forEach((slideElement) => {
        slideElement.addEventListener('mouseenter', function(e) {
            changeSlideBackground(e.target);
        });
        slideElement.addEventListener('mouseleave', function(e) {
            resetSlideBackground()
        });
    });

}


function changeSlideBackground(element) {
    const imageUrl = element.dataset.slide;

    //slideshowBackground.style.backgroundImage = 'none';
    slideshowBackground.style.backgroundImage = `url(${imageUrl})`;

    // setTimeout(() => {
    //     slideshowBackground.style.backgroundImage = `url(${imageUrl})`;
    // }, 500)



    slideElements.forEach((slideElement) => {
        slideElement.classList.add('inactive');
        slideElement.classList.remove('active');
    });
    element.classList.remove('inactive');
    element.classList.add('active');
}

function resetSlideBackground() {
    slideElements.forEach((slideElement) => {
        slideElement.classList.remove('inactive');
        slideElement.classList.remove('active');
    })
}



if ( slideshowBackground ) {
    initialiseSlideshow();
}