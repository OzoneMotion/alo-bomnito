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

// Función para obtener los datos del archivo JSON
async function getData() {
    try {
        //const response = await fetch("http://localhost:3000/users");
        const response = await fetch("https://alobomnito.onrender.com/api/v1/Clientes");
        const users = await response.json();
        return users;
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
};

async function getAdmin() {
    try {
        // const response = await fetch("http://localhost:3000/users");
        const response = await fetch("https://alobomnito.onrender.com/api/v1/Admins");
        const admins = await response.json();
        return admins;
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
};


function login() {
    const usuarioActual = document.getElementById('emailId').value;
    const passwordActual = document.getElementById('password').value;
    const usuariosLocales = JSON.parse(localStorage.getItem('usuarios'));

        // si no hay usuarios en localStorage trata de obtenerlos de la api
        self.getData().then((users) => {
            console.log('usuarios', users);
            const misUsuarios = users;
            let usuarioEncontrado;
             
            usuarioEncontrado = misUsuarios.find((usuario) => (usuario.correo === usuarioActual && usuario.contrasenia === passwordActual));
            
            if (usuarioEncontrado) {
                localStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));
                window.location.href = "index.html"
            } else {
                self.getAdmin().then((admin) => {
                    let adminEncontrado;
                    const misAdmins = admin;
                    adminEncontrado = misAdmins.find((admin) => (admin.correo === usuarioActual && admin.contrasenia === passwordActual));
                    
                    if (adminEncontrado) {
                        localStorage.setItem('usuarioActivo', JSON.stringify(adminEncontrado));
                        window.location.href = "administrar_productos.html"
                    } else {
                        console.log(adminEncontrado)
                        alert("Credenciales invalidas, intente de nuevo.")
                    }
                })
            }
        }, (err) => {
            console.log('algo salio mal', err)
        })
    }


