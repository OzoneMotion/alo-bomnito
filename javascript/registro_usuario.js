const validationRegistro = document.getElementById('validation-registro');
const inputs = document.querySelectorAll('#validation-registro input');
const btnSubmit = document.getElementById('btn-crear-submit');  //btn-crear-submit
const elements = [...inputs];

const regex = {
    nameId: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos
    emailId: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,14}$/, // 8 a 14 numeros y con caracteres especiales.
}

const names = {
    nameId: false,
    emailId: false,
    password: false,
    password2: false
}

const formNamesValidation = (e) => {
    const validations = {
        "nameId": regex.nameId,
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

//Almacenamiento de los datos introducidos en el formulario en la base de datos

const formRegistro = document.querySelector('#validation-registro');

formRegistro.addEventListener('submit', async (e) => {
    e.preventDefault()

    self.getClientes().then(async (correosclientes) => {
        const datosProcesados = await obtenerJsonDatos(e.target);
        let buscarCorreo;

        buscarCorreo = correosclientes.find((cliente) => cliente === datosProcesados.correo);
        if (buscarCorreo) {
            window.location.href = "error_correo.html"
        } else {
            console.log(buscarCorreo)
            self.getAdmin().then(async (correosAdmin) => {
                let buscarCorreo;
                buscarCorreo = correosAdmin.find((admin) => admin === datosProcesados.correo);

                if (buscarCorreo) {
                    window.location.href = "error_correo.html"
                } else {
                    postData(datosProcesados);
                    window.location.href = "aviso_creado_cuenta.html"
                }
        
            })
        }

    })

})

const obtenerJsonDatos = async (e) => {

    const datos = new FormData(e);
    const datosProcesados = Object.fromEntries(datos.entries())
    datosProcesados['nombre'] = datosProcesados.nameId
    datosProcesados['correo'] = datosProcesados.emailId
    datosProcesados['contrasenia'] = datosProcesados.password
    datosProcesados['id_cliente'] = await obtenerId() + 1;

    console.log(datosProcesados)

    formRegistro.reset();
    return datosProcesados;

}

async function getClientes() {
    try {
        const response = await fetch("http://3.133.128.90/api/v1/Clientes");
        const users = await response.json();
        const correoUsers = users.map(cliente => cliente.correo);
        return correoUsers;
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
};

async function getAdmin() {
    try {
        const response = await fetch("http://3.133.128.90/api/v1/Admins");
        const admins = await response.json();
        const correoAdmins = admins.map(admin => admin.correo);
        return correoAdmins;
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
};


const obtenerId = async () => {
    try {
        const respuesta = await fetch ('http://3.133.128.90/api/v1/Clientes');
        if (respuesta.ok) {
            const datos = await respuesta.json();
            const idClientes = datos.map(cliente => cliente.id_cliente);

            return Math.max(...idClientes);
        } else {
            console.error(respuesta.status);
        }
    } catch (error) {
        console.error(error);
    }
}

const postData = async (newUser) => {
    try {
        //  const response = await fetch("http://localhost:3000/users", {
         const response = await fetch("http://3.133.128.90/api/v1/Clientes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        })
        if (response.ok) {
            const jsonResponse = await response.json()
            console.log(`Usuario registrado exitosamente ${jsonResponse}`)
            return response;

        }
    }
    catch (error) { console.log(error) }
}
