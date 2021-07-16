require('dotenv').config();
const {
    leeInput,
    inquirerMenu,
    pausa,
    listarLugares
} = require("./helpers/inquirer");
const Busqueda = require("./models/Busqedas.model");

const main = async() => {
    const busquedas = new Busqueda();
    let opt;
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const lugar = await leeInput('Ingrese el Lugar: ');
                const lugares = await busquedas.ciudad(lugar);
                const idSeleccionado = await listarLugares(lugares);
                if (idSeleccionado === '0') continue;
                const lugarSel = lugares.find(l => l.id === idSeleccionado);
                busquedas.agregarHistorial(lugarSel.nombre);
                const clima = await busquedas.obtenerClima(lugarSel.lat, lugarSel.lng);
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: '.red, lugarSel.nombre);
                console.log('Lat: ', lugarSel.lat);
                console.log('Lng: ', lugarSel.lng);
                console.log('Temperatura: '.blue, clima.temp);
                console.log('Mínima:', clima.min);
                console.log('Máxima: ', clima.max);
                console.log('Como está el clima: ', clima.desc.yellow);
                break;

            case 2:
                console.log('Lugares Guardados en el historial'.green);
                busquedas.historial.forEach((lugar, index) => {
                    const idx = `${index + 1}`.green;
                    console.log(`${idx} ${lugar}`);
                });
                break;
        }
    } while (opt !== 0);
}

main();