/* az "url" változó értéke a main.js-ben van definiálva

FÜGGVÉNYEK LISTÁJA:
felhAdatLekeres()
tarsasAdatLekeres()
felhTorlese()
tarsasAdatBevitel(event,mod)
adatBekuldes(event,id)
ujTarsas(event)
*/

function felhAdatLekeres() {
    let fetchInit = {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
        cache: "default"
    };

    fetch(`${url}/felhasznalok`, fetchInit).then(
        data => data.json(),
        err => console.error(err)
    ).then(
        felhasznalok => {

            let osszesferfi = 0;
            let osszeskor = [0,0,0,0,0,0];
            let osszestapasztalat = [0,0,0,0,0,0];
            let utolsoId = 0;

            for (let i = 0; i < felhasznalok.length; i++) {

                utolsoId = felhasznalok[i].id;
                let ujsor = document.createElement("tr");
                let ujcella = [];

                for (let j = 0; j < 5; j++) {
                    ujcella[j] = document.createElement("td");

                    switch (j) {
                        case 0: ujcella[j].innerHTML = felhasznalok[i].id;
                            break;
                        case 1: ujcella[j].innerHTML = felhasznalok[i].nev;
                            break;
                        case 2: ujcella[j].innerHTML = felhasznalok[i].ferfi ? "férfi" : "nő";
                            break;
                        case 3: ujcella[j].innerHTML = felhasznalok[i].kor;
                            break;
                        case 4: ujcella[j].innerHTML = felhasznalok[i].hanyeve;
                            break;
                    }
                    ujsor.appendChild(ujcella[j]);
                }
                document.getElementById("felhtablazat").appendChild(ujsor);

                osszesferfi += felhasznalok[i].ferfi ? 1 : 0;

                switch (felhasznalok[i].kor) {
                    case "20 alatt": osszeskor[0]++;
                        break;
                    case "20-29": osszeskor[1]++;
                        break;
                    case "30-39": osszeskor[2]++;
                        break;
                    case "40-49": osszeskor[3]++;
                        break;
                    case "50-59": osszeskor[4]++;
                        break;
                    case "59 fölött": osszeskor[5]++;
                }
                switch (felhasznalok[i].hanyeve) {
                    case "kezdő": osszestapasztalat[0]++;
                        break;
                    case "1-2": osszestapasztalat[1]++;
                        break;
                    case "3-5": osszestapasztalat[2]++;
                        break;
                    case "6-9": osszestapasztalat[3]++;
                        break;
                    case "10-15": osszestapasztalat[4]++;
                        break;
                    case "15 fölött": osszestapasztalat[5]++;
                }
            }

            document.getElementById("osszesuser").innerHTML = felhasznalok.length;
            document.getElementById("osszesferfi").innerHTML = `<span style="color:blue">férfi: ${Math.round((100/felhasznalok.length)*osszesferfi)}%</span> &#8226; <span style="color:red">nő: ${Math.round((100/felhasznalok.length)*(felhasznalok.length - osszesferfi))}%</span>`;
           
            document.getElementById("osszeskor").innerHTML = `<span style="color:yellow">20 év alatt: ${Math.round((100/felhasznalok.length)*osszeskor[0])}%</span> &#8226; <span style="color:green">20-29 év: ${Math.round((100/felhasznalok.length)*osszeskor[1])}%</span> &#8226; <span style="color:blue">30-39 év: ${Math.round((100/felhasznalok.length)*osszeskor[2])}%</span><br><span style="color:purple">40-49 év: ${Math.round((100/felhasznalok.length)*osszeskor[3])}%</span> &#8226; <span style="color:red">50-59 év: ${Math.round((100/felhasznalok.length)*osszeskor[4])}%</span> &#8226; <span style="color:orange">60+ év: ${Math.round((100/felhasznalok.length)*osszeskor[5])}%</span>`;
          
            document.getElementById("osszestapasztalat").innerHTML = `<span style="color:yellow">kezdő: ${Math.round((100/felhasznalok.length)*osszestapasztalat[0])}%</span> &#8226; <span style="color:green">1-2 év: ${Math.round((100/felhasznalok.length)*osszestapasztalat[1])}%</span> &#8226; <span style="color:blue">3-5 év: ${Math.round((100/felhasznalok.length)*osszestapasztalat[2])}%</span><br><span style="color:purple">6-9 év: ${Math.round((100/felhasznalok.length)*osszestapasztalat[3])}%</span> &#8226; <span style="color:red">10-15 év: ${Math.round((100/felhasznalok.length)*osszestapasztalat[4])}%</span> &#8226; <span style="color:orange">16+ év: ${Math.round((100/felhasznalok.length)*osszestapasztalat[5])}%</span>`;
            
            let ferfiArany=Math.round(360/(felhasznalok.length/(felhasznalok.length-osszesferfi)));
            let korArany=[];
            let tapasztalatArany=[];
            for(let k=0;k<5;k++){
                korArany[k]=Math.round(360/(felhasznalok.length/osszeskor[k]));
                tapasztalatArany[k]=Math.round(360/(felhasznalok.length/osszestapasztalat[k]));
            }

            document.getElementById("diagram-nemek").style.backgroundImage=`conic-gradient(red 0deg, red ${ferfiArany}deg, blue ${ferfiArany}deg, blue 360deg)`;

            document.getElementById("diagram-korok").style.backgroundImage=`conic-gradient(yellow 0deg, yellow ${korArany[0]}deg, green ${korArany[0]}deg, green ${korArany[0]+korArany[1]}deg, blue ${korArany[0]+korArany[1]}deg, blue ${korArany[0]+korArany[1]+korArany[2]}deg, purple ${korArany[0]+korArany[1]+korArany[2]}deg, purple ${korArany[0]+korArany[1]+korArany[2]+korArany[3]}deg, red ${korArany[0]+korArany[1]+korArany[2]+korArany[3]}deg, red ${korArany[0]+korArany[1]+korArany[2]+korArany[3]+korArany[4]}deg, orange ${korArany[0]+korArany[1]+korArany[2]+korArany[3]+korArany[4]}deg, orange 360deg)`;

            document.getElementById("diagram-tapasztalat").style.backgroundImage=`conic-gradient(yellow 0deg, yellow ${tapasztalatArany[0]}deg, green ${tapasztalatArany[0]}deg, green ${tapasztalatArany[0]+tapasztalatArany[1]}deg, blue ${tapasztalatArany[0]+tapasztalatArany[1]}deg, blue ${tapasztalatArany[0]+tapasztalatArany[1]+tapasztalatArany[2]}deg, purple ${tapasztalatArany[0]+tapasztalatArany[1]+tapasztalatArany[2]}deg, purple ${tapasztalatArany[0]+tapasztalatArany[1]+tapasztalatArany[2]+tapasztalatArany[3]}deg, red ${tapasztalatArany[0]+tapasztalatArany[1]+tapasztalatArany[2]+tapasztalatArany[3]}deg, red ${tapasztalatArany[0]+tapasztalatArany[1]+tapasztalatArany[2]+tapasztalatArany[3]+tapasztalatArany[4]}deg, orange ${tapasztalatArany[0]+tapasztalatArany[1]+tapasztalatArany[2]+tapasztalatArany[3]+tapasztalatArany[4]}deg, orange 360deg)`;

            document.getElementById("felhtorlesid").max = utolsoId;
        }
    )
}

