function scrollScreenshot(screenshotElement, direction) {
    let currentTransform = screenshotElement.style.transform ? screenshotElement.style.transform : 'translateY(0%)';
    currentTransform = currentTransform.split('(')[1];
    currentTransform = currentTransform.split('%')[0];

    switch(direction) {
        case 'down':
            currentTransform = parseFloat(currentTransform) - 0.5
            break;
        case 'up':
            currentTransform = parseFloat(currentTransform) + 0.5
            break;
        default:
            break;
    }

    if ( currentTransform < 0.5 && currentTransform > -100 ) {
        screenshotElement.style.transform = `translateY(${currentTransform}%)`;
    }
}

function resetScreenshot(screenshotElement) {
    screenshotElement.style.transition = 'transform 0.5s';
    screenshotElement.style.transform = 'translateY(0%)';
    setTimeout(() => {
        screenshotElement.style.transition = 'none';
    }, 1000);
}

const workSections = [];
const workSectionElements = document.querySelectorAll('.work');
workSectionElements.forEach((element) => {
    workSections.push({
        element: element,
        start: element.offsetTop - 250,
        end: element.offsetTop + element.clientHeight
    })
});

let lastScrollTop = 0;
window.addEventListener('scroll', function(e) {

    const viewportScrollTop = e.target.body.scrollTop;
    function scrollDirection() {
        if ( lastScrollTop >= viewportScrollTop ) return 'up';
        return 'down';
    }
    function isInView(workSection) {
        return viewportScrollTop > workSection.start && viewportScrollTop < workSection.end
    }

    workSections.forEach((workSection) => {
        const screenshotElement = workSection.element.querySelector('.work-screenshot');
        if ( viewportScrollTop < 20 || !isInView(workSection)) return resetScreenshot(screenshotElement);
        scrollScreenshot( screenshotElement, scrollDirection() )
    });

    lastScrollTop = viewportScrollTop
});



