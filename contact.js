let form = document.getElementById('contact-form');

form.addEventListener('submit', function(){
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let message = document.getElementById('message');

    console.log(`Nome: ${name}<br> E-mail: ${email}<br> Mensagem: ${message}`);
})