$(document).ready(function() {

function capturarInformacion() {
    var heroNumber = $('#heroNumber').val();
    return heroNumber;
}

function consultarAPI(informacion) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: `https://superheroapi.com/api.php/4905856019427443/${informacion}`,
        success: function(data) {
            $('#contenedorTarjetas').empty();
    
            data.forEach(function(heroe) {
                var tarjeta = `
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="${heroe.image.url}" alt="Imagen de ${heroe.name}">
                        <div class="card-body">
                            <h5 class="card-title">Nombre: ${heroe.name}</h5>
                            <p class="card-text">Conexiones: ${heroe.connections['group-affiliation']}</p>
                            <a href="#" class="btn btn-primary">Más información</a>
                            <ul>
                                <li>Publicación: ${heroe.biography.publisher}</li>
                                <li>Ocupación: ${heroe.work.occupation}</li>
                                <li>Primera Aparición: ${heroe.biography['first-appearance']}</li>
                                <li>Altura: ${heroe.appearance.height}</li>
                                <li>Peso: ${heroe.appearance.weight}</li>
                                <li>Alianzas: ${heroe.biography.aliases}</li>
                            </ul>
                        </div>
                    </div>
                `;
    
                $('#contenedorTarjetas').append(tarjeta);
            });
        },
        
    });
}

function validarInformacion(informacion) {
    if ($.isNumeric(informacion)) {
        return informacion;
    } else {
        return "Por favor, Ingrese un número.";
}
};

$('#searchForm').submit(function(event) {
    event.preventDefault();

    var informacion = capturarInformacion();

    // Validar la información si es necesario
    if(validarInformacion(informacion)) {
        // Realizar la consulta a la API con la información validada
        consultarAPI(informacion);
    } else {
        // Informar al usuario que la información es inválida
        alert('La información ingresada es inválida.');
    }
});






  });