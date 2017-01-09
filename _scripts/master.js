const sitePageEls = document.querySelectorAll('.site-page');
const sitePageSections = [];
sitePageEls.forEach((element) => {
    sitePageSections.push({
        element: element,
        start: element.offsetTop,
        end: element.offsetTop + element.clientHeight
    })
});

function handleSitePageActivation(e) {
    const viewportScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    function isInView(section) {
        return (viewportScrollTop > (section.start - (window.innerHeight / 2)) )
            && (viewportScrollTop < (section.end - (window.innerHeight / 5)) )
    }
    sitePageSections.forEach((section) => {
        if ( isInView(section) ) {
            section.element.classList.add('site-page--active')
            section.element.classList.remove('site-page--inactive')
        } else {
            section.element.classList.remove('site-page--active')
            section.element.classList.add('site-page--inactive')
        }
    });
}

let lastScrollTop = 0;
window.addEventListener('scroll', handleSitePageActivation);

/* Navigation ****************** */
const navButton = document.querySelector('.nav-icon');
navButton.addEventListener('click', function(e) {
    // scrollToNextSection(e)
    EPPZScrollTo.scrollVerticalToElementById('writing', 20);
})




/* Service Worker ****************** */

if ( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.register('sw.js')
        .then((reg) => {
            console.log("Service Worker Registered :)")
        })
        .catch((err) => {
            console.log("Service Worker Failed to Register :(")
        })
}