function tarsasAdatLekeres() {
    let fetchInit = {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
        cache: "default"
    };

    fetch(`${url}/tarsasok`, fetchInit).then(
        data => data.json(),
        err => console.error(err)
    ).then(
        tarsasok => {

            let osszesraktaron = 0;
            let osszesar = 0;
            for (let i = 0; i < tarsasok.length; i++) {

                let ujsor = document.createElement("tr");
                let ujcella = [];

                for (let j = 0; j < 11; j++) {
                    ujcella[j] = document.createElement("td");

                    switch (j) {
                        case 0: ujcella[j].innerHTML = i + 1;
                            break;
                        case 1: ujcella[j].innerHTML = tarsasok[i].nev;
                            break;
                        case 2: ujcella[j].innerHTML = tarsasok[i].tema + ", " + tarsasok[i].tipus;
                            break;
                        case 3: ujcella[j].innerHTML = tarsasok[i].kiadaseve;
                            break;
                        case 4: ujcella[j].innerHTML = tarsasok[i].tervezo;
                            break;
                        case 5: ujcella[j].innerHTML = tarsasok[i].maxjatekosszam;
                            break;
                        case 6: ujcella[j].innerHTML = tarsasok[i].minjatekido + "-" + tarsasok[i].minjatekido * 2;
                            break;
                        case 7: ujcella[j].innerHTML = tarsasok[i].minjatekoskor;
                            break;
                        case 8: ujcella[j].innerHTML = tarsasok[i].nehezseg;
                            break;
                        case 9: ujcella[j].innerHTML = tarsasok[i].ar;
                            break;
                        case 10: ujcella[j].innerHTML = tarsasok[i].raktaron;
                            break;
                    }
                    ujsor.appendChild(ujcella[j]);
                }
                document.getElementById("tarsastablazat").appendChild(ujsor);

                osszesraktaron += tarsasok[i].raktaron;
                osszesar += tarsasok[i].raktaron * tarsasok[i].ar;
            }
            document.getElementById("osszestarsas").innerHTML = tarsasok.length;
            document.getElementById("osszesraktaron").innerHTML = osszesraktaron + " db";
            document.getElementById("osszesar").innerHTML = osszesar + " Ft";

            document.getElementById("tarsasmodositid").max = tarsasok.length;
        }
    )
}

