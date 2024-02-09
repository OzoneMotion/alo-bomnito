const validationRegistro = document.getElementById('validation-registro');
const inputs = document.querySelectorAll('#validation-registro input');
const btnSubmit = document.getElementById('btn-crear-submit');  //btn-crear-submit
const elements = [...inputs];

const regex = {
    admnId: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos
    emailId: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,14}$/, // 8 a 14 numeros y con caracteres especiales.
}

const names = {
    admnId: false,
    emailId: false,
    password: false,
    password2: false
}

const formNamesValidation = (e) => {
    const validations = {
        "admnId": regex.admnId,
        "emailId": regex.emailId,
        "password": regex.password,
        "password2": regex.password // para utilizar la misma expresion de passwordId
    };

    const input = e.target;
    const name = input.name;

    if (validations[name]) {
        inputValidation(validations[name], input, name);
        if (name === 'password' || name === 'password2') { // Si el campo es passwordId, validamos también password2
            validarPasswords();
        }
    }
}

elements.forEach((element) => {
    element.addEventListener('keyup', formNamesValidation);
    element.addEventListener('blur', formNamesValidation);
});


//Validar imputs
const inputValidation = (regex, input, name) => {
    const idElement = document.getElementById(`id-${name}`);
    const iconElement = document.querySelector(`#id-${name} i`);
    // class="invalid-feedbac invalid-feedbac-active"
    const feedbacEmptyElement = document.querySelector(`#id-${name} .invalid-feedbac#${name}-empty`);
    const feedbacRegexElement = document.querySelector(`#id-${name} .invalid-feedbac#${name}-regex`);
    console.log(feedbacEmptyElement);

    if (input.value.trim() === "") {
        feedbacEmptyElement.classList.add('invalid-feedbac-active');
        feedbacRegexElement.classList.remove('invalid-feedbac-active');
        names[name] = false;
    } else if (!regex.test(input.value)) {
        feedbacEmptyElement.classList.remove('invalid-feedbac-active');
        feedbacRegexElement.classList.add('invalid-feedbac-active');
        names[name] = false;
    } else {
        feedbacEmptyElement.classList.remove('invalid-feedbac-active');
        feedbacRegexElement.classList.remove('invalid-feedbac-active');
        names[name] = true;
    }

    idElement.classList.toggle('input-text-container-incorrect', !names[name]);
    idElement.classList.toggle('input-text-container-correct', names[name]);
    iconElement.classList.toggle('fa-times-circle', !names[name]);
    iconElement.classList.toggle('fa-check-circle', names[name]);

    btnSubmit.disabled = !Object.values(names).every(state => state);
}

// Función para validar la confirmación de la contraseña

const validarPasswords = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');
    const containerPassword2 = document.getElementById('id-password2');
    const iconElement = containerPassword2.querySelector('i');
    const emptyfeedbacElement = containerPassword2.querySelector('#password2-empty');
    const regexfeedbacElement = containerPassword2.querySelector('#password2-regex');

    if (inputPassword2.value.trim() === "") {
        emptyfeedbacElement.classList.add('invalid-feedbac-active');
        regexfeedbacElement.classList.remove('invalid-feedbac-active');
        iconElement.classList.remove('fa-check-circle');
        iconElement.classList.add('fa-times-circle');
        containerPassword2.classList.add('input-text-container-incorrect');
        containerPassword2.classList.remove('input-text-container-correct');
        names['password2'] = false;
    }
    else if (inputPassword1.value !== inputPassword2.value) {
        emptyfeedbacElement.classList.remove('invalid-feedbac-active');
        regexfeedbacElement.classList.add('invalid-feedbac-active');
        iconElement.classList.remove('fa-check-circle');
        iconElement.classList.add('fa-times-circle');
        containerPassword2.classList.add('input-text-container-incorrect');
        containerPassword2.classList.remove('input-text-container-correct');
        names['password2'] = false;
    } else {
        emptyfeedbacElement.textContent = ""; // Limpiar el mensaje de error
        emptyfeedbacElement.classList.remove('invalid-feedbac-active');
        regexfeedbacElement.classList.remove('invalid-feedbac-active');
        iconElement.classList.add('fa-check-circle');
        iconElement.classList.remove('fa-times-circle');
        containerPassword2.classList.remove('input-text-container-incorrect');
        containerPassword2.classList.add('input-text-container-correct');
    }

    btnSubmit.disabled = !Object.values(names).every(state => state);
}


/*

// Visibilidad de las contraseñas
const togglePasswordVisibility = (inputId, iconId) => {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    icon.addEventListener('click', () => {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        icon.classList.toggle('fa-eye-slash');
        icon.classList.toggle('fa-eye');
    });
};

togglePasswordVisibility('password', 'togglePassword1');
togglePasswordVisibility('password2', 'togglePassword2');
*/

//Almacenamiento de los datos introducidos en el formulario en la base de datos

const formulario = document.querySelector(".validation-registro");

const getData = () => {

    const datos = new FormData(formulario);
    const datosProcesados = Object.fromEntries(datos.entries())

    formulario.reset();
    return datosProcesados;
}

const postData = async () => {
    const newUser = getData();

    try {
        const response = await fetch("http://localhost:3000/admins", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            const { username, password } = jsonResponse;
        }
    }
    catch (error) { console.log(error) }
}

formulario.addEventListener("submit", event => {
    event.preventDefault();
    postData();
})