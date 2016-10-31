{

    const slideElements = Array.from(document.querySelectorAll('[data-slide]'));
    const slideshowBackground = document.querySelector('.slideshow-background');

    function initialiseSlideshow() {
        slideElements.forEach((slideElement) => {
            slideElement.addEventListener('mouseenter', function (e) {
                changeSlideBackground(e.target);
            });
        });
    }

    function changeSlideBackground(element) {
        const imageUrl = element.dataset.slide;
        slideshowBackground.style.backgroundImage = `url(${imageUrl})`;
    }

    initialiseSlideshow();

}