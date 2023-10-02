var modal = document.getElementById('myModal');
var modalImg = document.getElementById("modal-image");
var aktualisKep;

function meretBeallitas() {
  if (modalImg == undefined) {
    return;
  }

  if (modalImg.naturalHeight < modalImg.naturalWidth && window.innerWidth <= 1120) {
    modalImg.style.height = "auto";
    modalImg.style.width = "90%";
  }
  else {
    modalImg.style.height = "95%";
    modalImg.style.width = "auto";
  }
}

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
  meretBeallitas();
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

function listaEltuntetes() {
  if (window.innerWidth <= 1120) {
    for (let i = 1; i <= 3; i++) {
      document.getElementsByClassName("lista" + i)[1].style.display = "none";
      document.getElementsByClassName("lista" + i)[0].innerHTML = "keyboard_double_arrow_down";
    }
  }
  else {
    if (window.location.href.includes("kiallitasok") || window.location.href.includes("k-")) {
      document.getElementsByClassName("lista1")[1].style.display = "block";
    }
    else if (window.location.href.includes("projektek") || window.location.href.includes("p-")) {
      document.getElementsByClassName("lista2")[1].style.display = "block";
    }
    else if (window.location.href.includes("esemenyek") || window.location.href.includes("e-")) {
      document.getElementsByClassName("lista3")[1].style.display = "block";
    }
  }
}

listaEltuntetes();

window.addEventListener('resize', listaEltuntetes);
window.addEventListener('resize', meretBeallitas);