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

  //-- data[0] es el canal rojo del pixel de la posición 0,0
  //-- data[1] es el canal verde del pixel 0,0
  //-- data[2] es el canal azul del pixel 0,0
  //-- data[3] es el canal de transparencia del pixel 0,0
  //-- data[4] es el canal ROJO del pixel 1,0
  //-- ....
  //-- En general, para el pixel i
  //-- data[4*i] es el canal rojo
  //-- data[4*i + 1]: Canal verde
  //-- data[4*i + 2]: Canal azul
  //-- data[4*i + 3]: Canal de transparencia

  //-- Colocar un pixel rojo en (200,50)
  //-- Calculamos la posicion del pixel en el array.
  //-- En la posicion (200,50), hay 50 lineas de una anchura igual que el canvas
  //-- En total 50*canvas.width. Y le sumamos 200 por los pixeles de la posicion horizontal
  let i = 200 + 50*canvas.width;

  //-- Y ahora cambiamos los valores, queremos ese pixel en rojo.
  //-- El canal de transparencia le dejamos como esta
  data[i*4] = 255;   //-- Canal rojo
  data[i*4 + 1] = 0; //-- Canal verde
  data[i*4 + 2] = 0; //-- Canal azul

  //-- Actualizamos  la imagen del canvas con los nuevos datos
  ctx.putImageData(imgData, 0, 0);

};


console.log("Fin");
