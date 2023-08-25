var modal = document.getElementById('myModal');
var modalImg = document.getElementById("modal-image");
var aktualisKep;

function galeria(kep, maxKep, galeriaNev) {
  if (kep < 1) {
    aktualisKep += kep + 1;
  }
  else {
    aktualisKep = kep;
  }

  modal.style.display = "block";

  if (aktualisKep === 1) {
    document.getElementById("elozo").style.left = "-100%";
  }
  else {
    document.getElementById("elozo").style.left = "35px";
  }

  if (aktualisKep === maxKep) {
    document.getElementById("kovetkezo").style.right = "100%";
  }
  else {
    document.getElementById("kovetkezo").style.right = "35px";
  }

  modalImg.src = "images/" + galeriaNev + "/" + aktualisKep + ".jpg";

  if (modalImg.height < modalImg.width && screen.width <= 1120) {
    modalImg.height = "auto";
    modalImg.width = "90%";
  }

  /* if (modalImg.height<modalImg.width){
     console.log("ez");
     modalImg.style.transform="none";
   }
   else{
     modalImg.style.transform="none";
   }*/
}

function galeriaBezar() {
  modal.style.display = "none";
}

function navbar(kinyitando, bezarando1, bezarando2) {

  //lista1-3 class: 0. elem a span, 1. elem az ul

  if (document.getElementsByClassName(kinyitando)[1].style.display == "block") {
    document.getElementsByClassName(kinyitando)[1].style.display = "none";
    document.getElementsByClassName(kinyitando)[0].innerHTML = "keyboard_double_arrow_down";
  }
  else {
    document.getElementsByClassName(kinyitando)[1].style.display = "block";
    document.getElementsByClassName(kinyitando)[0].innerHTML = "keyboard_double_arrow_up";
  }

  document.getElementsByClassName(bezarando1)[1].style.display = "none";
  document.getElementsByClassName(bezarando1)[0].innerHTML = "keyboard_double_arrow_down";

  document.getElementsByClassName(bezarando2)[1].style.display = "none";
  document.getElementsByClassName(bezarando2)[0].innerHTML = "keyboard_double_arrow_down";

}