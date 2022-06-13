const cont_login_register = document.querySelector(".container_login_register");
const form_login = document.querySelector(".form_login");
const form_register = document.querySelector(".form_register");
const back_box_login = document.querySelector(".back_box_login");
const back_box_register = document.querySelector(".back_box_register");
const btn_register = document.getElementById("btn_register");
const btn_login = document.getElementById("btn_login");
eventsAndFunctions();
function eventsAndFunctions() {
  widthPage();
  btn_register.addEventListener("click", register);
  btn_login.addEventListener("click", login);
  window.addEventListener("resize", widthPage);
}

function register() {
  if (window.innerWidth > 850) {
    form_register.style.display = "block";
    cont_login_register.style.left = "410px";
    form_login.style.display = "none";
    back_box_register.style.opacity = "0";
    back_box_login.style.opacity = "1";
  } else {
    form_register.style.display = "block";
    cont_login_register.style.left = "0px";
    form_login.style.display = "none";
    back_box_register.style.display = "none";
    back_box_login.style.display = "block";
    back_box_login.style.opacity = "1";
  }
}

function login() {
  if (window.innerWidth > 850) {
    form_register.style.display = "none";
    cont_login_register.style.left = "10px";
    form_login.style.display = "block";
    back_box_register.style.opacity = "1";
    back_box_login.style.opacity = "0";
  } else {
    form_register.style.display = "none";
    cont_login_register.style.left = "0px";
    form_login.style.display = "block";
    back_box_register.style.display = "block";
    back_box_login.style.display = "none";
  }
}
function widthPage() {
  if (window.innerWidth > 850) {
    back_box_login.style.display = "block";
    back_box_register.style.display = "block";
  } else {
    back_box_register.style.display = "block";
    back_box_register.style.opacity = "1";
    back_box_login.style.display = "none";
    form_login.style.display = "block";
    form_register.style.display = "none";
    cont_login_register.style.left = "0px";
  }
}