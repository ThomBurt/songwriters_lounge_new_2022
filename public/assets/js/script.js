const contactEmail = document.getElementById('name-input-email')
const contactSubject = document.getElementById('subject-input-contact')
const contactMessage = document.getElementById('message-input-contact')
 const sendButton = document.getElementById('send-contact-button')

function sendEmail() {
    Email.send({
        Host : "smtp.gmail.com",
        Username : "thomburt10@gmail.com",
        Password : "",
        To : 'thom@songwriterslounge.net',
        From : contactEmail.value,
        Subject : contactSubject.value,
        Body : contactMessage.value
    }).then(
      message => alert(message)
    );
};

sendButton.addEventListener('click', sendEmail());