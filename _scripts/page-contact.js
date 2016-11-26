{

    function makeRequest (opts) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(opts.method, opts.url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            if (opts.headers) {
                Object.keys(opts.headers).forEach(function (key) {
                    xhr.setRequestHeader(key, opts.headers[key]);
                });
            }
            var params = opts.params;
            if (params && typeof params === 'object') {
                params = Object.keys(params).map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                }).join('&');
            }
            xhr.send(params);
        });
    }

    const emailMessages = {
        work: `
I work at <input type="text" aria-label="Your Company" name="company" placeholder="Your Company Name">, and we would like you to work on our project as a 
<select name="role" id="role" aria-label="My Role" required>
    <option value="" disabled selected hidden>Choose a role</option>
    <option value="Front-End Developer">Front-End Developer</option>
    <option value="UI/UX Designer">UI/UX Designer</option>
    <option value="Consultant">Consultant</option>
</select>. 
Our project aims to launch in 
<select name="timeline" id="timeline" aria-label="Your Timeline" required>
    <option value="" disabled selected hidden>Choose a timeline</option>
    <option value="Less than 4 weeks">Less than 4 weeks</option>
    <option value="4 - 8 weeks">4 - 8 weeks</option>
    <option value="More than 8 weeks">More than 8 weeks</option>
</select>
and we have a budget of 
<select name="budget" id="budget" aria-label="Your Budget" required>
    <option value="" disabled selected hidden>Choose a budget</option>
    <option value="$500 - $1000">$500 - $1000</option>
    <option value="$1000 - $5000">$1000 - $5000</option>
    <option value="More than $5000">More than $5000</option>
</select>.
`,

        advice: `
I'm currently a <input type="text" name="your_role" id="advice_your_role" aria-label="Your Role" placeholder="Comp Science Student"> and I need some advice with <input type="text" aria-label="name" name="advice_your_topic" placeholder="Learning JavaScript">.
`,

        other: `
<textarea name="other_message" rows="2" aria-label="message" placeholder="Just saying hi :)"></textarea>
`
    };

    const emailForm = document.querySelector('.emailme-form');
    const submitButtonElement = document.querySelector('.emailme-submit');
    const emailBodyElement = document.querySelector('.emailme-message');
    const subjectField = document.getElementById('subject');
    const formMessageElement = document.querySelector('.emailme-preheader .right');

    emailBodyElement.innerHTML = `<small>(Choose a subject to start drafting your message)</small>`;

    function changeEmailBody(selectedOption) {
        const subject = selectedOption.dataset.subject;
        emailBodyElement.innerHTML = emailMessages[subject];
    }

    function handleSuccess() {
        emailForm.classList.remove('sending');
        emailForm.classList.add('success');
        setTimeout(function() {
            const element = document.querySelector('.emailme-preheader .left');
            element.style.textAlign = 'center';
            element.innerHTML = `Form Successfully Submited!<br>`;
            emailForm.classList.add('finish');
        }, 1000);

    }

    function handleError() {
        emailForm.classList.remove('sending');
        emailForm.classList.add('error');
        setTimeout(function() {
            emailForm.classList.remove('error');
        }, 1000);
    }

    function submitForm() {
        emailForm.classList.add('sending');

        console.log(emailForm)

        setTimeout(function() {
            handleSuccess();
        }, 3000);
    }

    subjectField.addEventListener('change', (e) => {
        const selectedOption = e.target.selectedOptions[0];
        changeEmailBody(selectedOption);
    })

    // submitButtonElement.addEventListener('click', function(e) {
    //
    //     e.preventDefault();
    //
    //     console.log(e);
    //     submitForm();
    //     const formIsValid = emailForm.checkValidity();
    //     if ( formIsValid ) {
    //         submitForm();
    //     } else {
    //         formMessageElement.innerHTML = `Looks like you're missing some fields. Make sure everything is filled out.`
    //     }
    // });



}

