import Member from "../classes/Member.js";

const allMembersContainer = document.querySelector("#main-container");

function addListeners() {
  document.addEventListener("DOMContentLoaded", async (e) => {});
}

let integrantes = [];

function addNewMember(name, picture, favouriteAlbum, contact) {
  const newMember = new Member(name, picture, favouriteAlbum, contact);
  integrantes.push(newMember);
}

addNewMember(
  "Braian Jassan",
  "/docs/img/integrante1.jpg",
  "Dream Theater : Falling into Infinity",
  "braianjassan@gmail.com"
);
addNewMember(
  "Emanuel Rojas ",
  "/docs/img/integrante4.jpg",
  "Pink Floyd: The wall",
  "@emanuelrojasguindan"
);
addNewMember(
  "Alexis Vale",
  "/docs/img/integrante5.jpg",
  "The Beatles: Let it be",
  "@fernandoalexisvale"
);
addNewMember(
  "Jorge Gonzalez",
  "/docs/img/integrante6.jpg",
  "AC DC : Back in black",
  "@jorgegonzalez742"
);
addNewMember(
  "Lucas Suarez",
  "/docs/img/integrante7.jpg",
  "Radiohead: Pablo honey",
  "@lucassuarez25"
);
addNewMember(
  "Elisa Socolsky",
  "/docs/img/integrante2.jpg",
  "The Clash: London Calling",
  "esocolsky@gmail.com"
);

function createMemberDiv() {
  integrantes.forEach((integrante) => {
    const divMember = document.createElement("div");
    divMember.classList.add("member-container", "col-lg-2", "col-md-3");
    divMember.innerHTML = `
        <div class="container-foto">
          <img class="img-fluid rounded-circle " src=${integrante.picture} alt="fotoPerfil">
        </div>
        <div class="nombre">
          <h3> ${integrante.name}</h3>
          <a href = "detail.html#1"><h4>Album Preferido: ${integrante.favouriteAlbum}</h4></a>
        </div>
        <div class="redes-container">
          <a class="icono" href="https://www.facebook.com/" target="blank" role="button"><img
          src="/docs/facebook.png"></a>
          <a class="icono" href="https://www.instagram.com/" target="blank" role="button"><img
              src="/docs/instagram.png"></a>
          <a class="icono" href="https://www.twitter.com/" target="blank" role="button"><img
              src="/docs/twitter.png"></a>
        </div>
      `;
    allMembersContainer.append(divMember);
  });
}
createMemberDiv();
