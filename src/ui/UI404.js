class ErrorPage {
  buildErrorPage = async () => {
    const div = document.createElement("div");
    div.innerHTML = ` 
          <div id="container">
        <div class="content">
          <!-- <h2>404</h2>
          <h4>Oops! Pagina no encontrada!</h4>
          <p>La pagina que estas buscando no existe!</p> -->
          <a href="./index.html">Volver al inicio</a>
        </div>
    `;
    return div;
  };
}

const errorPage = new ErrorPage();

const main = document.body.getElementsByTagName("main")[0];

document.addEventListener("DOMContentLoaded", async function (e){
  
  main.append(await errorPage.buildErrorPage());
})

export default ErrorPage;
