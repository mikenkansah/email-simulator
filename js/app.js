//Variables
const sendBtn = document.getElementById('sendBtn'),
      email = document.getElementById('email'),
      subject = document.getElementById('subject'),
      message = document.getElementById('message'),
      resetBtn = document.getElementById('resetBtn'),
      sendEmailForm = document.getElementById('email-form');


//Eventlisteners
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', appInit);
    email.addEventListener('blur', validateField);
    subject.addEventListener('blur', validateField);
    message.addEventListener('blur', validateField);

    //SEND email and reset button
    sendEmailForm.addEventListener('submit', sendEmail)
    resetBtn.addEventListener('click', restForm);
}


//Functions
function appInit() {
   sendBtn.disabled = true;
}

function sendEmail(e) {
    e.preventDefault();

    const spinner = document.querySelector('#spinner')
    spinner.style.display = 'block';

    //hide image
    const sendEmailImg = document.createElement('img');
    sendEmailImg.src = 'img/mail.gif';
    sendEmailImg.style.display = 'block';

    //hide spinner then show image
    setTimeout(function(){
      //hide spinner 
      spinner.style.display = 'none';

      //show the image
      document.querySelector('#loaders').appendChild(sendEmailImg);

      //after 5seconds
      setTimeout(function() {
          sendEmailForm.reset();
          sendEmailImg.remove();

      }, 5000); 
    }, 3000);
}

function validateField() {
    let errors;

    //validate the length of the field
    validateLength(this)
    
    //validate email
    if(this.type === 'email'){
        validateEmail(this);
    }

    //both will return errors then check if there no errors
    errors = document.querySelectorAll('.error')

    //check whether th inputs are not empty
    if(email.value !== '' && subject.value !== '' && message.value !== ''){
        if(errors.length === 0) {
            //then button should be enabled
            sendBtn.disabled = false;
        }
    }
}

//validate the length of the field
function validateLength(field) {
    if(field.value.length > 0 ) {
        field.style.borderBottomColor = 'green';
        field.classList.remove('errors');
    }else{
        field.style.borderBottomColor = 'red';
        field.classList.add('errors');
    }
}

//validate email (checks for @ in the field)

function validateEmail(field) {
    let emailText = field.value;
    //check if email contains @ sign
    if(emailText.indexOf('@') !== -1) {
        field.style.borderBottomColor = 'green';
        field.classList.remove('errors');
    }else{
        field.style.borderBottomColor = 'red';
        field.classList.add('errors');
    }

}

function resetForm() {
    sendEmailForm.reset();
}