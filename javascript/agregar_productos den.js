const file = document.getElementById('imagesInput');
/* Agrege validación de imputs, textareas y buttons*/
const formato = document.getElementById('formato');
const inputs = document.querySelectorAll('#validation input');
const textAreas = document.querySelectorAll('#validation textarea');
const btnSubmit = document.getElementById('btn-submit');
const elements = [...inputs, ...textAreas];



file.addEventListener('change', e => {

        const reader = new FileReader ();
        
        reader.onload = function (e){
            validation(e);
        }
        reader.readAsDataURL(e.target.files[0])

})


function validation(e) {

    let supportedImages = ["jpeg", "png", "jpg"];

    for (var i = 0; i < supportedImages.length; i++) {
        const url = e.target.result;
        const etiqueta = supportedImages[i]
        if (url.includes(etiqueta) == true){
            console.log(etiqueta)
            inyectarImage(url)
            console.log(url)
        } else {
            ErrorMessage()
        }
    }

}

function ErrorMessage() {
    alert("archivo invalido");
}

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
                newImg.src = e;
            
                // por ultimo se inyectan
                newDiv.appendChild(newImg);
                carruselWrapper.appendChild(newDiv);
                
}

const selectBtn = document.querySelector(".select-btn"),
      items = document.querySelectorAll(".item");
selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
});
items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        let checked = document.querySelectorAll(".checked"),
            btnText = document.querySelector(".btn-text");
            if(checked && checked.length > 0){
                btnText.innerText = `${checked.length} Seleccionados`;
            }else{
                btnText.innerText = "Selecciona los ingredientes.";
            }
    });
})

const optionMenu = document.querySelector(".select-menu"),
       selectBtndrop = optionMenu.querySelector(".select-btndrop"),
       options = optionMenu.querySelectorAll(".option"),
       sBtn_text = optionMenu.querySelector(".sBtn-text");
selectBtndrop.addEventListener("click", () => optionMenu.classList.toggle("active"));       
options.forEach(option =>{
    option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;
        optionMenu.classList.remove("active");
    });
});

/* Validacion */

const regex = {
    nameId: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos
    emailId: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phoneId: /^\d{10}$/, // 10 numeros.
    commentId: /^(?!\s*$)[\s\S]{1,500}$/,
}

const names = {
    cantidadProducto: false,
    IdProducto: false,
    nombreProducto: false,
    marcaProducto: false,
    precioProducto: false,
    contenidoProducto: false,
    descripcionProducto: false,
    indicacionesProducto: false,
    options: false,  /* No estoy segura de que funcione porque son opciones*/
    listItems: false,   /* No estoy segura de que funcione porque son opciones*/
}

const formNamesValidation = (e) => {
    const validations = {
        "nameId": regex.nameId,
        "emailId": regex.emailId,
        "phoneId": regex.phoneId,
        "commentId": regex.commentId
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

const sendMail = () => {
    const params = {
        nameId: document.getElementById("nameId").value,
        emailId: document.getElementById("emailId").value,
        phoneId: document.getElementById("phoneId").value,
        commentId: document.getElementById("commentId").value,
    };

    const serviceID = "service_gytyy4i";
    const templateID = "template_sndgac6";

    emailjs.send(serviceID, templateID, params);
}
