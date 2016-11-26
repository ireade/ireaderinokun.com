{

    const emailMessages = {
        work: `
Hey Ire! <br>
I work at <input type="text" aria-label="Your Company" name="company" placeholder="Your Company Name">, and we would like you to work on our project as a 
<select name="role" id="role" aria-label="My Role" required>
    <option value="" disabled selected hidden>Choose a role</option>
    <option value="Front-End Developer">Front-End Developer</option>
    <option value="UI/UX Designer">UI/UX Designer</option>
    <option value="Consultant">Consultant</option>
 </select>. Our project aims to launch in 
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
 </select>.`,

        advice: `Hey Ire! <br>
I'm currently a <input type="text" name="your_role" id="advice_your_role" aria-label="Your Role" placeholder="Comp Science Student"> and I need some advice with <input type="text" aria-label="name" name="advice_your_topic" placeholder="Learning JavaScript">.`,

        other: `Hey Ire! <br>
<textarea name="other_message" rows="2" aria-label="message" placeholder="Just saying hi :)"></textarea>`
    }

    const emailBodyElement = document.querySelector('.emailme-message');


    function changeEmailBody(selectedOption) {

        const subject = selectedOption.dataset.subject;
        emailBodyElement.innerHTML = emailMessages[subject];

    }


    const subjectField = document.getElementById('subject');
    subjectField.addEventListener('change', (e) => {
        const selectedOption = e.target.selectedOptions[0];
        changeEmailBody(selectedOption);
    })

}

