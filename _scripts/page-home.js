{
    const typedElement = document.querySelector('.typed');
    const originalSentenceHTML = typedElement.innerHTML;
    const sentenceTextContent = typedElement.textContent;
    typedElement.innerHTML = '';
    const sentenceArray = sentenceTextContent.split('');

    function finish() {
        // typedElement.innerHTML = originalSentenceHTML;
    }

    function next() {
        if (index < (sentenceArray.length - 1)) {
            index++;
            addLetter(index);
        } else {
            setTimeout(() => {
                finish()
            }, 300)
        }
    }

    let index = 0;

    function addLetter() {

        if (sentenceArray[index] === ' '
            && sentenceArray[index - 1] === ' ') {
            return next();
        }

        typedElement.innerHTML += sentenceArray[index];
        setTimeout(() => {
            next()
        }, 50)
    }

    addLetter();

}