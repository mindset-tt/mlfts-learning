console.log('Ejecutando JS...');

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc')
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const deslizador = document.getElementById('deslizador');

//-- Valor del deslizador
const range_value = document.getElementById('range_value');

//-- Funcion de retrollamada de la imagen cargada
//-- la imagen no se carga instantaneamete, sino que lleva tiempo.
//-- Solo podemos acceder a ella una vez que este cargada totalmente.
img.onload = function(){

  console.log("Imagen cargada");

  //-- Se establece como tamaño del canvas el mismo que la imagen Original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas.
  //-- No se han hecho manipulaciones aun.
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};

//-- Funcion de retrollamada del deslizador
deslizador.oninput = () => {
  //-- Mostrar el nuevo valor del deslizador
  range_value.innerHTML = deslizador.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de la COMPONENTE ROJA del deslizador
  umbral = deslizador.value

  //-- Filtrar la imagen según el nuevo umbral
  //-- Cambiandole el valor de la componente roja
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral) //-- Si es mayor que el umbralm le asignamos el valor umbral
      data[i] = umbral;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

console.log("Fin");
