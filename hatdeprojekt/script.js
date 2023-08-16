var modal = document.getElementById('myModal');
var modalImg = document.getElementById("modal-image");
var aktualisKep;

function galeria(kep,maxKep,galeriaNev) {
  if (kep<1){
    aktualisKep+=kep+1;
  }
  else{
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
}

function galeriaBezar() {
  modal.style.display = "none";
}
