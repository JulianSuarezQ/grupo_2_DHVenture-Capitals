window.addEventListener('load', function(){

    let formulario = document.querySelector('#form_login')

    formulario.addEventListener('submit', function(evento){
    
        let error = undefined;
        
        let email = document.querySelector('#email')
        if (email.value == ''){
            error = 'Los campos no pueden estar vacios';
        };

        let password = document.querySelector('#password')
        if (password.value == ''){
            error= 'Los campos no pueden estar vacios';
        }

        if (error){
            evento.preventDefault()
            let error_view = document.querySelector('.errors_login');
            error_view.innerHTML = `<span style = 'color: red'> ${error}  </span>`
        }

        fetch("http://localhost:3000/apis/email/" + email.value)
            .then(function(respuesta){
                return respuesta.json()
            })
            .then(function(datos){
                console.log(datos)
                if(datos.data == null){
                    evento.preventDefault()
                   let error= 'Las credenciales no existen';
                    let error_view = document.querySelector('.errors_login');
                    error_view.innerHTML = `<span style = 'color: red'> ${error}  </span>`
                }
            })

    })

})