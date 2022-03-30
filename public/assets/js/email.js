console.log('hello thom');

// $(document).ready(function() {
// 	$('.submitBtn').click(function(event) {
// 		event.preventDefault()
// 		console.log('button clicked')

// 		let name = $('#name').val()
// 		let email = $('#email').val()
// 		let subject = $('#subject').val()
// 		let message = $('#message').val()

// 		console.log(name, email, subject, message)
// 	})
// })


var form = document.getElementById("my-form");
    
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
	method: form.method,
	body: data,
	headers: {
		'Accept': 'application/json'
	}
  }).then(response => {
	if (response.ok) {
	  status.innerHTML = "Thanks for your submission!";
	  form.reset()
	} else {
	  response.json().then(data => {
		if (Object.hasOwn(data, 'errors')) {
		  status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
		} else {
		  status.innerHTML = "Oops! There was a problem submitting your form"
		}
	  })
	}
  }).catch(error => {
	status.innerHTML = "Oops! There was a problem submitting your form"
  });
}
form.addEventListener("submit", handleSubmit)