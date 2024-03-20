// // ORIGINAL

// const postData = async () => {
//     const newUser = getData();

//     try {
//         const response = await fetch("http://localhost:3000/admins", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newUser)
//         })
//         if (response.ok) {
//             const jsonResponse = await response.json()
//             const { username, password } = jsonResponse;
//         }
//     }
//     catch (error) { console.log(error) }
// }

// formulario.addEventListener("submit", event => {
//     event.preventDefault();
//     postData();
// })

// //Almacenamiento de los datos introducidos en el formulario en la base de datos

// const formulario = document.querySelector(".validation-registro");

// formulario.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     try {
//         // Cargamos nuestro server json
//         const response = await fetch("db.json")
//         const data = await response.json();

//         // Obtener los datos ingresados del formulario
//         const newUser = getData();

//         // Verificar si el usuario o el correo electrónico ya existen
//         const usuarioExistente = data.find(
//             (admins) =>
//                 admins.adminId === newUser.adminId || admins.emailId === newUser.emailId
//         );

//         if (usuarioExistente) {
//             alert(
//                 "El nombre de usuario o el correo electrónico ya están en uso. Por favor, elige otro."
//             );
//         } else {
//             // Continuar con el proceso de guardar el formulario
//             postData(newUser);
//         }
//     } catch (error) {
//         console.error("Error al cargar los datos:", error);
//     }
// });

// const getData = () => {

//     const datos = new FormData(formulario);
//     const datosProcesados = Object.fromEntries(datos.entries())

//     // Agregamos el id numérico al objeto
//     datosProcesados.id = Math.floor(Math.random() * 99);

//     formulario.reset();
//     return datosProcesados;
// }

// const postData = async (newUser) => {
//     const newUser = getData();

//     try {
//         const response = await fetch("http://localhost:3000/admins", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newUser)
//         })
//         if (response.ok) {
//             const jsonResponse = await response.json()
//             const { username, password } = jsonResponse;
//         }
//     }
//     catch (error) { console.log(error) }
// }

// // formulario.addEventListener("submit", event => {
// //     event.preventDefault();
// // })

// // Corregido

// formulario.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     try {
//         // Cargamos nuestro server json
//         const response = await fetch("http://localhost:3000/admins")
//         const data = await response.json();

//         // Obtener los datos ingresados del formulario
//         const newUser = getData();

//         // Verificar si el usuario o el correo electrónico ya existen
//         const usuarioExistente = data.find(
//             (admins) =>
//                 admins.adminId === newUser.adminId || admins.emailId === newUser.emailId
//         );

//         if (usuarioExistente) {
//             alert(
//                 "El nombre de usuario o el correo electrónico ya están en uso. Por favor, elige otro."
//             );
//         } else {
//             // Continuar con el proceso de guardar el formulario
//             postData(newUser);
//         }
//     } catch (error) {
//         console.error("Error al cargar los datos:", error);
//     }
// });

// const getData = () => {

//     const datos = new FormData(formulario);
//     const datosProcesados = Object.fromEntries(datos.entries())

//     // Agregamos el id numérico al objeto
//     datosProcesados.id = Math.floor(Math.random() * 99);

//     return datosProcesados;
// }

// const postData = async (newUser) => {
//     try {
//         const response = await fetch("http://localhost:3000/admins", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newUser)
//         })
//         if (response.ok) {
//             const jsonResponse = await response.json()
//             const { username, password } = jsonResponse;
//         }
//     }
//     catch (error) { console.log(error) }
// }

// //Primera versión
// const formulario = document.querySelector(".validation-registro");


// formulario.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     try {
//         // Cargamos nuestro server json
//         const response = await fetch("http://localhost:3000/admins")
//         const data = await response.json();

//         // Obtener los datos ingresados del formulario
//         const newUser = getData();

//         // Verificar si el usuario o el correo electrónico ya existen
//         const usuarioExistente = data.find(
//             (admins) =>
//                 admins.adminId === newUser.adminId || admins.emailId === newUser.emailId
//         );

//         if (usuarioExistente) {
//             alert(
//                 "El nombre de usuario o el correo electrónico ya están en uso. Por favor, elige otro."
//             );
//         } else {
//             // Continuar con el proceso de guardar el formulario
//             postData();
//             return newUser
//         }
//     } catch (error) {
//         console.error("Error al cargar los datos:", error);
//     }
// });

// const getData = () => {

//     const datos = new FormData(formulario);
//     const datosProcesados = Object.fromEntries(datos.entries())

//     // Agregamos el id numérico al objeto
//     datosProcesados.id = Math.floor(Math.random() * 99);

//     formulario.reset();
//     return datosProcesados;
// }

// const postData = async (newUser) => {
//     //const newUser = getData();

//     try {
//         const response = await fetch("http://localhost:3000/admins", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newUser)
//         })
//         if (response.ok) {
//             const jsonResponse = await response.json()
//             const { username, password } = jsonResponse;
//         }
//     }
//     catch (error) { console.log(error) }
// }

// formulario.addEventListener("submit", event => {
//     event.preventDefault();
//     postData();
// })