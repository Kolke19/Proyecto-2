import SuperUI from './SuperUI.js';
import AlbumServices from '../utils/AlbumServices.js';
import ValidationServices from '../utils/ValidationServices.js';
import Album from '../classes/Album.js';

const albumServices = new AlbumServices();
const validationServices = new ValidationServices();
const superUI = new SuperUI();

let albumDeleteId = 0;

class UIAlbum extends SuperUI {
    addListenersAlbum() {
        document.addEventListener('click', async function (e) {
            
            if (e.target.classList.contains('btnModalAlbumSave')) {
                const objAlbum = getDataFrmAlbum();

                !objAlbum.id ? await albumServices.createAlbum(objAlbum)
                    : await albumServices.updateAlbum(objAlbum);

            } else if (e.target.classList.contains('btnCreateAlbum')) {
                document.querySelector('#frmAlbum').reset();
                const btnSave = document.querySelector('#btnModalAlbumSave');
                superUI.setDisabledBtn(btnSave, true);

            } else if (e.target.classList.contains('btnEditAlbum')) {
                const objAlbum = await albumServices.getAlbumById(e.target.id);
                setDataFrmAlbum(await objAlbum);
                const btnSave = document.querySelector('#btnModalAlbumSave');
                superUI.setDisabledBtn(btnSave, false);

            } else if (e.target.classList.contains('btnDeleteAlbum')) {
                albumDeleteId = e.target.id;

            } else if (e.target.classList.contains('btnModalConfirmDelete')) {
                await albumServices.deleteAlbum(albumDeleteId);

            } else if (e.target.classList.contains('btnChangeDestacAlbum')) {
                const album = await albumServices.getAlbumById(e.target.id);
                await albumServices.changeDestacadoAlbum(album, !album.esDestacado);
            }
        });

        document.querySelector('#albumNombre').addEventListener('blur', function (e) {
            validateAlbumNombre(e);
        }, true);
        document.querySelector('#albumNombre').addEventListener('input', function (e) {
            validateAlbumNombre(e);
        }, true);

        document.querySelector('#albumArtista').addEventListener('blur', function (e) {
            validateAlbumArtista(e);
        }, true);
        document.querySelector('#albumArtista').addEventListener('input', function (e) {
            validateAlbumArtista(e);
        }, true);

        document.querySelector('#albumDescrip').addEventListener('blur', function (e) {
            validateAlbumDescrip(e);
        }, true);
        document.querySelector('#albumDescrip').addEventListener('input', function (e) {
            validateAlbumDescrip(e);
        }, true);

        document.querySelector('#albumImgUrl').addEventListener('blur', function (e) {
            validateAlbumImgUrl(e);
        }, true);
        document.querySelector('#albumImgUrl').addEventListener('input', function (e) {
            validateAlbumImgUrl(e);
        }, true);

        document.querySelector('#albumAudio').addEventListener('blur', function (e) {
            validateAlbumAudio(e);
        }, true);
        document.querySelector('#albumAudio').addEventListener('input', function (e) {
            validateAlbumAudio(e);
        }, true);

    }

    buildAlbumTable = async () => {
        const div = document.createElement('div');
        
        div.innerHTML = `
            <div class="d-flex justify-content-between px-2 pt-5">
                <h3>Listado de Albumes</h3>
                <button 
                    class="btnCreateAlbum btn" 
                    data-bs-toggle="modal" 
                    data-bs-target="#albumModalCrud" 
                    style="color: green"
                > <i class="fa-solid fa-circle-plus fa-3x"></i>
                </button>    
            </div>

            <table class="table table-dark table-hover " id="tableAlbumList">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Artista</th>
                        <th scope="col" id="thDescrip">Descripcion</th>
                        <th scope="col" id="thImgUrl">Portada</th>
                        <th scope="col" id="thAudio">Audio</th>
                        <th scope="col" id="thDestacado">Destacado</th>
                        <th scope="col" id="thCategoria">Categoria</th>
                        <th scope="col" class="text-center">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        `;
        return div;
    }

