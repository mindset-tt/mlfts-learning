console.log("Ejecutando js...");
//-- Leer el párrafo identificado como valor
//-- Leer el valor del boton
const test = document.getElementById("buton");
const valor = document.getElementById("valor")
test.onclick = function(){
  if(valor.innerHTML = ''){
    console.log("5");
    valor_nuevo = '5';
    valor.innerHTML = valor_nuevo;
  }else{
  console.log("");
  valor_nuevo = '';
  valor.innerHTML = valor_nuevo;
  }
}
