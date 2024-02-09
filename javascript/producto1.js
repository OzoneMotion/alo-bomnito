function cargarJSON() {

    const url = '../productos.json';

    return fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el JSON. Código de estado: ${response.status}');

        }
        return response.json();
    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
    });
}

cargarJSON().then(productos => {
    
    console.log(productos);

    const primerProdcuto = productos[0];
    document.getElementById('tarjetaCarrusel-1').src = primerProdcuto.images[0];

    document.getElementById('marcaProd').textContent = primerProdcuto.marca;
    document.getElementById('nombreProd').textContent = primerProdcuto.nombre;
    document.getElementById('modeloProd').textContent = primerProdcuto.contenido;
    document.getElementById('precioProd').textContent = '$'+primerProdcuto.precio+'.00';

    document.getElementById('tarjetaMaxDescripcion').textContent = primerProdcuto.descripcion;
    document.getElementById('tarjetaMaxIngredientes').innerHTML = recuperarIngredientesProducto(primerProdcuto);
    document.getElementById('tarjetaMaxIndicaciones').textContent = primerProdcuto.uso;

    document.getElementById('accoDescripcion').textContent = primerProdcuto.descripcion;
    document.getElementById('accoIngredientes').innerHTML = recuperarIngredientesProducto(primerProdcuto);
    document.getElementById('accoIndicaciones').textContent = primerProdcuto.uso;
});

const recuperarIngredientesProducto = (producto) => {
    let ingrendientes = "";

    producto.tabla.forEach(item => {
        ingrendientes += `<tr>
        <td>${item.ingrediente}</td>
        <td>${item.funcion}</td>
      </tr>`;
    });

    return ingrendientes;
}

cargarJSON().then(productos => {
    
    console.log(productos);

    const segundoProdcuto = productos[1];
    document.getElementById('miniProd1').textContent = segundoProdcuto.nombre;
    document.getElementById('miniMarca1').textContent = segundoProdcuto.marca;
    document.getElementById('miniModelo1').textContent = segundoProdcuto.contenido;
    document.getElementById('miniPrecio1').textContent = '$'+segundoProdcuto.precio+'.00';

});

cargarJSON().then(productos => {
    
    console.log(productos);

    const thirdProdcuto = productos[11];
    document.getElementById('miniProd2').textContent = thirdProdcuto.nombre;
    document.getElementById('miniMarca2').textContent = thirdProdcuto.marca;
    document.getElementById('miniModelo2').textContent = thirdProdcuto.contenido;
    document.getElementById('miniPrecio2').textContent = '$'+thirdProdcuto.precio+'.00';

});

cargarJSON().then(productos => {
    
    console.log(productos);

    const cuartoProdcuto = productos[2];
    document.getElementById('miniProd3').textContent = cuartoProdcuto.nombre;
    document.getElementById('miniMarca3').textContent = cuartoProdcuto.marca;
    document.getElementById('miniModelo3').textContent = cuartoProdcuto.contenido;
    document.getElementById('miniPrecio3').textContent = '$'+cuartoProdcuto.precio+'.00';

});

cargarJSON().then(productos => {
    
    console.log(productos);

    const fiveProdcuto = productos[3];
    document.getElementById('miniProd4').textContent = fiveProdcuto.nombre;
    document.getElementById('miniMarca4').textContent = fiveProdcuto.marca;
    document.getElementById('miniModelo4').textContent = fiveProdcuto.contenido;
    document.getElementById('miniPrecio4').textContent = '$'+fiveProdcuto.precio+'.00';

});