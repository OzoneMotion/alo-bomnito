// Seleccion de imagenes y visualizacion
const file = document.getElementById('imagesInput');

file.addEventListener('change', e => {

        const reader = new FileReader ();
        
        reader.onload = function (e){
            inyectarImage(e);
        }
        reader.readAsDataURL(e.target.files[0])

        console.log((e.files).length)

})

function inyectarImage(e) {

    // primero se crean los elementos html dinamicos
    const carruselWrapper = document.getElementById('carruselWrapper');
    const newDiv = document.createElement('div');
    const newImg = document.createElement('img');
    // carruselWrapper.removeChild(eliminar);
            
    // se agregan los atributos que tenias en el html
    newImg.className = "d-block w-100";
    newImg.className = "containerImg";
    newDiv.className = "carousel-item active";
    newImg.src = e.target.result;
            
    // por ultimo se inyectan
    newDiv.appendChild(newImg);
    carruselWrapper.appendChild(newDiv);
                
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
    contenidoProducto: /^[0-9]+(\.[0-9]{2})+ml|[0-9]+(\.[0-9]{2})+g$/,
    precioProducto: /^([0-9]{1,3})+(\.[0-9]{2})|[0-9]+(\,[0-9]{1,3})+(\.[0-9]{2})$/,
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
        console.log(names[name])
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

formValidation.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(Object.values(names).every(state => state))
    //console.log(sBtn_text.innerHTML)
    // const json = {
    //     cantidadProducto: elements[1].value
    // }
    // console.log(json);

    const datos = new FormData(e.target);

    const datosCompletos = Object.fromEntries(datos.entries());
    console.log(datosCompletos)
    
    if(Object.values(names).every(state => state)){
        // btnSubmit.disabled = false;
        //postData();
        formValidation.reset();

        // const successMessage = document.getElementById('btn_enviar');
        // successMessage.classList.add('form-submitted-success-active');
        // setTimeout(() => successMessage.classList.remove('form-submitted-success-active'), 5000);
    }

});


eliminar.addEventListener('click', (e) => {
    console.log("hola")

})


const getData = () => {

    const datos = new FormData(formValidation);
    const datosProcesados = Object.fromEntries(datos.entries())

    formValidation.reset();
    return datosProcesados;
}

const postData = async () => {
    const newUser = getData();

    try {
        const response = await fetch("http://localhost:3000/productos", {
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