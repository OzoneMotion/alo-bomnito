const file = document.getElementById('imagesInput');

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