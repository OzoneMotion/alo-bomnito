const nameId =  document.getElementById("nameId")
const emailId =  document.getElementById("emailId")
const passwordId =  document.getElementById("password")
const admnId =  document.getElementById("admnId")

async function imprimirUsuario() {
    const Usuarios = await getData();

    nameId.innerHTML = `${Usuarios[1].nameId}`;
    nameId.innerHTML = `${Usuarios[1].nameId}`;
    admnId.innerHTML = `${Usuarios[1].admnId}`;
    Visibility();
    
} 

async function Visibility(){
    const Usuarios = await getData();
    const password = Usuarios[1].password;
    const passwordLenght = `${Usuarios[1].password}`.length;
    let passwordAst = ""

    for(let i = 1; i < passwordLenght; i++) {
        passwordAst = passwordAst + '*'
    }
    
    if(passwordId.innerText == `${password}`){
        passwordId.innerHTML = `${passwordAst}`;
    } else if(passwordId.innerText == passwordAst) {
        passwordId.innerHTML = `${password}`;
    } else if(passwordId.innerText == ""){
        passwordId.innerHTML = `${passwordAst}`;
    }

}

const getData = async () => {
    try {
        const response = await fetch("http://localhost:3000/admins", { 
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            }
        });
        console.log (response);
        if (response.ok) {
            return await response.json();
        } else {
            console.log('Error al obtener los datos del archivo db.json:', response.statusText);
            return [];
        }
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
};