// Seleccion de imagenes y visualizacion
const file = document.getElementById('imagesInput');

file.addEventListener('change', e => {
    // console.log(e);
    const reader = new FileReader();

    reader.onload = function (e) {
        inyectarImage(e);
    }
    reader.readAsDataURL(e.target.files[0])

    // console.log(e.target.files)

})

function inyectarImage(e) {
    // primero se crean los elementos html dinamicos
    const carruselWrapper = document.getElementById('carruselWrapper');
    const nuevoDiv = document.createElement('div');
    const nuevaImagen = document.createElement('img');
    // carruselWrapper.removeChild(eliminar);

    // se agregan los atributos que tenias en el html
    nuevaImagen.className = "d-block w-100";
    nuevaImagen.className = "containerImg";
    nuevoDiv.className = "carousel-item active";
    nuevaImagen.src = e.target.result;

    // por ultimo se inyectan
    nuevoDiv.appendChild(nuevaImagen);
    carruselWrapper.appendChild(nuevoDiv);
}


//Validacion de inputs
const formValidation = document.getElementById('validation');
const inputs = document.querySelectorAll('#validation input');
const textAreas = document.querySelectorAll('#validation textarea');
const btnSubmit = document.getElementById('btn_enviar');
const elements = [...inputs, ...textAreas];
const eliminar = document.getElementById("cancelar");

const regex = {
    descripcionProducto: /^(?!\s*$)[\s\S]{1,300}$/,
    indicacionesUsoProducto: /^(?!\s*$)[\s\S]{1,300}$/,
    contenidoProducto: /^[0-9]+ ml|[0-9]+ g$/,
    precioProducto: /^([0-9]{1,3})+|[0-9]+(\,[0-9]{1,3})+$/,
    cantidadProducto: /^(0*[1-9][0-9]*|0+\.[0-9]*[1-9][0-9]*)$/,
    nombreProducto: /^(?!\s*$)[\s\S]{1,20}$/,
    marcaProducto: /^(?!\s*$)[\s\S]{1,20}$/
}

const names = {
    cantidadProducto: false,
    nombreProducto: false,
    marcaProducto: false,
    precioProducto: false,
    contenidoProducto: false,
    descripcionProducto: false,
    indicacionesUsoProducto: false,
}

const formNamesValidation = (e) => {
    const validations = {
        "descripcionProducto": regex.descripcionProducto,
        "indicacionesUsoProducto": regex.indicacionesUsoProducto,
        "contenidoProducto": regex.contenidoProducto,
        "precioProducto": regex.precioProducto,
        "cantidadProducto": regex.cantidadProducto,
        "nombreProducto": regex.nombreProducto,
        "marcaProducto": regex.marcaProducto
    };

    if (validations[e.target.name]) {
        inputValidation(validations[e.target.name], e.target, e.target.name);
    }
}

elements.forEach((element) => {
    element.addEventListener('keyup', formNamesValidation);
    element.addEventListener('blur', formNamesValidation);
});

const inputValidation = (regex, input, name) => {
    const idElement = document.getElementById(`id-${name}`);
    const iconElement = document.querySelector(`#id-${name} span`);
    const feedbackEmptyElement = document.querySelector(`#id-${name} .invalid-feedback#${name}-empty`);
    const feedbackRegexElement = document.querySelector(`#id-${name} .invalid-feedback#${name}-regex`);
    const feddbackValidate = document.querySelector(`#id-${name} .containerInput`)

    if (input.value.trim() === "") {
        names[name] = false;
        // console.log(names[name])
        feedbackEmptyElement.classList.add('invalid-feedback-active');
        feedbackRegexElement.classList.remove('invalid-feedback-active');
        feddbackValidate.classList.remove('valid-feedback-active');
        feddbackValidate.classList.add('invalid-feeback-active-input');
    } else if (!regex.test(input.value)) {
        names[name] = false;
        feedbackEmptyElement.classList.remove('invalid-feedback-active');
        feedbackRegexElement.classList.add('invalid-feedback-active');
        feddbackValidate.classList.remove('valid-feedback-active');
        feddbackValidate.classList.add('invalid-feeback-active-input');
    } else {
        names[name] = true;
        feedbackEmptyElement.classList.remove('invalid-feedback-active');
        feedbackRegexElement.classList.remove('invalid-feedback-active');
        feddbackValidate.classList.remove('invalid-feeback-active-input');
        feddbackValidate.classList.add('valid-feedback-active');
    }

    idElement.classList.toggle('input-text-container-incorrect', !names[name]);
    idElement.classList.toggle('input-text-container-correct', names[name]);
    iconElement.classList.toggle('fa-times-circle', !names[name]);
    iconElement.classList.toggle('fa-check-circle', names[name]);

}

formValidation.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(Object.values(names).every(state => state));
    const imageInput = document.getElementById('imagesInput');
    const files = imageInput.files;

    // if (files.length > 0) {
    //     try {
    //         // const formData = new FormData();
    //         for (const file of files) {
    //             const fileName = file.name;
    //             const base64Content = await readFileAsBase64(file);
    //             const response = await uploadImageToGitHub(base64Content, fileName);
    //             const data = await response.json();
    //             const url = data.content.download_url;
    //             console.log(url);
    //         }

    //         alert('Imágenes subidas exitosamente a GitHub.');
    //     } catch (error) {
    //         console.error('Error al subir la imagen:', error);
    //     }
    // } else {
    //     alert('Selecciona una imagen antes de enviarla.');
    // }

    // console.log(e.target);


    const datosProcesados = obtenerJsonDatos(e.target);
    console.log(datosProcesados);
});


// eliminar.addEventListener('click', (e) => {
//     console.log("hola")

// })


const obtenerJsonDatos = (eTarget) => {
    const datos = new FormData(eTarget);
    // const datos = new FormData(formValidation);
    const datosProcesados = Object.fromEntries(datos.entries());

    if (Object.values(names).every(state => state)) {
        formValidation.reset();
    }

    return datosProcesados;
}

// const postData = async () => {
//     const newUser = getData();

//     try {
//         const response = await fetch("http://localhost:3000/productos", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newUser)
//         })
//         if (response.ok) {
//             const jsonResponse = await response.json()
//         }
//     }
//     catch (error) { console.log(error) }
// }

async function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

async function uploadImageToGitHub(base64Content, fileName) {
    const apiUrl = `https://api.github.com/repos/ChrisMHM/Github-API-test/contents/ImagenesProductos/${fileName}`;
    const token = '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';

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Agregando mi imagen',
                content: base64Content
            }),
        });

        if (!response.ok) {
            throw new Error('Error al subir la imagen a GitHub.');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
