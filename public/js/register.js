
window.addEventListener("load", () => {

    let formulario = document.querySelector("form.register-form")
    console.log("validation front")

    formulario.addEventListener("submit", function(event){
        event.preventDefault();

        let errors = [];
        
        //validation name
        let name = document.querySelector("#name")
        if(name.value == ""){
            errors.push("El nombre no puede estar vacio")
        }else if(name.value.length < 2){
            errors.push("El nombre no puede tener menos de dos caracteres")
        }
        console.log("errores name", errors)
        if(errors.length > 0){
            event.preventDefault();
            let ulErrores = document.querySelector(".errors-name")
            errors.forEach(error => {
                ulErrores.innerHTML = `<span style="color:red">${error}</span></br>`
            });
            errors = [];
        }

        //validation last_name
        let last_name = document.querySelector("#last_name")
        if(last_name.value == ""){
            errors.push("El apellido no puede estar vacio")
        }else if(last_name.value.length < 2){
            errors.push("El apellido no puede tener menos de dos caracteres")
        }
        console.log("errores last_name", errors)
        if(errors.length > 0){
            event.preventDefault();
            let ulErrores = document.querySelector(".errors-last_name")

            errors.forEach(error => {
                ulErrores.innerHTML = `<span style="color:red">${error}</span></br>`
            });
            errors = [];
        }

        //password
        let password = document.querySelector("#password");
        passwordRegex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/; //script para validar un password

        if(password.value.length <= 8 && !password.value.length >= 16){
            errors.push("El password tiene que tener de 8 a 16 caracteres")
        }else if(!passwordRegex.test(password.value)){
            errors.push("No es un password valido")
        }

        console.log("errores password", errors)

        if(errors.length > 0){
            event.preventDefault();
            let ulErrores = document.querySelector(".errors-password")

            errors.forEach(error => {
                ulErrores.innerHTML = `<span style="color:red">${error}</span></br>`
            });
            errors = [];
        }


        //validation img
        let file = document.querySelector("#file");
        console.log(file.value)
        if(!file.value){
            errors.push("El campo debe tener una imagen")
        }else{
            if (!(/\.(jpg|png|gif|jpeg)$/i).test(file.value)) {
                errors.push('Las extensiones de archivo permitidas son .jpg, .png, .gif o .jpeg');
            }
        }

        console.log("errores img", errors)

        if(errors.length > 0){
            event.preventDefault();
            let ulErrores = document.querySelector(".errors-file");

            errors.forEach(error => {
                ulErrores.innerHTML = `<span style="color:red">${error}</span></br>`
            });
            errors = [];
        }
    

        //validation email
        let email = document.querySelector("#email");
        emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i; //script para validar un email
        if(email.value == ""){
            errors.push("El email no puede estar vacio")
        }else if(!emailRegex.test(email.value)){
            errors.push("No es un email valido")
            console.log("error", errors)
        }

        if(errors.length == 0){
            fetch("http://localhost:3000/users/email/" + email.value)

            .then(function(respuesta){
                return respuesta.json()
            })
            .then(function(data){
                if(data.data !== null){
                    console.log(data)
                    errors.push("El mail ya existe")
                }
                console.log("errores mail", errors)
                if(errors.length > 0){
                    event.preventDefault();
                    let ulErrores = document.querySelector(".errors-email")
        
                    errors.forEach(error => {
                        ulErrores.innerHTML = `<span style="color:red">${error}</span></br>`
                    });
                }
            
            })
        }

    })//fin formulario

})//fin windows