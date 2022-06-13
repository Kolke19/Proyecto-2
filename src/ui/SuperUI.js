class SuperUI {
    setDisplayElement(element, show) {
        show ? element.style = '' : element.style = 'display: none';
    }

    setStyleInputValidat(element, state) {
        if (state) {
            element.classList.remove('input-incorrecto');
            element.classList.add('input-correcto');
            element.classList.add('fa-check-circle');
            element.classList.remove('fa-times-circle');
        } else {
            element.classList.add('input-incorrecto');
            element.classList.remove('input-correcto');
            element.classList.remove('fa-check-circle');
            element.classList.add('fa-times-circle');
        }
    }

    setDisabledBtn = (btn, state) => btn.disabled = state;

    buildModalConfirm = async (modalConfirmId, title, msj, btnConfirmName) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="modal fade" id="${modalConfirmId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${msj}
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
                                class="${btnConfirmName} btn btn-danger"
                                id="${btnConfirmName}" 
                            >Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return div;
    }
}

export default SuperUI;