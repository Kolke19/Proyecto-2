//variables
const usuarioLogin = document.getElementById("usuarioLogin");
const passwordLogin = document.getElementById("passwordLogin");
const loginErrorUser= document.querySelector(".grupo_usuarioLogin p");
const loginErrorPass= document.querySelector(".grupo_passwordLogin p");
const buttonIniciar= document.querySelector(".form_login button");
let usuarioCorrecto = false;

//definimos los listening
form_login.addEventListener("submit", validarEntradas);

const campoLogin = {
  usuario: false,
  password: false
};
function verificar(entrada) {
  if (entrada.id == "usuarioLogin") {
    if (expressions.usuario.test(entrada.value)) {
      campoLogin["usuario"] = true;
      loginErrorUser.classList.remove("activeMsj");
      usuarioLogin.classList.remove("border_input_none","border_color_red");
      usuarioLogin.classList.add("border_color_green");
      viewError("usuarioLogin", true);
    } else {
      campoLogin["usuario"] = false;
      loginErrorUser.classList.add("activeMsj");
      usuarioLogin.classList.remove("border_input_none","border_color_green");
      usuarioLogin.classList.add("border_color_red");
      viewError("usuarioLogin", false);
    }
  }
  if (entrada.id == "passwordLogin") {
    if (expressions.password.test(entrada.value)) {
      campoLogin["password"] = true;
      loginErrorPass.classList.remove("activeMsj");
      passwordLogin.classList.remove("border_input_none");
      passwordLogin.classList.remove("border_color_red");
      passwordLogin.classList.add("border_color_green");
      viewError("passwordLogin", true);
    } else {
      campoLogin["password"] = false;
      loginErrorPass.classList.add("activeMsj");
      passwordLogin.classList.remove("border_input_none");
      passwordLogin.classList.remove("border_color_green");
      passwordLogin.classList.add("border_color_red");
      viewError("passwordLogin", false);
    }
  }
  habilitarBtnIniciar();
}
const viewError = async (campo, valor) => {
  try {
    if (valor) {
      setTimeout(() => {
        document.querySelector(`.grupo_${campo} input`).classList.remove("border_color_red","border_color_green");
        document.querySelector(`.grupo_${campo} input`).classList.add("border_input_none");
      }, 3000);
    } else {
      setTimeout(() => {
        document.querySelector(`.grupo_${campo} input`).classList.remove("border_color_green","border_color_red");
        document.querySelector(`.grupo_${campo} input`).classList.add("border_input_none");
      }, 3000);
    }
  } catch (error) {
    throw error;
  }
};
function habilitarBtnIniciar() {
  if (campoLogin.usuario && campoLogin.password) {
    buttonIniciar.disabled = false;
  } else {
    buttonIniciar.disable = true;
  }
}

function validarEntradas(e) {
  e.preventDefault();
  getUsuario();
}
const getUsuario = async () => {
  try {
    const response = await fetch(`${API_URL}/usuario`);
    const usuario = await response.json();
    const user = validarUsuario(usuario);
    if (user != undefined) {
      window.sessionStorage.setItem("userLogged", JSON.stringify({ nombre: user.nombre, usuario: user.usuario }));
    }
  } catch (error) {
    throw error;
  }
};

function validarUsuario(usuarios) {
  const currentUser = usuarios.find(
    (usuario) =>
      usuario.usuario == usuarioLogin.value &&
      usuario.password == passwordLogin.value
  );
  
  if (currentUser == undefined) {
    document.querySelector("#errorInputsLogin").classList.add("activeMsj");
    form_login.reset();
  }
  if (currentUser.rol == "admin") {
    document.querySelector("#errorInputsLogin").classList.remove("activeMsj");
    window.location.href = "./admin.html";
  } else {
    document.querySelector("#errorInputsLogin").classList.remove("activeMsj");
    window.location.href = "./index.html";
  }

  form_login.reset();
  return currentUser;
}