    buildAlbumTBody = async () => {
        const albumesDB = await albumServices.getAlbumes();
        const albumItems = [];

    albumesDB.forEach((album) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
                <td>${album.nombre}</td>
                <td>${album.artista}</td>
                <td id="tdDescrip">${album.descrip}</td>
                <td id="tdImgUrl">${album.imgUrl}</td>
                <td id="tdAudio">${album.audio}</td>
                <td id="tdDestacado">${album.esDestacado ? 'Si' : 'No'}</td>
                <td id="tdCategoria">${album.categoria}</td>
                <td class="text-center">
                    <button 
                        type="button" 
                        class="btnChangeDestacAlbum btn btn-primary"
                        id=${album.id} 
                    > <i class="fa-solid fa-star"></i>
                    </button>
                    <button 
                        type="button" 
                        class="btnEditAlbum btn btn-warning"
                        id=${album.id} 
                        data-bs-toggle="modal" 
                        data-bs-target="#albumModalCrud"
                    > <i class="fa-solid fa-pen"></i>
                    </button>
                    <button 
                        type="button" 
                        class="btnDeleteAlbum btn btn-danger"
                        id=${album.id} 
                        data-bs-toggle="modal" 
                        data-bs-target="#modalConfirmDelete"
                        > <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;

            albumItems.push(tr);
        });
        
        return albumItems;
    }

    buildAlbumModalCrud = async () => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="modal fade" id="albumModalCrud" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Nuevo Album</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="frmAlbum">
                                <div class="mb-3">
                                    <input type="text" class="form-control" id="albumId" style="display: none">
                                </div>

                                <div class="mb-3">
                                    <label for="albumNombre" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="albumNombre">
                                    <div class="form-text" style="display: none">Campo obligatorio</div>
                                </div>


                                <div class="mb-3">
                                    <label for="albumArtista" class="form-label">Artista</label>
                                    <input type="text" class="form-control" id="albumArtista">
                                    <div class="form-text" style="display: none">Campo obligatorio</div>
                                </div>
                                <div class="mb-3">
                                    <label for="albumDescrip" class="form-label">Descripcion</label>
                                    <input type="text" class="form-control" id="albumDescrip">
                                    <div class="form-text" style="display: none">Campo obligatorio</div>
                                </div>
                                <div class="mb-3">
                                    <label for="albumImgUrl" class="form-label">Portada</label>
                                    <input type="url" class="form-control" id="albumImgUrl">
                                    <div class="form-text" style="display: none">Campo obligatorio</div>
                                </div>
                                <div class="mb-3">
                                    <label for="albumAudio" class="form-label">Audio</label>
                                    <input type="text" class="form-control" id="albumAudio">
                                    <div class="form-text" style="display: none">Campo obligatorio</div>
                                </div>
                                <div class="mb-3">
                                    <label for="albumDestacado" class="form-label">Destacado</label>
                                    <select name="selectDestacada" class="form-select" id="albumDestacado">
                                        <option value='true'>Sí</option>
                                        <option value='false'>No</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="albumCategoria" class="form-label">Categoria</label>
                                    <select name="selectCategoria" class="form-select" id="albumCategoria">
                                        <option value='pop'>Pop</option>
                                        <option value='rock'>Rock</option>
                                        <option value='electronica'>Electrónica</option>
                                        <option value='latino'>Latino</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button 
                                type="button" 
                                class="btn btn-secondary" 
                                data-bs-dismiss="modal"
                            >Cancel
                            </button>
                            <button 
                                type="button" 
                                class="btnModalAlbumSave btn"
                                id="btnModalAlbumSave" 
                                disabled='true'
                            >Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return div;
    }

};

function getDataFrmAlbum() {
    const frmAlbum = document.querySelector('#frmAlbum');
    const albumId = frmAlbum.querySelector('#albumId').value;

    const objAlbum = new Album(
        !albumId ? 0 : albumId,
        frmAlbum.querySelector('#albumNombre').value,
        frmAlbum.querySelector('#albumArtista').value,
        frmAlbum.querySelector('#albumDescrip').value,
        frmAlbum.querySelector('#albumImgUrl').value,
        frmAlbum.querySelector('#albumAudio').value,
        frmAlbum.querySelector('#albumDestacado').value,
        frmAlbum.querySelector('#albumCategoria').value
    );
    return objAlbum;
}

