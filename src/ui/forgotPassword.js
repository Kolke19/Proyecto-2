const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";
const formulario = document.getElementById("form");
const inputsModal = document.querySelectorAll("#form input");
const expresiones = {
  password: /^.{8,30}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{8,30}$/,
};

for (const el of openEls) {
  el.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const el of closeEls) {
  el.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

document.addEventListener("keyup", (e) => {
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

const camposModal = {
  password: false,
  correo: false,
};

const validarForm = (e) => {
  switch (e.target.name) {
    case "correo":
      validarCampoModal(expresiones.correo, e.target, "correo");
      break;
    case "password":
      validarCampoModal(expresiones.password, e.target, "password");
      validarPassword2Modal();
      break;
    case "password2":
      validarPassword2Modal();
      break;
  }
};

const validarCampoModal = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`group-${campo}`)
      .classList.remove("form-group-incorrecto");
    document
      .getElementById(`group-${campo}`)
      .classList.add("form-group-correcto");
    document
      .querySelector(`#group-${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#group-${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#group-${campo} .form-input-error`)
      .classList.remove("form-input-error-activo");
    camposModal[campo] = true;
  } else {
    document
      .getElementById(`group-${campo}`)
      .classList.add("form-group-incorrecto");
    document
      .getElementById(`group-${campo}`)
      .classList.remove("form-group-correcto");
    document
      .querySelector(`#group-${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#group-${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#group-${campo} .form-input-error`)
      .classList.add("form-input-error-activo");
    camposModal[campo] = false;
  }
};

const validarPassword2Modal = () => {
  const inputPassword1 = document.getElementById("password");
  const inputPassword2 = document.getElementById("password2");

  if (inputPassword1.value !== inputPassword2.value) {
    document
      .getElementById(`group-password2`)
      .classList.add("form-group-incorrecto");
    document
      .getElementById(`group-password2`)
      .classList.remove("form-group-correcto");
    document
      .querySelector(`#group-password2 i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#group-password2 i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#group-password2 .form-input-error`)
      .classList.add("form-input-error-activo");
    camposModal["password"] = false;
  } else {
    document
      .getElementById(`group-password2`)
      .classList.remove("form-group-incorrecto");
    document
      .getElementById(`group-password2`)
      .classList.add("form-group-correcto");
    document
      .querySelector(`#group-password2 i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#group-password2 i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#group-password2 .form-input-error`)
      .classList.remove("form-input-error-activo");
    camposModal["password"] = true;
  }
};

inputsModal.forEach((input) => {
  input.addEventListener("keyup", validarForm);
  input.addEventListener("blur", validarForm);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (camposModal.password && camposModal.correo) {
    form.reset();

    document
      .getElementById("form-mensaje-exito")
      .classList.add("form-mensaje-exito-activo");
    document
      .getElementById("form-mensaje")
      .classList.remove("form-mensaje-activo");
    setTimeout(() => {
      document
        .getElementById("form-mensaje-exito")
        .classList.remove("form-mensaje-exito-activo");
    }, 5000);

    document.querySelectorAll(".form-group-correcto").forEach((icono) => {
      icono.classList.remove("form-group-correcto");
    });
  } else {
    document
      .getElementById("form-mensaje")
      .classList.add("form-mensaje-activo");
  }
});
