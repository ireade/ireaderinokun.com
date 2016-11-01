"use strict";function handleSitePageActivation(e){function t(e){return n>e.start-window.innerHeight/2&&n<e.end-window.innerHeight/5}var n=e.target.body.scrollTop;sitePageSections.forEach(function(e){t(e)?(e.element.classList.add("site-page--active"),e.element.classList.remove("site-page--inactive")):(e.element.classList.remove("site-page--active"),e.element.classList.add("site-page--inactive"))})}function switchNavButtonDirection(e){switch(navDirection=e,e){case"down":navButton.classList.add("nav-icon--down"),navButton.classList.remove("nav-icon--up");break;case"up":navButton.classList.remove("nav-icon--down"),navButton.classList.add("nav-icon--up")}}function handleNavIcon(e,t){var n=e>=t?"up":"down";switchNavButtonDirection(n);var o=sitePageSections[0].end-window.innerHeight/2,i=sitePageSections[sitePageSections.length-1].start-window.innerHeight/2;t<o&&switchNavButtonDirection("down"),t>i&&switchNavButtonDirection("up")}function scrollToNextSection(e){function t(e){return o>e.start&&o<e.end}function n(e){var t=void 0;switch(navDirection){case"down":t=sitePageSections[e+1].element.id,EPPZScrollTo.scrollVerticalToElementById(t,20);break;case"up":t=sitePageSections[e-1].element.id,EPPZScrollTo.scrollVerticalToElementById(t,20)}}for(var o=e.pageY,i=0;i<sitePageSections.length;i++)t(sitePageSections[i])&&n(i)}var EPPZScrollTo={documentVerticalScrollPosition:function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},viewportHeight:function(){return"CSS1Compat"===document.compatMode?document.documentElement.clientHeight:document.body.clientHeight},documentHeight:function(){return void 0!==document.height?document.height:document.body.offsetHeight},documentMaximumScrollPosition:function(){return this.documentHeight()-this.viewportHeight()},elementVerticalClientPositionById:function(e){var t=document.getElementById(e),n=t.getBoundingClientRect();return n.top},scrollVerticalTickToPosition:function(e,t){var n=.2,o=60,i=parseFloat(t)-parseFloat(e),c=Math.abs(i)<=.5;return c?void scrollTo(0,t):(e=parseFloat(e)*(1-n)+parseFloat(t)*n,scrollTo(0,Math.round(e)),void setTimeout("EPPZScrollTo.scrollVerticalTickToPosition("+e+", "+t+")",1e3/o))},scrollVerticalToElementById:function(e,t){var n=document.getElementById(e);if(null==n)return void console.warn("Cannot find element with id '"+e+"'.");var o=this.documentVerticalScrollPosition()+this.elementVerticalClientPositionById(e)-t,i=this.documentVerticalScrollPosition(),c=this.documentMaximumScrollPosition();o>c&&(o=c),this.scrollVerticalTickToPosition(i,o)}},sitePageEls=document.querySelectorAll(".site-page"),sitePageSections=[];sitePageEls.forEach(function(e){sitePageSections.push({element:e,start:e.offsetTop,end:e.offsetTop+e.clientHeight})});var lastScrollTop=0;window.addEventListener("scroll",function(e){handleSitePageActivation(e);var t=e.target.body.scrollTop;handleNavIcon(lastScrollTop,t),lastScrollTop=t});var navButton=document.querySelector(".nav-icon"),navDirection="down";navButton.addEventListener("click",function(e){scrollToNextSection(e)}),"serviceWorker"in navigator&&navigator.serviceWorker.register("sw.js").then(function(e){console.log("Service Worker Registered :)")}).catch(function(e){console.log("Service Worker Failed to Register :(")}),!function(){var e=function(){},t=function(){r<c.length-1?(r++,n(r)):setTimeout(function(){e()},300)},n=function(){return" "===c[r]&&" "===c[r-1]?t():(o.innerHTML+=c[r],void setTimeout(function(){t()},50))},o=document.querySelector(".typed"),i=(o.innerHTML,o.textContent);o.innerHTML="";var c=i.split(""),r=0;n()}(),!function(){var e=function(){n.forEach(function(e){e.addEventListener("mouseenter",function(e){t(e.target)})})},t=function(e){var t=e.dataset.slide;o.style.backgroundImage="url("+t+")"},n=Array.from(document.querySelectorAll("[data-slide]")),o=document.querySelector(".slideshow-background");e()}(),!function(){var e=function(e,t){var n=e.style.transform?e.style.transform:"translateY(0%)";switch(n=n.split("(")[1],n=n.split("%")[0],t){case"down":n=parseFloat(n)-.5;break;case"up":n=parseFloat(n)+.5}n<.5&&n>-100&&(e.style.transform="translateY("+n+"%)")},t=function(e){e.style.transition="transform 0.5s",e.style.transform="translateY(0%)",setTimeout(function(){e.style.transition="none"},1e3)},n=document.querySelector(".site-page--work"),o=[],i=document.querySelectorAll(".work");i.forEach(function(e){o.push({element:e,start:e.offsetTop+n.offsetTop-window.innerHeight/2,end:e.offsetTop+n.offsetTop+e.clientHeight})});var c=0;window.addEventListener("scroll",function(n){function i(){return c>=s?"up":"down"}function r(e){return s>e.start&&s<e.end}var s=n.target.body.scrollTop;o.forEach(function(n){var o=n.element.querySelector(".work-screenshot");return r(n)?void e(o,i()):t(o)}),c=s})}();var articleElements=Array.from(document.querySelectorAll(".excerpts-highlightEffect .excerpt"));articleElements&&!function(){var e=function(e){articleElements.forEach(function(e){e.classList.add("inactive"),e.classList.remove("active")}),e.classList.remove("inactive"),e.classList.add("active")},t=function(){articleElements.forEach(function(e){e.classList.remove("inactive"),e.classList.remove("active")})};articleElements.forEach(function(n){n.addEventListener("mouseenter",function(t){e(t.target)}),n.addEventListener("mouseleave",function(e){t()})})}();