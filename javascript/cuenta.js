async function imprimirUsuario(idCliente) {
    const usuariosLocales = JSON.parse(localStorage.getItem('usuarioActivo'));
    //usuarioEncontrado = usuariosLocales.find((usuario) => (usuario.emailId === usuarioActual && usuario.password === passwordActual));
    console.log(usuariosLocales)

    const nameId = document.getElementById("nameId");
    const emailId = document.getElementById("emailId");
    const usuarios = await getData();
    const usuario = usuarios.find(usuario => usuario.idCliente === idCliente)
    nameId.innerHTML = `${usuariosLocales.nameId}`;
    emailId.innerHTML = `${usuariosLocales.nameId}`;
    mostrarContrasenia(usuariosLocales)
}

async function mostrarContrasenia(usuario) {
    const passwordId = document.getElementById("password")
    const contrasenia = usuario.password;
    const contraseniaLenght = contrasenia.length;
    let passwordAst = "";

    for (let i = 1; i < contraseniaLenght; i++) {
        passwordAst = passwordAst + '*';
    }

    if (passwordId.innerText == `${contrasenia}`) {
        passwordId.innerHTML = `${passwordAst}`;
    } else if (passwordId.innerText == passwordAst) {
        passwordId.innerHTML = `${contrasenia}`;
    } else if (passwordId.innerText == "") {
        passwordId.innerHTML = `${passwordAst}`;
    }

}

function Visibility() {
    
}

const getData = async () => {
    try {
         const response = await fetch("http://localhost:3000/users", {
        // const response = await fetch("https://alobomnito.onrender.com/api/v1/Clientes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error al obtener los datos del archivo db.json:', response.statusText);
            return [];
        }
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
};


imprimirUsuario(1);