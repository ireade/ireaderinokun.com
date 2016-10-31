/**
 *
 * Created by Borbás Geri on 12/17/13
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


var EPPZScrollTo =
{
    /**
     * Helpers.
     */
    documentVerticalScrollPosition: function()
    {
        if (self.pageYOffset) return self.pageYOffset; // Firefox, Chrome, Opera, Safari.
        if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop; // Internet Explorer 6 (standards mode).
        if (document.body.scrollTop) return document.body.scrollTop; // Internet Explorer 6, 7 and 8.
        return 0; // None of the above.
    },

    viewportHeight: function()
    { return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight; },

    documentHeight: function()
    { return (document.height !== undefined) ? document.height : document.body.offsetHeight; },

    documentMaximumScrollPosition: function()
    { return this.documentHeight() - this.viewportHeight(); },

    elementVerticalClientPositionById: function(id)
    {
        var element = document.getElementById(id);
        var rectangle = element.getBoundingClientRect();
        return rectangle.top;
    },

    /**
     * Animation tick.
     */
    scrollVerticalTickToPosition: function(currentPosition, targetPosition)
    {
        var filter = 0.2;
        var fps = 60;
        var difference = parseFloat(targetPosition) - parseFloat(currentPosition);

        // Snap, then stop if arrived.
        var arrived = (Math.abs(difference) <= 0.5);
        if (arrived)
        {
            // Apply target.
            scrollTo(0.0, targetPosition);
            return;
        }

        // Filtered position.
        currentPosition = (parseFloat(currentPosition) * (1.0 - filter)) + (parseFloat(targetPosition) * filter);

        // Apply target.
        scrollTo(0.0, Math.round(currentPosition));

        // Schedule next tick.
        setTimeout("EPPZScrollTo.scrollVerticalTickToPosition("+currentPosition+", "+targetPosition+")", (1000 / fps));
    },

    /**
     * For public use.
     *
     * @param id The id of the element to scroll to.
     * @param padding Top padding to apply above element.
     */
    scrollVerticalToElementById: function(id, padding)
    {
        var element = document.getElementById(id);
        if (element == null)
        {
            console.warn('Cannot find element with id \''+id+'\'.');
            return;
        }

        var targetPosition = this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - padding;
        var currentPosition = this.documentVerticalScrollPosition();

        // Clamp.
        var maximumScrollPosition = this.documentMaximumScrollPosition();
        if (targetPosition > maximumScrollPosition) targetPosition = maximumScrollPosition;

        // Start animation.
        this.scrollVerticalTickToPosition(currentPosition, targetPosition);
    }
};






/* Nav ****************** */

// const navButton = document.querySelector('.nav-icon');
// navButton.addEventListener('click', function(e) {
//     e.preventDefault();
//     if ( e.target.classList.contains('nav-icon--floating--up') ) {
//         EPPZScrollTo.scrollVerticalToElementById('body', 20);
//     } else if ( e.target.classList.contains('nav-icon--floating--down') ) {
//         EPPZScrollTo.scrollVerticalToElementById('nav', 20);
//     }
// })
//
//
// const navElement = document.querySelector('#nav')
// window.addEventListener('scroll', function(e) {
//
//     const navOffset = navElement.offsetTop - 150;
//     const viewportScrollTop = e.target.body.scrollTop;
//
//     if ( viewportScrollTop >= navOffset ) {
//         document.querySelector('.nav-icon--floating').classList.add('nav-icon--floating--up');
//         document.querySelector('.nav-icon--floating').classList.remove('nav-icon--floating--down');
//     } else {
//         document.querySelector('.nav-icon--floating').classList.remove('nav-icon--floating--up');
//         document.querySelector('.nav-icon--floating').classList.add('nav-icon--floating--down');
//     }
//
// })



/* Nav ****************** */

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