//let tipo = ""

function resultado() {
    this.preventFormReload();
    console.log('resultado');
    var p1, p2, p3, p4, p5, p6, nota;

    // 1a pregunta
    if (document.getElementById('p11').checked == true) { p1 = 1 }
    else if (document.getElementById('p12').checked == true) { p1 = 3 }
    else if (document.getElementById('p13').checked == true) { p1 = 5 }
    else if (document.getElementById('p14').checked == true) { p1 = 7 }
    // 2a pregunta
    if (document.getElementById('p21').checked == true) { p2 = 1 }
    else if (document.getElementById('p22').checked == true) { p2 = 3 }
    else if (document.getElementById('p23').checked == true) { p2 = 5 }
    else if (document.getElementById('p24').checked == true) { p2 = 7 }
    // 3a pregunta
    if (document.getElementById('p31').checked == true) { p3 = 1 }
    else if (document.getElementById('p32').checked == true) { p3 = 3 }
    else if (document.getElementById('p33').checked == true) { p3 = 5 }
    else if (document.getElementById('p34').checked == true) { p3 = 7 }
    // 4a pregunta
    if (document.getElementById('p41').checked == true) { p4 = 1 }
    else if (document.getElementById('p42').checked == true) { p4 = 3 }
    else if (document.getElementById('p43').checked == true) { p4 = 5 }
    else if (document.getElementById('p44').checked == true) { p4 = 7 }
    // 5a pregunta
    if (document.getElementById('p51').checked == true) { p5 = 1 }
    else if (document.getElementById('p52').checked == true) { p5 = 3 }
    else if (document.getElementById('p53').checked == true) { p5 = 5 }
    else if (document.getElementById('p54').checked == true) { p5 = 7 }
    // 6a pregunta
    if (document.getElementById('p61').checked == true) { p6 = 1 }
    else if (document.getElementById('p62').checked == true) { p6 = 3 }
    else if (document.getElementById('p63').checked == true) { p6 = 5 }
    else if (document.getElementById('p64').checked == true) { p6 = 7 }


    nota = p1 + p2 + p3 + p4 + p5 + p6;
    if (nota >= 6 && nota < 18) {
        this.initModal('Tu Bomnita piel es: </br>Normal');
        return tipo = "normal";
    }
    if (nota >= 18 && nota < 30) {
        this.initModal('Tu Bomnita piel es: </br>Seca');
        return tipo = "normal", console.log(tipo);
    }
    if (nota >= 30 && nota < 42) {
        this.initModal('Tu Bomnita piel es: </br>Grasa');
        return tipo = "normal", console.log(tipo);
    }
    if (nota >= 42 && nota < 30) {
        this.initModal('Tu Bomnita piel es: </br>Mixta');
        return tipo = "normal", console.log(tipo);
    }

    // function irCompras(tipo){
    //     let piel = tipo;
    //     console.log(piel)
    //     window.location.href = `${tipo}.html`
    // }

    // alert(" Aciertos: " + nota);
   //window.location = 'cuestionario.html'
}

// let tipo = tipo;
// console.log(tipo)

function validate() {
    this.preventFormReload();
    var valid = false;
    var x = document.myform.pregunta1;
    for (var i = 0; i < x.length; i++) {
        if (x[i].checked) {
            valid = true;
            break;
        }
    }
    if (valid) {
        console.log('Validación exitosa');
    } else {
        this.initModal('¡UPS! Al parecer ha faltado alguna pregunta...');
        return false;
    }
}


/**
 * This function prevents the reload of the form
 */
function preventFormReload() {
    $("#myForm").submit(function(e) {
        e.preventDefault();
    });
}

/**
 * @param {string} text this text can change
 * this function opens and set a text for the modal
 */
function initModal(text){
    let content = document.getElementById('modalContent')
    content.innerHTML = text;
    $('#modalCentro').on('show.bs.modal')
    $('#myInput').focus()
    modal.showModal();
}


function irCompras(){
    let piel = tipo;
    console.log(piel)
    window.location.href = `${tipo}.html`
}


/* Redirecciona el boton comprar a la pagina de productos*/
function redirectProductos(){
    
}

function closeModal(){
    modal.close();
}