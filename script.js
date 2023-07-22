window.addEventListener("scroll", reveal);

function reveal() {
    var reveals = document.querySelectorAll(".beuszas");

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealleft = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealleft < windowheight - revealpoint) {
            reveals[i].classList.add("aktiv")           
        
            setTimeout(kepcsere, 1000);
        }

        else {
            reveals[i].classList.remove("aktiv");
        }
    }
}

function kepcsere() {
    var kep = document.querySelector(".lecserel");

    if (kep == null) {
        return;
    }
    else{
        kep.src = "images/star-solid.svg";
        kep.classList.remove("lecserel");
        kep.style.animationName="csillag";
        setTimeout(kepcsere, 100);
    }
}

