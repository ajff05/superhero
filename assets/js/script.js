$(document).ready(function() {

function capturarInformacion() {
    var heroNumber = $('#heroNumber').val();
    return heroNumber;
}

function consultarAPI(informacion) {
    // Aquí iría el código para realizar la consulta a la API
    // utilizando la información capturada.
    // Por ejemplo, podrías usar $.ajax, $.get, $.post, etc.
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





$.ajax({
    url: 'https://superheroapi.com/api/4905856019427443/id_del_heroe',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        // Aquí manejas la respuesta exitosa
        console.log(data);
    },
    error: function(error) {
        // Aquí manejas los errores de la solicitud
        console.error(error);
    }
});
  });