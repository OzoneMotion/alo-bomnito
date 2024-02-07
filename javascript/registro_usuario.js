const formValidation = document.getElementById('form-validation');
const inputs = document.querySelectorAll('#form-validation input');
const textAreas = document.querySelectorAll('#form-validation textarea');
const btnSubmit = document.getElementById('btn-submit');
const elements = [...inputs, ...textAreas];

const regex = {
    nameId: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos
    emailId: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    passwordId: /^(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,14}$"/, // 8 a 14 numeros y con caracteres especiales.
    password2Id: /^(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,14}$"/,
}

const names = {
    nameId: false,
    emailId: false,
    passwordId: false,
    password2Id: false
}

const formNamesValidation = (e) => {
    const validations = {
        "nameId": regex.nameId,
        "emailId": regex.emailId,
        "passwordId": regex.passwordId,
        "password2Id": regex.password2Id
    };

    if (validations[e.target.name]) {
        inputValidation(validations[e.target.name], e.target, e.target.name);
    }
}

elements.forEach((element) => {
    element.addEventListener('keyup', formNamesValidation);
    element.addEventListener('blur', formNamesValidation);
});


const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');

   if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
       document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
       campos['password'] = false;
    } else {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
       document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
       campos['password'] = true;
    }
}


const inputValidation = (regex, input, name) => {
    const idElement = document.getElementById(`id-${name}`);
    const iconElement = document.querySelector(`#id-${name} i`);
    const feedbackEmptyElement = document.querySelector(`#id-${name} .invalid-feedback#${name}-empty`);
    const feedbackRegexElement = document.querySelector(`#id-${name} .invalid-feedback#${name}-regex`);

    if (input.value.trim() === "") {
        feedbackEmptyElement.classList.add('invalid-feedback-active');
        feedbackRegexElement.classList.remove('invalid-feedback-active');
        names[name] = false;
    } else if (!regex.test(input.value)) {
        feedbackEmptyElement.classList.remove('invalid-feedback-active');
        feedbackRegexElement.classList.add('invalid-feedback-active');
        names[name] = false;
    } else {
        feedbackEmptyElement.classList.remove('invalid-feedback-active');
        feedbackRegexElement.classList.remove('invalid-feedback-active');
        names[name] = true;
    }

    idElement.classList.toggle('input-text-container-incorrect', !names[name]);
    idElement.classList.toggle('input-text-container-correct', names[name]);
    iconElement.classList.toggle('fa-times-circle', !names[name]);
    iconElement.classList.toggle('fa-check-circle', names[name]);

    btnSubmit.disabled = !Object.values(names).every(state => state);
}


formValidation.addEventListener('submit', (e) => {
    e.preventDefault();

    if (Object.values(names).every(state => state)) {
        emailjs.init('2c-VMt_t8jQv-N8E-');
        sendMail();
        formValidation.reset();

        const successMessage = document.getElementById('form-submitted-success');
        successMessage.classList.add('form-submitted-success-active');
        setTimeout(() => successMessage.classList.remove('form-submitted-success-active'), 5000);

        document.querySelectorAll('.input-text-container-correct').forEach((icon) => icon.classList.remove('input-text-container-correct'));
    }
});



/*


(() => {
    'use strict';

    // Obtiene todos los formularios a los que queremos aplicar estilos de validación Bootstrap
    const forms = document.querySelectorAll('.needs-validation')

    // Bucle sobre ellos y evitar la presentación
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add('was-validated');
        }, false);
    });
})();

    document.getElementById('phoneId').addEventListener('input', function () {
        const numero = this.value;

        if (numero.length > 10) {
            this.value = numero.slice(0, 10); // Recorta el valor a 10 caracteres
        }
    });

    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input');
    
    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        // password: /^.{4,12}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,10}$/, // 7 a 14 numeros.
        caja: /^[a-zA-ZÀ-ÿ\s]{1,1000}$/, // Letras, numeros, guion y guion_bajo
    }
    
    const campos = {
        caja: false,
        nombre: false,
        //password: false,
        correo: false,
        telefono: false
    }
    
    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "caja":
                validarCampo(expresiones.caja, e.target, 'caja');
                break;
            case "nombre":
                validarCampo(expresiones.nombre, e.target, 'nombre');
                break;
            case "password":
                validarCampo(expresiones.password, e.target, 'password');
                validarPassword2();
                break;
            case "password2":
                validarPassword2();
                break;
            case "correo":
                validarCampo(expresiones.correo, e.target, 'correo');
                break;
        }
    }
    
    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
            campos[campo] = true;
        } else {
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
            campos[campo] = false;
        }
    }
    
    
    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });
    
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const terminos = document.getElementById('terminos');
        if (campos.caja && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
            formulario.reset();
    
            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            }, 5000);
    
            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });
        } else {
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        }
    });




 const validarPassword2 = () => {
     const inputPassword1 = document.getElementById('password');
     const inputPassword2 = document.getElementById('password2');

    if (inputPassword1.value !== inputPassword2.value) {
         document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
         document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
         document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
         document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['password'] = false;
     } else {
         document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
         document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
         document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
         document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['password'] = true;
     }
 }
*/