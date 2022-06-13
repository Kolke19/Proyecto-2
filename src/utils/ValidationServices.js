class ValidationServices {

    validarNoEmpty = input => input.value ? true : false;

    validarString = (input, longMin) => {
        !longMin ? longMin = 1 : true;
        return input.value.length >= longMin ? true : false;        
    }

    validarImgUrl = input => {
        const regEx = /\.(jpg|png|gif)$/i;
        return regEx.test(input.value) ? true : false;
    }

    validarSelectBoolean = input => (input.value === 'true' || input.value === 'false') ? true : false;

    validarEmail = input => {
        const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;
        return regEx.test(input.value) ? true : false;
    }

}

export default ValidationServices;