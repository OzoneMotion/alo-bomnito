const formValidation = document.getElementById('form-validation');
const inputs = document.querySelectorAll('#form-validation input');
const textAreas = document.querySelectorAll('#form-validation textarea');
const btnSubmit = document.getElementById('btn-submit');
const elements = [...inputs, ...textAreas];

const regex = {
    nameId: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos
    emailId: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phoneId: /^\d{10}$/, // 10 numeros.
    commentId: /^(?!\s*$)[\s\S]{1,500}$/,
}

const names = {
    commentId: false,
    nameId: false,
    emailId: false,
    phoneId: false
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