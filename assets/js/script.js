$(document).ready(function() {

function capturarInformacion() {
    var heroNumber = $('#heroNumber').val();
    return heroNumber;
}

let chart= $('#chartContainer');
function consultarAPI(capturarInformacion) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: `https://superheroapi.com/api.php/4905856019427443/${capturarInformacion}`,
        success: function(heroe) {
            $('#contenedorTarjetas').empty();
                var tarjeta = `
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="${heroe.image.url}" alt="Imagen de ${heroe.name}">
                        <div class="card-body">
                            <h5 class="card-title">Nombre: ${heroe.name}</h5>
                            <p class="card-text">Conexiones: ${heroe.connections['group-affiliation']}</p>
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

                let datos= []

                for (const key in heroe.powerstats) {
                    datos.push ({
                        label: key,
                        y: parseInt(heroe.powerstats[key])
                    });
                }

                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light2", // "light1", "light2", "dark1", "dark2"
                    animationEnabled: true,
                    title: {
                        text: `Estadísticas de poder para ${heroe.name}`
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}",
                        dataPoints: datos
                    }]
                });
                chart.render();
                
        },
         
    });
    $('#chartContainer').append(chart);
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