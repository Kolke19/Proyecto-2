//def variables
const inputs = document.querySelectorAll(".form_register input");
const btnFormRegister=document.querySelector(".form_register button");
const nombre=document.querySelector(".grupo_nombre input");
const usuario=document.querySelector(".grupo_usuario input");
const correo=document.querySelector(".grupo_correo input");
const password=document.querySelector(".grupo_password input");
const password2=document.querySelector(".grupo_password2 input");
const API_URL = "http://localhost:4000";

const expressions = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{8,30}$/, // Letras y espacios, pueden llevar acentos.
  usuario: /^[a-zA-Z0-9\_\-]{8,30}$/, // Letras, numeros, guion y guion_bajo
  password: /^.{8,30}$/, // 8 a 30 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const campos = {
  nombre: false,
  usuario: false,
  password: false,
  correo: false,
};

const validarFormulario=(e)=>{
  switch (e.target.name){
    case "nombre":
      validarCampo(expressions.nombre,e.target,"nombre");
      break;
    case "usuario":
      validarCampo(expressions.usuario,e.target,"usuario");
      break;
    case "correo":
      validarCampo(expressions.correo,e.target,"correo");
      break;
    case "password":
      validarCampo(expressions.password, e.target, "password");
      validarPassword2();
      break;
    case "password2":
      validarPassword2();
  }
}

 const validarCampo=(expresion,input,campo)=>{
   if(expresion.test(input.value)){ 
    document.querySelector(`.grupo_${campo} p`).classList.remove("form_input_error_active");
    document.querySelector(`.grupo_${campo} input`).classList.remove("border_color_red");
    document.querySelector(`.grupo_${campo} input`).classList.add("border_color_green");
    campos[campo]=true;
  }else{
    document.querySelector(`.grupo_${campo} p`).classList.add("form_input_error_active");
    document.querySelector(`.grupo_${campo} input`).classList.remove("border_color_green");
    document.querySelector(`.grupo_${campo} input`).classList.add("border_color_red");
    campos[campo]=false;
    }
    if(campos[campo]==true){
    setTimeout(() => {
      document.querySelector(`.grupo_${campo} input`).classList.remove("border_color_red");
      document.querySelector(`.grupo_${campo} input`).classList.remove("border_color_green");
      document.querySelector(`.grupo_${campo} input`).classList.add("border_input_none");
    }, 3000);
    }else{
    setTimeout(()=>{
      document.querySelector(`.grupo_${campo} input`).classList.remove("border_color_green");
      document.querySelector(`.grupo_${campo} input`).classList.remove("border_color_red");
      document.querySelector(`.grupo_${campo} input`).classList.add("border_input_none");
    },3000);
    }
}

  const validarPassword2=()=>{
  if(password.value != password2.value){
  document.querySelector(`.grupo_password2 p`).classList.add("form_input_error_active");
  document.querySelector(`.grupo_password2 input`).classList.add("border_color_red");
  document.querySelector(`.grupo_password2 input`).classList.remove("border_color_green")
  campos["password"]=false;
  }else{
  document.querySelector(`.grupo_password2 p`).classList.remove("form_input_error_active");
  document.querySelector(`.grupo_password2 input`).classList.remove("border_color_red");
  document.querySelector(`.grupo_password2 input`).classList.add("border_color_green");
  campos["password"]=true;
  }
  if(campos["password"]==true){
    setTimeout(() => {
    document.querySelector(`.grupo_password2 input`).classList.remove("border_color_red");
    document.querySelector(`.grupo_password2 input`).classList.remove("border_color_green");
    document.querySelector(`.grupo_password2 input`).classList.add("border_input_none");
    }, 3000);
  }else{
    setTimeout(()=>{
    document.querySelector(`.grupo_password2 input`).classList.remove("border_color_green");
    document.querySelector(`.grupo_password2 input`).classList.remove("border_color_red");
    document.querySelector(`.grupo_password2 input`).classList.add("border_input_none");
    },3000);
  }
}

const habilitarBtnRegister =()=>{
    if(nombre.value && usuario.value && correo.value && password.value && password2.value){
      btnFormRegister.disabled=false;
    }else{
      btnFormRegister.disabled=true;
    }
}

events();
function events() {
  inputs.forEach((input) => {
    input.addEventListener("blur", validarFormulario); /**tambien lo use con keyup */
    input.addEventListener("keyup",habilitarBtnRegister);
  });
}
form_register.addEventListener("submit",sendData);

function sendData(e){
  e.preventDefault();
  if(campos.nombre && campos.usuario && campos.correo && campos.password){
    createUser();
    document.getElementById("msj_exito").classList.remove("paragraph");
    setTimeout(()=>{
      document.getElementById("msj_exito").classList.add("paragraph");
    },3000);
  }else{
     document.getElementById("msj_error").classList.remove("paragraph");
     setTimeout(()=>{
      document.getElementById("msj_error").classList.add("paragraph");
    },3000);
  }
}

const createUser=async()=>{
  try{
    await fetch(`${API_URL}/usuario`,{
      method:"POST",
      headers:{
        "Content-type":"application/json",
      },
      body:JSON.stringify({
        nombre:nombre.value,
        usuario: usuario.value,
        correo:correo.value,
        password: password.value,
        rol: "client",
      })
    })
    form_register.reset();
  }catch(error){
    throw error;
  }
}
