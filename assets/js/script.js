
/* Slideshow Page ****************** */

function initialiseSlideshow() {

    const slideElements = Array.from( document.querySelectorAll('[data-slide]') );
    let index = 0;

    setInterval(function() {
        if ( index === (slideElements.length - 1) ) index = 0
        let imageUrl = slideElements[index].dataset.slide;
        slideshowBackground.style.backgroundImage = `url(${imageUrl})`;
        index++
    }, 3000);

}

const slideshowBackground = document.querySelector('.slideshow-background');
if ( slideshowBackground ) {
    initialiseSlideshow();
}


/* Nav ****************** */

const navButton = document.querySelector('.nav-icon');
navButton.addEventListener('click', function(e) {
    e.preventDefault();
    console.log("clicked");
})