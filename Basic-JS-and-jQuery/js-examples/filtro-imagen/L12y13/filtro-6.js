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

  grises();

};

function grises(){
  var brillo = 0;
  //-- Obtenemos la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Array de todos los pixeles
  let data = imgData.data; // Cada 4 posiciones corresponden a un punto de pixel

  //-- Calcular el brillo para CADA PIXEL y ponerselo por igual a cada componente
  for (var i = 0; i < data.length; i+=4) {
    brillo = (3 * data[i] + 4 * data[i+1] + data[i+2])/8
    data[i] = brillo;
    data[i+1] = brillo;
    data[i+2] = brillo;
  }

  //-- Actualizamos  la imagen del canvas con los nuevos datos
  ctx.putImageData(imgData, 0, 0);
}


console.log("Fin");
