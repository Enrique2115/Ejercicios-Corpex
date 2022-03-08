//Funcion que reenderizara toda la tabla con los datos
function crearTabla(data) {
  //console.log(data);
  const todasFilas = data.split(/\r?\n|\r/);
  //console.log(todasFilas);

  let tabla = "<table>";
  for (let fila = 0; fila < todasFilas.length - 1; fila++) {
    const celdasFila = todasFilas[fila].split("|");

    const fechaFila = celdasFila[12];
    dia = fechaFila.slice(0, 2);
    mes = fechaFila.slice(2, 4);
    anno = fechaFila.slice(4, 6);
    console.log(
      `El numero de telefono de origen es: ${celdasFila[3]} y la fecha realizada ${dia}/${mes}/${anno}`
    );

    for (let rowCell = 0; rowCell < celdasFila.length; rowCell++) {
      if (fila === 0) {
        tabla += "<td>";
        tabla += celdasFila[rowCell];
        tabla += "</td>";
      } else {
        tabla += "<td>";
        tabla += celdasFila[rowCell];
        tabla += "</td>";
      }
    }
    if (fila === 0) {
      tabla += "</tr>";
      tabla += "<tbody>";
    } else {
      tabla += "</tr>";
    }
  }
  tabla += "</tbody>";
  tabla += "</table>";
  document.querySelector("#tablares").innerHTML = tabla;
}

//Funcion que leera el archivo seleccionado por el usuario mediante el input
function leerArchivo(evt) {
  let file = evt.target.files[0];
  let reader = new FileReader();
  reader.onload = (e) => {
    // Cuando el archivo se terminó de cargar
    crearTabla(e.target.result);
  };
  // Leemos el contenido del archivo seleccionado
  reader.readAsText(file);
}

//Evento que espera la interaccion del input por parte del usuario
const $input = document.querySelector("#archivo");
$input.addEventListener("change", leerArchivo, false);

//funcion para copiar archivos
function copiarTxt(evt) {
  let file = evt.target.files[0];
  let reader = new FileReader();
  reader.onload = (e) => {
    // Cuando el archivo se terminó de cargar

    guardarArchivoDeTexto(e.target.result, "archivo.txt");
  };
  // Leemos el contenido del archivo seleccionado
  reader.readAsText(file);
}

// codigo para guardar un archivo de texto
const guardarArchivoDeTexto = (contenido, nombre) => {
  for (let index = 0; index < 100; index++) {
    console.log(index);
    const a = document.createElement("a");
    const archivo = new Blob([contenido], { type: "text/plain" });
    const url = URL.createObjectURL(archivo);
    a.href = url;
    a.download = nombre;
    a.click();
    URL.revokeObjectURL(url);
  }
};

//Evento que espera la interaccion del boton por parte del usuario para copiar los datos
const $botonDescargar = document.querySelector("#copiar");
$botonDescargar.addEventListener("change", copiarTxt, false);
