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

window.addEventListener('scroll', function(e) {
    handleSitePageActivation(e);
});