function felhTorlese() {
    let torlendoUserId = document.getElementById("felhtorlesid").value;

    let fetchInit = {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
        cache: "default"
    };

    fetch(`${url}/felhasznalok/${torlendoUserId}`, fetchInit).then(
        data => data.json(),
        err => console.error(err)
    ).then(
        torlendo => {
            if (torlendo.nev == undefined) {
                alert("Nincs ilyen id-jű felhasználó!");
                return;
            }

            fetch(`${url}/aktualisUser/1`, fetchInit).then(
                data => data.json(),
                err => console.error(err)
            ).then(
                aktUser => {
                    if (aktUser.felhasznaloId == torlendoUserId) {
                        alert("Saját magadat nem törölheted!");
                        return;
                    }
                    else if (confirm("Biztosan törölni akarod ezt a felhasználót? Ez a művelet nem fordítható vissza!")) {

                        fetchInit = {
                            method: "DELETE",
                            headers: new Headers(),
                            mode: "cors",
                            cache: "no-cache"
                        };

                        fetch(`${url}/felhasznalok/${torlendoUserId}`, fetchInit).then(
                            data => data.json(),
                            err => console.error(err)
                        )
                        alert(`Felhasználó (id: ${torlendoUserId}) sikeresen törölve!`);
                    }
                }
            )
        }
    )
}

function tarsasAdatBevitel(event, mod) {
    //mod= 0: új társas felvétele, 1: társas módosítása
    event.preventDefault();
    document.getElementById("tarsasadat-hatter").style.display = "block";
    if (mod == 0) {     //új társas felvétele az adatbázisba

        document.getElementById("tarsasadatokmegadasa").style.top = "50px";
        let kisbetusSzoveg = document.getElementsByClassName("kisbetu");
        for (let i = 0; i < kisbetusSzoveg.length; i++) {
            kisbetusSzoveg[i].style.display = "block";
        }

        document.getElementById("adatokteendo").style.backgroundColor = "gold";
        document.getElementById("adatokteendo").innerHTML = "Új társasjáték felvétele";
        document.getElementById("adatokteendo").setAttribute("onclick", "ujTarsas(event)");

        document.getElementById("id").innerHTML = "";
        document.getElementById("tnev").value = "";
        document.getElementById("tkiadev").value = "";
        document.getElementById("ttervezo").value = "";
        document.getElementById("tmaxjatekos").value = "";
        document.getElementById("tminjatekido").value = "";
        document.getElementById("tminjatkor").value = "";
        document.getElementById("tneh").value = "";
        document.getElementById("tar").value = "";
        document.getElementById("traktar").value = "";
        document.getElementById("tbggkep").value = "";
        document.getElementById("tbggid").value = "";

        let opciok = document.getElementsByTagName("option");
        for (let j = 0; j < opciok.length; j++) {
            if (opciok[j].selected) {
                opciok[j].removeAttribute("selected");
            }
        }

    }
    else {          //létező társas adatainak módosítása
        document.getElementById("tarsasadatokmegadasa").style.top = "70px";

        let kisbetusSzoveg = document.getElementsByClassName("kisbetu");
        for (let i = 0; i < kisbetusSzoveg.length; i++) {
            kisbetusSzoveg[i].style.display = "none";
        }

        let modTarsasId = document.getElementById("tarsasmodositid").value;

        let fetchInit = {
            method: "GET",
            headers: new Headers(),
            mode: "cors",
            cache: "default"
        };

        fetch(`${url}/tarsasok/${modTarsasId}`, fetchInit).then(
            data => data.json(),
            err => console.error(err)
        ).then(
            tarsas => {
                document.getElementById("id").innerHTML = modTarsasId;
                document.getElementById("tnev").value = tarsas.nev;
                document.getElementById("tkiadev").value = tarsas.kiadaseve;
                document.getElementById("ttervezo").value = tarsas.tervezo;
                document.getElementById("tmaxjatekos").value = tarsas.maxjatekosszam;
                document.getElementById("tminjatekido").value = tarsas.minjatekido;
                document.getElementById("tminjatkor").value = tarsas.minjatekoskor;
                document.getElementById("tneh").value = tarsas.nehezseg;
                document.getElementById("tar").value = tarsas.ar;
                document.getElementById("traktar").value = tarsas.raktaron;
                document.getElementById("tbggkep").value = tarsas.bggkep;
                document.getElementById("tbggid").value = tarsas.bggid;

                let opciok = document.getElementsByTagName("option");
                for (let j = 0; j < opciok.length; j++) {
                    if (opciok[j].innerHTML == tarsas.tema || opciok[j].innerHTML == tarsas.tipus) {
                        opciok[j].setAttribute("selected", "true");
                    }
                }
                document.getElementById("adatokteendo").style.backgroundColor = "dodgerblue";
                document.getElementById("adatokteendo").innerHTML = "Adatok módosítása";
                document.getElementById("adatokteendo").setAttribute("onclick", `adatBekuldes(event,${modTarsasId})`)
            }
        )
    }
}

