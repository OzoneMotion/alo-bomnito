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


const selectores = {
    selectPiel: true,
    selectIngredientes: false,
}



//Selector de ingredientes y validacion
// const selectBtn = document.querySelector(".select-btn");
// const items = document.querySelectorAll(".item");

// selectBtn.addEventListener("click", () => {
//     const feedbackEmptyElement = document.querySelector(`#id-ingredientesProducto .invalid-feedback#id-ingredientesProducto-empty`);
//     const feddbackValidate = document.querySelector(`#id-ingredientesProducto .select-btn`)
//     const checked = document.querySelectorAll(".checked");
//     selectBtn.classList.toggle("open");
//     if(checked.length <= 0){
//         feedbackEmptyElement.classList.add('invalid-feedback-active');
//         feddbackValidate.classList.add('invalid-feeback-active-input');
//     }
// });

// items.forEach(item => {
//     item.addEventListener("click", () => {
//         item.classList.toggle("checked");
//         const checked = document.querySelectorAll(".checked");
//         const btnText = document.querySelector(".btn-text");
//         const feedbackEmptyElement = document.querySelector(`#id-ingredientesProducto .invalid-feedback#id-ingredientesProducto-empty`);
//         const feedbackRegexElement = document.querySelector(`#id-ingredientesProducto .invalid-feedback#id-ingredientesProducto-max`);
//         const feddbackValidate = document.querySelector(`#id-ingredientesProducto .select-btn`);
//         const items = document.querySelectorAll(".item-text");
//         items.cclassList.toggle("checked");

//          Validación de selección mínima y máxima
//         if (checked.length >= 1 && checked.length <= 6) {
//             console.log(items[0].value)
//             btnText.innerText = `${checked.length} Seleccionados`;
//             feddbackValidate.classList.remove('invalid-feeback-active-input')
//             feedbackEmptyElement.classList.remove('invalid-feedback-active');
//             feedbackRegexElement.classList.remove('invalid-feedback-active');
//             feddbackValidate.classList.add('valid-feedback-active');
//             selectores.selectIngredientes = true;
//         } else if (checked.length > 6) {
//          Si se seleccionan más de 6 elementos, deselecciona el último
//             btnText.innerText = `Selecciona correctamente`;
//             selectBtn.classList.remove("open");
//             feddbackValidate.classList.remove('valid-feedback-active');
//             feedbackEmptyElement.classList.remove('invalid-feedback-active');
//             feddbackValidate.classList.add('invalid-feeback-active-input');
//             feedbackRegexElement.classList.add('invalid-feedback-active');
//             selectores[selectIngredientes] = false;
//         } else {
//             btnText.innerText = `Selecciona minimo 1 ingrediente`;
//             selectBtn.classList.remove("open");
//             feddbackValidate.classList.remove('valid-feedback-active');
//             feddbackValidate.classList.add('invalid-feeback-active-input');
//             feedbackEmptyElement.classList.add('invalid-feedback-active');
//             feedbackRegexElement.classList.remove('invalid-feedback-active');
//             [selectIngredientes] = false;
//         }
//     });
// });


//Selector de tipo de piel y validacion
// const optionMenu = document.querySelector(".select-menu");
// const selectBtndrop = optionMenu.querySelector(".select-btndrop");
// const options = optionMenu.querySelectorAll(".option");
// const sBtn_text = optionMenu.querySelector(".sBtn-text");
// const feedbackEmptyElement = document.querySelector(`#id-tipoPiel .invalid-feedback#tipoPiel-empty`);

// selectBtndrop.addEventListener("click", () => {
//     const BTN = optionMenu.querySelector(".sBtn-text").innerHTML;
//     optionMenu.classList.toggle("active")
//     if(BTN == "Selecciona el tipo de piel"){
//         feedbackEmptyElement.classList.add('invalid-feedback-active');
//         selectores.selectPiel = false;
//     }

// });

// options.forEach(option => {
//     option.addEventListener("click", () => {
//         let selectedOption = option.querySelector(".option-text").innerText;
//         sBtn_text.innerText = selectedOption;
//         feedbackEmptyElement.classList.remove('invalid-feedback-active');
//         optionMenu.classList.remove("active");
//         selectores[selectPiel] = true;
//     });
// });






//Validacion de inputs
const formValidation = document.getElementById('validation');
const inputs = document.querySelectorAll('#validation input');
const textAreas = document.querySelectorAll('#validation textarea');
const btnSubmit = document.getElementById('btn_enviar');
const elements = [...inputs, ...textAreas];
const eliminar = document.getElementById("cancelar")

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

// const procesaJSON = () => {
//     const datos = new FormData(e.target);

//     const datosCompletos = Object.fromEntries(datos.entries());
//     console.log(datosCompletos)
// }