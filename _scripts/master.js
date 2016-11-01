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
    const viewportScrollTop = e.target.body.scrollTop;
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
window.addEventListener('scroll', function(e) {
    handleSitePageActivation(e);

    const viewportScrollTop = e.target.body.scrollTop;
    handleNavIcon(lastScrollTop, viewportScrollTop);
    lastScrollTop = viewportScrollTop
});



/* Navigation ****************** */
const navButton = document.querySelector('.nav-icon');
let navDirection = 'down';

function switchNavButtonDirection(direction) {
    navDirection = direction;
    switch ( direction ) {
        case 'down':
            navButton.classList.add('nav-icon--down');
            navButton.classList.remove('nav-icon--up');
            break;
        case 'up':
            navButton.classList.remove('nav-icon--down');
            navButton.classList.add('nav-icon--up');
            break;
        default:
            break;
    }
}

function handleNavIcon(lastScrollTop, viewportScrollTop) {
    const newDirection = lastScrollTop >= viewportScrollTop ? 'up' : 'down';
    switchNavButtonDirection( newDirection );

    const firstSectionEnd = sitePageSections[0].end - (window.innerHeight / 2);
    const lastSectionStart = sitePageSections[sitePageSections.length - 1].start - (window.innerHeight / 2);
    if ( viewportScrollTop < firstSectionEnd ) switchNavButtonDirection('down');
    if ( viewportScrollTop > lastSectionStart ) switchNavButtonDirection('up');
}


function scrollToNextSection(e) {

    const buttonPosY = e.pageY;

    function isInSection(section) {
        return (buttonPosY > section.start ) && (buttonPosY < section.end )
    }

    function scrollTo(i) {
        let nextSectionID;
        switch(navDirection) {
            case 'down':
                nextSectionID = sitePageSections[i + 1].element.id;
                EPPZScrollTo.scrollVerticalToElementById(nextSectionID, 20);
                break;
            case 'up':
                nextSectionID = sitePageSections[i - 1].element.id;
                EPPZScrollTo.scrollVerticalToElementById(nextSectionID, 20);
                break;
            default:
                break;
        }
    }

    for (let i = 0; i < sitePageSections.length; i++) {
        if ( isInSection(sitePageSections[i]) ) scrollTo(i);
    }
}

navButton.addEventListener('click', function(e) {
    scrollToNextSection(e)
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