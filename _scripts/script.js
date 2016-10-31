


/* Article ****************** */

const articleElements = Array.from( document.querySelectorAll('.excerpts-highlightEffect .excerpt') );
if ( articleElements ) {

    function highlightElement(element) {
        articleElements.forEach((slideElement) => {
            slideElement.classList.add('inactive');
            slideElement.classList.remove('active');
        });
        element.classList.remove('inactive');
        element.classList.add('active');
    }

    function resetElements() {
        articleElements.forEach((el) => {
            el.classList.remove('inactive');
            el.classList.remove('active');
        })
    }

    articleElements.forEach((el) => {
        el.addEventListener('mouseenter', function(e) {
            highlightElement(e.target);
        });
        el.addEventListener('mouseleave', function(e) {
            resetElements()
        });
    });
}




/* Genr ****************** */
const sitePages = document.querySelectorAll('.site-page');
const sitePageSections = [];
sitePages.forEach((element) => {
    sitePageSections.push({
        element: element,
        start: element.offsetTop,
        end: element.offsetTop + element.clientHeight
    })
});



window.addEventListener('scroll', function(e) {

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
});


///


