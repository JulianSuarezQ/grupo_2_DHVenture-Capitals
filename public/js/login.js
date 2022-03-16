window.addEventListener('load', function(){

    let formulario = document.querySelector('#form_login')

    formulario.addEventListener('submit', function(evento){
    
        let error = undefined;
        
        let email = document.querySelector('#email')
        if (email.value == ''){
            error = 'Los campos estan vacios';
        };

        let password = document.querySelector('#password')
        if (password.value == ''){
            error= 'Los campos estan vacios';
        }

        if (error){
            evento.preventDefault()
            let error_view = document.querySelector('.errors_login');
            error_view.innerHTML = `<span style = 'color: red'> ${error}  </span>`
        }
    })







})