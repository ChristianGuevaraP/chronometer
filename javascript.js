window.onload = function() {
    pantalla = document.getElementById("screen");
 }
 var isMarch = false; 
 var acumularTime = 0;

var data=0;
var tir=1;
 
var database = firebase.database();

database.ref('/esp32').update({
   inicio:0,parar:0,continuar:0,resetear:0});

// some HTML element on the page
var postElement1 = document.getElementById("postElement1");
var paro= postElement1.innerHTML;

var postElement2 = document.getElementById("postElement2");
var inic= postElement2.innerHTML;

var postElement3 = document.getElementById("postElement3");
var repet= postElement3.innerHTML;


// here I will assume that this function simply 
// updates the contents of the element with a value
var updateStarCount = function(element, value) {
    element.textContent = value;
};

var starCountRef = firebase.database().ref('esp32/' + '/inicio');
starCountRef.on('value', function(snapshot) {
    var iniciando=snapshot.val();
    updateStarCount(postElement2, iniciando);
});

var starCountRef = firebase.database().ref('esp32/' + '/parar');
starCountRef.on('value', function(snapshot) {
    var data=snapshot.val();
    updateStarCount(postElement1, data);
});

var starCountRef = firebase.database().ref('esp32/' + '/resetear');
starCountRef.on('value', function(snapshot) {
    var repitiendo=snapshot.val();
    updateStarCount(postElement3, repitiendo);
});

inicio.addEventListener('click',(e) => {
    e.preventDefault();
    database.ref('/esp32').update({
        inicio:1,parar:0,continuar:0,resetear:0
    })
});
parar.addEventListener('click',(e) => {
   e.preventDefault();
   database.ref('/esp32').update({
      inicio:0,parar:1,continuar:0,resetear:0
   })
});
continuar.addEventListener('click',(e) => {
   e.preventDefault();
   database.ref('/esp32').update({
      inicio:0,parar:0,continuar:1,resetear:0
   })
});
resetear.addEventListener('click',(e) => {
   e.preventDefault();
   database.ref('/esp32').update({
      inicio:0,parar:0,continuar:0,resetear:1
   })
});


i=setInterval(iniciox,10);
function iniciox(){
   var inic= Number(postElement2.innerHTML);
   if((inic)==1){
   start();}

}



 function start () {
 
          if (isMarch == false) { 
             timeInicial = new Date();
             control = setInterval(cronometro,10);
             isMarch = true;
             clearInterval(i);

             }
          }
 function cronometro () {


          timeActual = new Date();
          acumularTime = timeActual - timeInicial;
          acumularTime2 = new Date();
          acumularTime2.setTime(acumularTime); 
          cc = Math.round(acumularTime2.getMilliseconds()/10);
          ss = acumularTime2.getSeconds();
          mm = acumularTime2.getMinutes();
          hh = acumularTime2.getHours()-19;
          if (cc < 10) {cc = "0"+cc;}
          if (ss < 10) {ss = "0"+ss;} 
          if (mm < 10) {mm = "0"+mm;}
          if (hh < 10) {hh = "0"+hh;}
          pantalla.innerHTML = hh+" : "+mm+" : "+ss+" : "+cc;


         var paro= Number(postElement1.innerHTML);
         if((paro)==1){
            database.ref('/esp32').update({
               inicio:0,parar:1,continuar:0,resetear:0});
            stop();
         }
         var inic= Number(postElement2.innerHTML);
         if((inic)==1){
            start();
         }
         var repet= Number(postElement3.innerHTML);
         if((repet)==1){
            database.ref('/esp32').update({
               inicio:0,parar:0,continuar:0,resetear:1});
            reset();
         }


          }
 
 function stop () { 
      
      database.ref('/esp32').update({
         inicio:0,parar:0,continuar:0,resetear:0});
          if (isMarch == true) {
             clearInterval(control);
             isMarch = false;
             i=setInterval(iniciox,10); 
             } 
                 
          }      
 
 function resume () {
   database.ref('/esp32').update({
      inicio:0,parar:0,continuar:0,resetear:0});
          if (isMarch == false) {
             timeActu2 = new Date();
             timeActu2 = timeActu2.getTime();
             acumularResume = timeActu2-acumularTime;
             
             timeInicial.setTime(acumularResume);
             control = setInterval(cronometro,10);
             isMarch = true;
             }     
          }
 
 function reset () {
   database.ref('/esp32').update({
      inicio:0,parar:0,continuar:0,resetear:0});
          if (isMarch == true) {
             clearInterval(control);
             isMarch = false;
             i=setInterval(iniciox,10); 
             }
          
             

          acumularTime = 0;
          pantalla.innerHTML = "00 : 00 : 00 : 00";
          }


