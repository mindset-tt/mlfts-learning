console.log('Ejecutando JS...');

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img1 = document.getElementById('imagesrc');
const img2 = document.getElementById('imagesrc2');
const ctx = canvas.getContext('2d');
var imagen1 = false;
var imagen2 = false;
//-- Acceso a los deslizadores
const des_rojo = document.getElementById('rojo');
const des_verde = document.getElementById('verde')
const des_azul = document.getElementById('azul')

//-- Valor de los deslizadores
const value_rojo = document.getElementById('value_r');
const value_verde = document.getElementById('value_g');
const value_azul = document.getElementById('value_b');

//-- Obtener el boton de GRISES
const grises = document.getElementById('grises');

//-- Obtener boton de COLORES
const colores = document.getElementById('colores');

//-- Obtener boton de NEGATIVO
const negativo = document.getElementById('negativo');

//-- Obtener boton de REFLEJO
const reflejo = document.getElementById('reflejo');
var modoReflejo = false;

//-- Obtener boton de ABAJO
const abajo = document.getElementById('abajo');
var modoAbajo = false;

//-- Obtener boton de IMAGENES
const b_img1 = document.getElementById('foto1');
const b_img2 = document.getElementById('foto2');

//-- Botones e imagenes ocultas hasta elegir imagen
document.getElementById('botones').style.display = 'none';
document.getElementById('deslizadores').style.display = 'none';

var test = new Image(300 ,160);
test.src = 'barras.jpeg';

test.onload = function(){
  canvas.width = test.width;
  canvas.height = test.height;
  ctx.drawImage(test, 0,0);
};

//-- Funcion de retrollamada de la imagen cargada
//-- la imagen no se carga instantaneamete, sino que lleva tiempo.
//-- Solo podemos acceder a ella una vez que este cargada totalmente.
img1.onload = function(){
  console.log("Imagen1 cargada");
  //-- Se establece como tamaño del canvas el mismo que la imagen Original
  canvas.width = img1.width;
  canvas.height = img1.height;
  //-- Situar la imagen original en el canvas.
  //-- No se han hecho manipulaciones aun.

  console.log("Imagen1 lista...");
};

img2.onload = function(){
  console.log("Imagen2 cargada");
  canvas.width = img2.width;
  canvas.height = img2.height;

  console.log("Imagen2 lista...");
};

function filtroColores(data){
  var umbralR = des_rojo.value;
  var umbralG = des_verde.value;
  var umbralB = des_azul.value;
  //-- Filtrar la imagen según el nuevo umbral
  for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR){
        data[i] = umbralR;
      }
      if (data[i+1] > umbralG){
        data[i+1] = umbralG;
      }
      if (data[i+2] > umbralB){
        data[i+2] = umbralB;
      }
    }
}

function deslizadores(){
  ctx.drawImage(img, 0,0);
  //-- Funcion de retrollamada de los deslizadores
  des_rojo.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    value_rojo.innerHTML = des_rojo.value;
    //-- Situar la imagen original en el canvas
    ctx.drawImage(img, 0,0);
    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //-- Obtener el array con todos los píxeles
    let data = imgData.data
    //-- Obtener el umbral de la COMPONENTE ROJA del deslizador
    filtroColores(data);
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  des_verde.oninput = () => {
    value_verde.innerHTML = des_verde.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data
    //-- Obtener el umbral de la COMPONENTE VERDE del deslizador
    filtroColores(data);
    ctx.putImageData(imgData, 0, 0);
  }

  des_azul.oninput = () => {
    value_azul.innerHTML = des_azul.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data
    //-- Obtener el umbral de la COMPONENTE AZUL del deslizador
    filtroColores(data);
    ctx.putImageData(imgData, 0, 0);
  }
}

function filtroNegativo(){
  ctx.drawImage(img, 0,0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;

  for ( var i = 0; i < data.length; i+=4 ) {
      var r = data[i];
      var g = data[i+1];
      var b = data[i+2];

      data[i] = 255 - r;
      data[i+1] = 255 - g;
      data[i+2] = 255 - b;
  }
  ctx.putImageData( imgData, 0, 0 );
}

function filtroReflejo(){
  ctx.drawImage(img, 0,0);
  ctx.translate(2*(img.width)/2,0);
  ctx.scale(-1,1);
  ctx.drawImage(img, 0, 0);
  modoReflejo = true;

}

function filtroAbajo(){
  ctx.drawImage(img, 0,0);
  ctx.translate(0,2*(img.height)/2);
  ctx.scale(1,-1);
  ctx.drawImage(img, 0, 0);
  modoAbajo = true;
}

function comprobacionImagen(){
  if(modoAbajo == true){
    filtroAbajo();
    modoAbajo = false;
  }
  if(modoReflejo == true){
    filtroReflejo();
    modoReflejo = false;
  }
}

function filtroGrises(){
  ctx.drawImage(img, 0,0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;
  //-- Calcular el brillo para CADA PIXEL y ponerselo por igual a cada componente
  for (var i = 0; i < data.length; i+=4) {
    r = data[i];
    g = data[i+1];
    b = data[i+2];
    brillo = (3 * r + 4 * g + b)/8
    data[i] = brillo;
    data[i+1] = brillo;
    data[i+2] = brillo;
  }
  ctx.putImageData(imgData, 0, 0);
}

//-- Elegir la imagen seleccionada
function elegirImagen(){
  if(imagen1 == true){
    img = img1
  }else if (imagen2 == true){
    img = img2;
  }
  document.getElementById('botones').style.display = 'block';
  document.getElementById('deslizadores').style.display = 'block';
  ctx.drawImage(img, 0,0);
}

b_img1.onclick = () => {
  imagen1 = true;
  imagen2 = false;
  comprobacionImagen();
  elegirImagen()
}

b_img2.onclick = () => {
  imagen1 = false;
  imagen2 = true;
  comprobacionImagen();
  elegirImagen()
}

//-- Función de retrollamada al boton de GRISES
grises.onclick = () => {
  comprobacionImagen();
  filtroGrises();
  document.getElementById('deslizadores').style.display = 'none';
}

//-- Funcion de retrollamada al boton COLORES
colores.onclick = () => {
  comprobacionImagen();
  des_rojo.value = 255;
  des_verde.value = 255;
  des_azul.value = 255;
  deslizadores();
  document.getElementById('deslizadores').style.display = 'block';
}

//-- Función de retrollamada al boton de GRISES
negativo.onclick = () => {
  comprobacionImagen();
  filtroNegativo();
  document.getElementById('deslizadores').style.display = 'none';
}

//-- Función de retrollamada al boton de REFLEJO
reflejo.onclick = () => {
  comprobacionImagen();
  filtroReflejo();
  document.getElementById('deslizadores').style.display = 'none';
}

//-- Función de retrollamada al boton de ABAJO
abajo.onclick = () => {
  comprobacionImagen();
  filtroAbajo();
  document.getElementById('deslizadores').style.display = 'none';
}