function adatBekuldes(event, id) {
    event.preventDefault();

    let tarsastema = "";
    let tarsastipus = "";
    let opciok = document.getElementsByTagName("option");
    for (let i = 0; i < opciok.length; i++) {
        if (opciok[i].selected == true) {
            if (opciok[i].parentElement.id == "ttema") {
                tarsastema = opciok[i].innerHTML;
            }
            else {
                tarsastipus = opciok[i].innerHTML;
            }
        }
    }
    let modositandoTarsas = {
        nev: document.getElementById("tnev").value,
        kiadaseve: Number(document.getElementById("tkiadev").value),
        tervezo: document.getElementById("ttervezo").value,
        bggid: document.getElementById("tbggid").value,
        bggkep: document.getElementById("tbggkep").value,
        maxjatekosszam: Number(document.getElementById("tmaxjatekos").value),
        minjatekido: Number(document.getElementById("tminjatekido").value),
        minjatekoskor: Number(document.getElementById("tminjatkor").value),
        tema: tarsastema,
        tipus: tarsastipus,
        nehezseg: Number(document.getElementById("tneh").value),
        ar: Number(document.getElementById("tar").value),
        raktaron: Number(document.getElementById("traktar").value)
    };

    fetchInit = {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        mode: "cors",
        cache: "default",
        body: JSON.stringify(modositandoTarsas)
    };

    fetch(`${url}/tarsasok/${id}`, fetchInit).then(
        data => data.json(),
        err => console.error(err)
    )
    alert(`Társasjáték (id: ${id}) adatai módosítva`);
}

function ujTarsas(event) {
    event.preventDefault();

    let tarsastema = "";
    let tarsastipus = "";
    let opciok = document.getElementsByTagName("option");
    for (let i = 0; i < opciok.length; i++) {
        if (opciok[i].selected == true) {
            if (opciok[i].parentElement.id == "ttema") {
                tarsastema = opciok[i].innerHTML;
            }
            else {
                tarsastipus = opciok[i].innerHTML;
            }
        }
    }

    let ujtarsasadatai = {
        nev: document.getElementById("tnev").value,
        kiadaseve: Number(document.getElementById("tkiadev").value),
        tervezo: document.getElementById("ttervezo").value,
        bggid: document.getElementById("tbggid").value,
        bggkep: document.getElementById("tbggkep").value,
        maxjatekosszam: Number(document.getElementById("tmaxjatekos").value),
        minjatekido: Number(document.getElementById("tminjatekido").value),
        minjatekoskor: Number(document.getElementById("tminjatkor").value),
        tema: tarsastema,
        tipus: tarsastipus,
        nehezseg: Number(document.getElementById("tneh").value),
        ar: Number(document.getElementById("tar").value),
        raktaron: Number(document.getElementById("traktar").value)
    };

    fetchInit = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        mode: "cors",
        cache: "default",
        body: JSON.stringify(ujtarsasadatai)
    };

    fetch(`${url}/tarsasok`, fetchInit).then(
        data => data.json(),
        err => console.error(err)
    )
    alert("Új társasjáték sikeresen hozzáadva!");
}

felhAdatLekeres();
tarsasAdatLekeres();