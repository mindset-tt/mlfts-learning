console.log('Ejecutando JS...');

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc')
const ctx = canvas.getContext('2d');

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

  //-- Para acceder a los pixeles de la Imagen usamos getImageData
  //-- Se le pasan la esquina superior izquierda y la inferior derecha de la region
  //-- que queremos leer.
  //-- Aqui estamos leyendo la imagen completa.
  //-- Obtenemos la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Para acceder más facilmente, la situamos en una variable
  //-- Va linea por linea leyendo.
  //-- Array de todos los pixeles
  let data = imgData.data; // Cada 4 posiciones corresponden a un punto de pixel

  //-- Obtener el numero total de elementos en el array
  console.log("Tamaño de data: " + data.length)

  //-- El número total de pixeles es la altura por la anchura
  npixels = canvas.width * canvas.height
  console.log("Anchura (en pixeles): " + canvas.width)
  console.log("Altura (en pixeles): " + canvas.height)
  console.log("Pixeles totales: " + npixels)

  //-- Tamaño de array de datos
  //-- Puesto que cada pixel ocupa 4 bytes, el array de píxeles
  //-- tiene un tamaño de 4 * numero de pixeles
  console.log("Total de datos de la imagen: " + npixels * 4)
};


console.log("Fin");
