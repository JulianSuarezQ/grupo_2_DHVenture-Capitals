window.addEventListener("load", () => {
  let formulario = document.querySelector("form.product-form");

  formulario.addEventListener("submit", function (event) {
    let errors = [];

    let name = document.querySelector("#name");
    if (name.value == "") {
      errors.push("El nombre no puede estar vacio");
    } else if (name.value.length < 5) {
      errors.push("El nombre debe tener mas de 5 caracteres");
    }
    if (errors.length > 0) {
      event.preventDefault();
      let ulErrors = document.querySelector(".errors-name");
      errors.forEach((error) => {
        ulErrors.innerHTML = `<span style="color:red">${error}</span></br>`;
      });
      errors = [];
    }

    let detail = document.querySelector("#detail");

    if (detail.value == "") {
      errors.push("El detalle no puede estar vacio");
    } else if (detail.value.length < 20) {
      errors.push("El detalle debe tener mas de 20 caracteres");
    }
    if (errors.length > 0) {
      event.preventDefault();
      let ulErrors = document.querySelector(".errors-detail");
      errors.forEach((error) => {
        ulErrors.innerHTML = `<span style="color:red">${error}</span></br>`;
      });
      errors = [];
    }

    let color = document.querySelector("#color");

    if (color.value == "") {
      errors.push("El color no puede estar vacio");
    } else if (detail.value.length < 4) {
      errors.push("El color debe tener mas de 4 caracteres");
    }
    if (errors.length > 0) {
      event.preventDefault();
      let ulErrors = document.querySelector(".errors-color");
      errors.forEach((error) => {
        ulErrors.innerHTML = `<span style="color:red">${error}</span></br>`;
      });
      errors = [];
    }

    let stock = document.querySelector("#stock");

    if (stock.value == "") {
      errors.push("El stock no puede estar vacio");
    } else if (stock.value.length < 1) {
      errors.push("El stock debe tener mas de 1 caracter");
    }
    if (errors.length > 0) {
      event.preventDefault();
      let ulErrors = document.querySelector(".errors-stock");
      errors.forEach((error) => {
        ulErrors.innerHTML = `<span style="color:red">${error}</span></br>`;
      });
      errors = [];
    }

    let price = document.querySelector("#price");

    if (price.value == "") {
      errors.push("El precio no puede estar vacio");
    }
    if (errors.length > 0) {
      event.preventDefault();
      let ulErrors = document.querySelector(".errors-price");
      errors.forEach((error) => {
        ulErrors.innerHTML = `<span style="color:red">${error}</span></br>`;
      });
      errors = [];
    }

    let file = document.querySelector("#img");
    if (!file.value) {
      errors.push("El campo debe tener una imagen");
    } else {
      if (!/\.(jpg|png|gif|jpeg)$/i.test(file.value)) {
        errors.push(
          "Las extensiones de archivo permitidas son .jpg, .png, .gif o .jpeg"
        );
      }
    }

    if (errors.length > 0) {
      event.preventDefault();
      let ulErrores = document.querySelector(".errors-img");

      errors.forEach((error) => {
        ulErrores.innerHTML = `<span style="color:red">${error}</span></br>`;
      });
      errors = [];
    }
  });
});
