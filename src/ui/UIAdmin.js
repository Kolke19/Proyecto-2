import UIAlbum from './UIAlbum.js';
import UserServices from '../utils/UserServices.js';
import Header from "../components/Header.js";
import OffCanvas from "../components/off-canvas.js";
import Footer from "../components/Footer.js";

const header = document.body.getElementsByTagName("header")[0];
const main = document.body.getElementsByTagName("main")[0];
const footer = document.body.getElementsByTagName("footer")[0];

const uiAlbum = new UIAlbum();
const userServices = new UserServices();
const headerService = new Header();
const footerService = new Footer();
const offCanvasService = new OffCanvas();

addListenersAdmin();

function addListenersAdmin() {
    document.addEventListener("DOMContentLoaded", async function (e) {

        await userServices.validateUserLoggedRolAdmin() ? true :
            window.location.href = "index.html";

        header.append(await headerService.buildHeader());
        footer.append(await footerService.buildFooter());
        main.append(await offCanvasService.buildOffCanvas());

        main.append(await uiAlbum.buildAlbumTable());
        const tbody = main.getElementsByTagName("tbody")[0];
        tbody.append(...await uiAlbum.buildAlbumTBody());

        main.append(await uiAlbum.buildAlbumModalCrud());
        main.append(
            await uiAlbum.buildModalConfirm('modalConfirmDelete', 'Advertencia',
                'Seguro desea borrar el Album?', 'btnModalConfirmDelete'));

        uiAlbum.addListenersAlbum();

    });

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains('btnLogout')) {
          window.sessionStorage.removeItem("userLogged");
          window.location.href = "../../index.html";
        }
      });
}