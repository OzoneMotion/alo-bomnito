const formInicio = document.getElementById('validacion-inicio');
const inputs = document.querySelectorAll('.validacion-inicio input');
const mensajeError = document.getElementById('mensajeErrorIni');
const inputEmail = document.getElementById('emailId');
const inputPassword = document.getElementById('password');
const btnSubmit = document.getElementById('btn-crear-submit');
const elements = [...inputs];

let regex = {
    emailId: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,14}$/, // 8 a 14 numeros y con caracteres especiales.
}

let names = {
    emailId: false,
    password: false
}

const formulario = document.querySelector(".validacion-inicio");

const getDataForm = () => {

    const datos = new FormData(formulario);
    const datosProcesados = Object.fromEntries(datos.entries())

    formulario.reset();
   
    return datosProcesados;
}

// Función para validar la confirmación de la contraseña


const formNamesValidation = (e) => {
    const validations = {
        "emailId": regex.emailId,
        "password": regex.password,
    };

    const input = e.target;
    const name = input.name;

    if (validations[name]) {
        inputValidation(validations[name], input, name);
        /*if (name === 'password' || name === 'password2') { // Si el campo es passwordId, validamos también password2
            validarPasswords();
        }*/
    }
}

formInicio.addEventListener('submit', async (e) => {
    e.preventDefault();

    let validations = {
        "emailId": regex.emailId,
        "password": regex.password
    };
    const input = e.target;
    const name = input.name;

    if (validations[name]) {
        inputValidation(validations[name], input, name);
        if (name === 'password') {
            validarPasswords();
        }
    }
})

elements.forEach((element) => {
    element.addEventListener('keyup', formNamesValidation);
    element.addEventListener('blur', formNamesValidation);
});


const inputValidation = (regex, input, name) => {
    const idElement = document.getElementById(`id-${name}`);
    const iconElement = document.querySelector(`#id-${name} i`);

    const feedbacEmptyElement = document.querySelector(`#id-${name} .invalid-feedbac#${name}-empty`);
    const feedbacRegexElement = document.querySelector(`#id-${name} .invalid-feedbac#${name}-regex`);
    // console.log(feedbacEmptyElement);

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
//const email = document.querySelector('#emailId').value;
//const password = document.querySelector('#password').value;

//const Usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];


let validarUsuario = Usuarios.find(usuario => usuario.emailId === email && usuario.password === password);

if (!validarUsuario) {
    mensajeError.style.display = 'block';
    // return;
} else {
    localStorage.setItem('inicio_exitoso', JSON.stringify(validarUsuario));
    window.location.href = 'index.html';
}
inputEmail.addEventListener('input', () => {
    mensajeError.style.display = 'none'; // Ocultar el mensaje de error cuando se modifica el campo de correo electrónico
});

inputPassword.addEventListener('input', () => {
    mensajeError.style.display = 'none'; // Ocultar el mensaje de error cuando se modifica el campo de contraseña
});

// Función para obtener los datos del archivo JSON
async function getData () {
    try {
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json();
        return users;
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
};

function login() {
    const usuarioActual = document.getElementById('emailId').value;
    const passwordActual = document.getElementById('password').value;
    self.getData().then( (users) => {
        console.log('usuarios', users);
        const misUsuarios = users;
        let usuarioEncontrado = misUsuarios.find( (usuario) => (usuario.correo === usuarioActual && usuario.contrasenia === passwordActual));
        if (usuarioEncontrado) {
            localStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));
            window.location.href = "productos.html"
        } else {
            window.alert('credenciales invalidad, intenta de nuevo');
        }
    }, (err) => {
        console.log('algo salio mal', err)
    })
    console.log('mis usuarios', misUsuarios);
}
