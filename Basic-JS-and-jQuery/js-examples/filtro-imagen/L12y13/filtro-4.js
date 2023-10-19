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

  //-- Eliminar el canal Rojo: recorrer el array de datos de la imagen
  //-- Eliminado TODA LA COMOPONENTE ROJA y dejando el resto igual que estaba.
  //-- Le vamos incrementando 4 porque cada pixel son 4 posiciones, y la ROJA
  //-- ocupa la primera posicion.
  for (let i = 0; i < data.length; i+=4) {
    data[i] = 0; //-- Canal rojo a 0
  }

  //-- Actualizamos  la imagen del canvas con los nuevos datos
  ctx.putImageData(imgData, 0, 0);

};


console.log("Fin");