function setDataFrmAlbum(objAlbum) {
    const frmAlbum = document.querySelector('#frmAlbum');

    frmAlbum.querySelector('#albumId').value = objAlbum.id;
    frmAlbum.querySelector('#albumNombre').value = objAlbum.nombre;
    frmAlbum.querySelector('#albumArtista').value = objAlbum.artista;
    frmAlbum.querySelector('#albumDescrip').value = objAlbum.descrip;
    frmAlbum.querySelector('#albumImgUrl').value = objAlbum.imgUrl;
    frmAlbum.querySelector('#albumAudio').value = objAlbum.audio;
    frmAlbum.querySelector('#albumDestacado').value = objAlbum.esDestacado;
    frmAlbum.querySelector('#albumCategoria').value = objAlbum.categoria;
}

function validarFrmAlbumCompleto() {
    const btnSave = document.querySelector('#btnModalAlbumSave');
    if (validationServices.validarString(frmAlbum.querySelector('#albumNombre'))
        && validationServices.validarString(frmAlbum.querySelector('#albumArtista'))
        && validationServices.validarString(frmAlbum.querySelector('#albumDescrip'))
        && validationServices.validarImgUrl(frmAlbum.querySelector('#albumImgUrl'))
        && validationServices.validarString(frmAlbum.querySelector('#albumAudio'))
        && validationServices.validarSelectBoolean(frmAlbum.querySelector('#albumDestacado'))
        && validationServices.validarNoEmpty(frmAlbum.querySelector('#albumCategoria'))) {
        superUI.setDisabledBtn(btnSave, false);
        return true;
    } else {
        superUI.setDisabledBtn(btnSave, true);
        return false;
    }
}

function validateAlbumNombre(e) {
    const btnSave = document.querySelector('#btnModalAlbumSave');
    const errorElem = e.target.parentElement.querySelector('.form-text');
    if (validationServices.validarString(e.target)) {
        superUI.setDisplayElement(errorElem, false);
        superUI.setStyleInputValidat(e.target, true);
        validarFrmAlbumCompleto();
    } else {
        superUI.setDisplayElement(errorElem, true);
        superUI.setStyleInputValidat(e.target, false);
        superUI.setDisabledBtn(btnSave, true);
    }
}

function validateAlbumArtista(e) {
    const btnSave = document.querySelector('#btnModalAlbumSave');
    const errorElem = e.target.parentElement.querySelector('.form-text');
    if (validationServices.validarString(e.target)) {
        superUI.setDisplayElement(errorElem, false);
        superUI.setStyleInputValidat(e.target, true);
        validarFrmAlbumCompleto();
    } else {
        superUI.setDisplayElement(errorElem, true);
        superUI.setStyleInputValidat(e.target, false);
        superUI.setDisabledBtn(btnSave, true);
    }
}

function validateAlbumDescrip(e) {
    const btnSave = document.querySelector('#btnModalAlbumSave');
    const errorElem = e.target.parentElement.querySelector('.form-text');
    if (validationServices.validarString(e.target)) {
        superUI.setDisplayElement(errorElem, false);
        superUI.setStyleInputValidat(e.target, true);
        validarFrmAlbumCompleto();
    } else {
        superUI.setDisplayElement(errorElem, true);
        superUI.setStyleInputValidat(e.target, false);
        superUI.setDisabledBtn(btnSave, true);
    }
}

function validateAlbumImgUrl(e) {
    const btnSave = document.querySelector('#btnModalAlbumSave');
    const errorElem = e.target.parentElement.querySelector('.form-text');
    if (validationServices.validarImgUrl(e.target)) {
        superUI.setDisplayElement(errorElem, false);
        superUI.setStyleInputValidat(e.target, true);
        validarFrmAlbumCompleto();
    } else {
        superUI.setDisplayElement(errorElem, true);
        superUI.setStyleInputValidat(e.target, false);
        superUI.setDisabledBtn(btnSave, true);
    }
}

function validateAlbumAudio(e) {
    const btnSave = document.querySelector('#btnModalAlbumSave');
    const errorElem = e.target.parentElement.querySelector('.form-text');
    if (validationServices.validarString(e.target)) {
        superUI.setDisplayElement(errorElem, false);
        superUI.setStyleInputValidat(e.target, true);
        validarFrmAlbumCompleto();
    } else {
        superUI.setDisplayElement(errorElem, true);
        superUI.setStyleInputValidat(e.target, false);
        superUI.setDisabledBtn(btnSave, true);
    }
}

export default UIAlbum;
